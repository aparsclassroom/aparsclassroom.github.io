/* ------------------------------------------------------------------------ *
 * Product purchase page — shop-server v4.
 *
 * Five jobs:
 *   1. show how many students are enrolled
 *   2. check whether THIS buyer is already enrolled
 *   3. if they are, send them to their invoice
 *   4. otherwise let them enrol
 *   5. let them apply a coupon
 *
 * Page globals it expects (unchanged from before):
 *   shopName2, productCode, product, productName, Cycle, Platform,
 *   fix, pls, cuponApi, queryPromo, getCookie(), delete_cookie(), swal(), firebase
 *
 * Markup it expects, beyond the existing form: one element with
 * `id="enrollCount"` (or any element carrying `data-enroll-count`) to print the
 * student count into. Missing element = that feature quietly does nothing.
 * ------------------------------------------------------------------------ */

/* ---- endpoints ---------------------------------------------------------- */

const API = `https://${shopName2}`;
const seg = encodeURIComponent;

/** true = badge counts this cycle only; false = every cycle of the product. */
const COUNT_THIS_CYCLE_ONLY = false;

const EP = {
  // Public, cached 60s server-side. The cycle-scoped variant is v3's shape and
  // answers `{count}` instead of `{productId, count}`.
  count: COUNT_THIS_CYCLE_ONLY
    ? `${API}/enrollment/${seg(Cycle)}?productCode=${seg(productCode)}`
    : `${API}/api/counts/product/${seg(productCode)}`,
  // Token-authenticated: returns the caller's OWN rows, so no uid is sent.
  enrollments: `${API}/api/enrollments`,
  // The cycle is part of the path — the server ignores the body's `Cycle`.
  init: `${API}/${seg(productCode)}/${seg(Cycle)}/init`,
  receipt: (uid) => `${API}/${seg(productCode)}/${seg(Cycle)}/success/${seg(uid)}`,
  coupon: (code) => `${cuponApi}/${seg(code.toUpperCase())}/${seg(productCode)}`,
};

/* ---- tiny helpers ------------------------------------------------------- */

const el = (id) => document.getElementById(id);

/** Always a string — the server's validator refuses null, and null 400s the request. */
const cookie = (name) => String(getCookie(name) ?? '').trim();

const money = (n) => Number(n).toLocaleString('en-US');

/**
 * One fetch path for the whole page.
 * @returns {Promise<{ok: boolean, status: number, data: any, text: string}>}
 */
async function call(url, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    redirect: 'follow',
  });

  const text = await res.text();
  let data = null;
  try { data = JSON.parse(text); } catch { /* HTML fragment or empty body */ }
  return { ok: res.ok, status: res.status, data, text };
}

const alertError = (title, text) => swal({ title, text, icon: 'error', button: 'Ok' });

/** Server unreachable or broken — the only case that abandons the page. */
const fatal = (text) => swal({
  title: 'Error',
  icon: 'https://i.postimg.cc/ncNLJcGR/under-maintenance.png',
  text: text || 'Please visit after 10 pm tonight',
  button: 'Ok',
}).then(() => { location.href = '/shop'; });

const toInvoice = (uid) => swal({
  title: 'Already Enrolled !',
  icon: 'success',
  button: 'View Informations',
}).then(() => location.replace(EP.receipt(uid)));

/* ---- 1. student count --------------------------------------------------- */

/**
 * Public, unauthenticated, and started before Firebase has even resolved —
 * nothing about the badge depends on who is looking. A failed count is left
 * blank rather than shown as 0: a wrong number is worse than no number.
 */
async function paintCount() {
  const targets = [el('enrollCount'), ...document.querySelectorAll('[data-enroll-count]')]
    .filter(Boolean);
  if (!targets.length) return;

  try {
    const { ok, data } = await call(EP.count);
    if (!ok || typeof data?.count !== 'number') return;
    targets.forEach((node) => { node.textContent = money(data.count); });
  } catch { /* badge stays as the markup left it */ }
}

/* ---- 2 & 3. already enrolled? ------------------------------------------- */

/**
 * The buyer's own enrollments, identified by their ID token — no uid travels
 * in the request, so nothing here can be spoofed by editing the page.
 *
 * A bundle writes one enrollment row per component, so a course bought inside
 * a bundle is found by its own id; no hardcoded companion product needed.
 *
 * Returns null when the LOOKUP fails, not just when nothing is found: a flaky
 * check must never block a sale, and the init route refuses a repeat purchase
 * server-side regardless.
 */
async function findEnrollment(user) {
  try {
    const { ok, data } = await call(EP.enrollments, { token: await user.getIdToken() });
    if (!ok) return null;
    return (data?.enrollments ?? []).find((e) => (
      String(e.productId) === String(productCode)
      // A cycle course names its cycle; a standalone one carries null.
      && (e.cycle === Cycle || e.cycle === null)
    )) ?? null;
  } catch {
    return null;
  }
}

/* ---- 4. enrolment ------------------------------------------------------- */

/** The legacy body the init route reads. */
const purchaseBody = (uid) => ({
  productName: product,
  Platform, // server takes Platform from the catalogue; sent for parity only
  cus_name: el('name').value.trim(),
  cus_email: el('email').value.toLowerCase().trim(),
  Institution: el('college').value.trim(),
  HSC: el('hscBatch').value.trim(),
  cus_phone: el('phone').value.trim(),
  Cupon: el('disC').value.trim(),
  uid,
  Cycle,
  // Attribution. NOTE: `affiliate` is accepted but deliberately ignored on this
  // route — only /o2o/ may name an agent — so an affiliate cookie earns no
  // commission here.
  affiliate: cookie('affiliate'),
  utm_id: cookie('utm_id'),
  utm_source: cookie('utm_source'),
  utm_medium: cookie('utm_medium'),
  utm_campaign: cookie('utm_campaign'),
  utm_term: cookie('utm_term'),
  utm_content: cookie('utm_content'),
  lead: cookie('lead'),
  Referrer: cookie('Referrer'), // sent ONCE — the old body declared this key twice
  Ip: cookie('ip'),
});

/**
 * POST the init route and show what comes back.
 *
 * A 2xx body is the rail chooser: an HTML fragment built to be dropped into
 * this page (no document tags, no script, styles scoped to itself). Anything
 * else is a JSON refusal — show it and let the buyer correct it, except 409,
 * which means the seat is already held.
 */
async function enrol(uid) {
  const buy = el('buy');
  const label = buy.innerText;
  buy.innerText = 'Please wait....';
  buy.disabled = true;

  let res;
  try {
    res = await call(EP.init, { method: 'POST', body: purchaseBody(uid) });
  } catch {
    buy.innerText = label;
    buy.disabled = false;
    return fatal('Could not reach the server. Please check your connection and try again.');
  }

  if (res.ok) {
    el('doc').innerHTML = res.text;
    return undefined;
  }

  buy.innerText = label;
  buy.disabled = false;

  if (res.status === 409) return toInvoice(uid);
  if (res.status >= 500) return fatal();
  return alertError('Could not continue', res.data?.message || 'Please check the form and try again.');
}

/* ---- boot --------------------------------------------------------------- */

paintCount(); // public — does not wait for auth

firebase.auth().onAuthStateChanged(async (user) => {
  const toLogin = (ev) => {
    if (ev) ev.preventDefault();
    location.href = `/shop/dashboard/login?&signInSuccessUrl=${location.pathname}`;
  };

  if (!user) {
    el('app').style.display = 'none';
    el('cup').style.display = 'none';
    el('moda').addEventListener('click', () => {
      sessionStorage.setItem(`${product}_potential`, 'true');
      toLogin();
    });
    el('app').addEventListener('click', toLogin);
    return;
  }

  el('uid').value = user.uid;

  // Prefill from the account while the enrollment check is in flight.
  const enrolledPromise = findEnrollment(user);

  el('moda').setAttribute('data-target', '#purchaseFrm');
  el('moda').innerHTML = 'সাইকেলটিতে এনরোল করো <i class="fas fa-arrow-right"></i>';

  if (user.phoneNumber != null) {
    el('phone').value = user.phoneNumber;
    el('phone').setAttribute('readonly', true);
    el('buy').disabled = false;
  } else {
    el('phone').value = '+880';
  }
  if (user.displayName != null) el('name').value = user.displayName;
  if (user.email != null) {
    el('email').value = user.email;
    el('email').setAttribute('readonly', true);
  }

  el('app').addEventListener('click', () => {
    el('app').style.display = 'none';
    el('cup').style.display = 'block';
  });

  user.getIdTokenResult()
    .then(({ claims }) => {
      if (claims.HSC) el('hscBatch').value = claims.HSC;
      if (claims.Institution) el('college').value = claims.Institution;
    })
    .catch(console.error);

  if (await enrolledPromise) return toInvoice(user.uid);

  document.forms.purchase.addEventListener('submit', (ev) => {
    ev.preventDefault();
    enrol(user.uid);
  });
  return undefined;
});

/* ---- form validation messages ------------------------------------------- */

el('email').addEventListener('input', function () {
  this.setCustomValidity(this.validity.typeMismatch ? 'We are expecting an e-mail address!' : '');
});

el('phone').addEventListener('input', function () {
  this.setCustomValidity(
    this.validity.patternMismatch ? 'Please enter a valid phone number (+8801XX XXX XXXX)!' : '',
  );
});

/* ---- page chrome -------------------------------------------------------- */

document.title = `${productName} (${Cycle}) | ASG Shop`;
el('prod').innerHTML = `${productName}<br>(${Cycle})`;
el('prevP').innerText = fix;
el('nop').innerText = `${pls}৳`;
el('sprice').innerText = pls;
el('price').value = pls;

/* ---- 5. coupon ---------------------------------------------------------- */
// `func`, `notdis` and `suc` stay global — the markup calls them from inline
// handlers, not this file.

var cupon;
var disOFF = 0;
var cpn = el('cpnCheck');

function notdis() {
  el('cpnCheck').disabled = el('cupon').value.trim() === '';
}

function func() {
  cupon = el('cupon').value;
  notdis();
}

function suc() {
  notdis();
}

/** Put the Apply button back so a rejected code can be retyped. */
function releaseCoupon(clear) {
  cpn.innerText = 'Apply';
  cpn.disabled = false;
  el('cupon').disabled = false;
  if (clear) el('cupon').value = '';
  notdis();
}

function applyDiscount(off, code) {
  const nes = pls - off;
  disOFF = off;

  el('price').value = nes;
  el('sprice').innerText = nes;
  el('disC').value = code;
  el('cupon').value = code;
  el('cupon').disabled = true;
  cpn.innerText = 'Applied ✔';
  cpn.disabled = true;
  cpn.style.cursor = 'not-allowed';
  el('coupnbosh').style.display = 'none';

  const percent = Math.round(((Number(off) + (fix - pls)) / fix) * 100);
  el('how').style.display = 'block';
  el('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${code}"</span> promo code`;
  el('smp').innerHTML = `<del style='color:red'> ${fix}৳</del> <span style='color:rgb(26, 185, 66);'>${nes} ৳</span>`;
  el('cup').style.display = 'block';
}

cpn.addEventListener('click', async (ev) => {
  ev.preventDefault();
  const code = el('cupon').value.trim();
  if (!code) return alertError("Cupon can't be Empty 😶").then(notdis);

  cpn.innerText = 'Checking..';
  cpn.disabled = true;
  el('cupon').disabled = true;

  let data;
  try {
    ({ data } = await call(EP.coupon(code)));
  } catch {
    releaseCoupon(true);
    return alertError('Could not check that code', 'Please try again in a moment.');
  }

  if (data?.status !== 'success') {
    releaseCoupon(true);
    return alertError('Code not valid');
  }

  // The price shown is a preview only — the init route re-checks the coupon
  // server-side and refuses the sale with `Discount Error` if it disagrees.
  applyDiscount(data.Off, data.Cupon);
  return undefined;
});

if (queryPromo != null) {
  el('cupon').value = cookie('promo');
  notdis();
  el('app').style.display = 'none';
  cpn.click();
} else {
  el('cup').style.display = 'none';
  delete_cookie('promo');
  notdis();
}

/* ---- copy-coupon chips -------------------------------------------------- */

const TOAST_CSS = `
  position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
  background-color: #28a745; color: white; padding: 12px 24px;
  border-radius: 8px; z-index: 1000; opacity: 0;
  transition: opacity 0.3s ease-in-out; text-align: center;
  min-width: 200px; max-width: 90%; margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-size: 14px; white-space: nowrap;
`;

document.querySelectorAll('.copy-coupon').forEach((chip) => {
  chip.addEventListener('click', function () {
    document.querySelectorAll('.copy-coupon').forEach((c) => { c.style.backgroundColor = '#ffffff'; });

    navigator.clipboard.writeText(this.getAttribute('data-coupon')).then(() => {
      const toast = document.createElement('div');
      toast.style.cssText = TOAST_CSS;
      toast.textContent = 'Coupon copied ✓';
      document.body.appendChild(toast);

      setTimeout(() => { toast.style.opacity = '1'; }, 10);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 2000);

      this.style.backgroundColor = '#e8f5e9';
    });
  });
});

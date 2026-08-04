/* ------------------------------------------------------------------------ *
 * Product purchase page — shop-server v4.
 *
 * Five jobs:
 *   1. show how many students are enrolled
 *   2. check whether THIS buyer already holds THIS course + cycle
 *   3. if they do, send them to their invoice
 *   4. otherwise let them enrol
 *   5. let them apply a coupon
 *
 * Jobs 2 and 5 are one endpoint: POST /api/checkout/quote, asked about this
 * one item. It answers `owned` for exactly that (productId, cycle) — no list of
 * the buyer's other courses is fetched or sent — and, with `couponCode` set, it
 * validates the code and returns the real discounted price. It runs the same
 * pricing the init route runs at purchase time, so the preview cannot disagree
 * with what is charged. v3's `cuponApi` endpoint does not exist on v4 and is no
 * longer called.
 *
 * Page globals it expects:
 *   shopName2, productCode, product, productName, Cycle, Platform,
 *   fix, pls, queryPromo, getCookie(), delete_cookie(), swal(), firebase
 *   (`cuponApi` is no longer used)
 *
 * Markup: one element with id="enrollCount" (or any element carrying
 * data-enroll-count) receives the student count. Absent = feature is skipped.
 * ------------------------------------------------------------------------ */

/* ---- endpoints ---------------------------------------------------------- */

const API = `https://${shopName3}`;
const seg = encodeURIComponent;

/** true = badge counts this cycle only; false = every cycle of the product. */
const COUNT_THIS_CYCLE_ONLY = false;

const EP = {
  // Public, server-cached. The cycle-scoped variant is v3's shape; both answer `count`.
  count: COUNT_THIS_CYCLE_ONLY
    ? `${API}/enrollment/${seg(Cycle)}?productCode=${seg(productCode)}`
    : `${API}/api/counts/product/${seg(productCode)}`,
  // Authenticated. Ownership + price + coupon validity for ONE item.
  quote: `${API}/api/checkout/quote`,
  // The cycle is part of the path — the server ignores the body's `Cycle`.
  init: `${API}/${seg(productCode)}/${seg(Cycle)}/init`,
  receipt: (uid) => `${API}/${seg(productCode)}/${seg(Cycle)}/success/${seg(uid)}`,
};

/* ---- state -------------------------------------------------------------- */

const state = {
  user: null,
  base: Number(pls), // catalogue price, re-synced from the server's own quote
  payable: Number(pls),
  coupon: '',
};

/* ---- tiny helpers ------------------------------------------------------- */

const el = (id) => document.getElementById(id);

/** Always a string — the init validator refuses null, and null 400s the request. */
const cookie = (name) => String(getCookie(name) ?? '').trim();

/** One fetch path for the whole page. */
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

const toLogin = (ev) => {
  if (ev) ev.preventDefault();
  location.href = `/shop/dashboard/login?&signInSuccessUrl=${location.pathname}`;
};

/* ---- the one authenticated call ----------------------------------------- */

/**
 * Price THIS course + cycle for the signed-in buyer, optionally with a coupon.
 *
 * The cart is a single item, so `owned` can only ever be about this course and
 * `couponNotices` can only ever be about this code. Nothing identifies the
 * buyer but their token — no uid travels in the body.
 *
 * @returns {Promise<{owned: boolean, order: Object|null, notice: string|null, error: string|null}>}
 */
async function quoteThisCourse(couponCode) {
  const item = { productId: String(productCode), cycle: Cycle };
  if (couponCode) item.couponCode = couponCode;

  const { ok, status, data } = await call(EP.quote, {
    method: 'POST',
    token: await state.user.getIdToken(),
    body: { items: [item] },
  });

  if (!ok) {
    return {
      owned: false,
      order: null,
      notice: null,
      error: data?.message || (status >= 500 ? '' : 'Could not price this course.'),
    };
  }
  return {
    owned: (data.owned ?? []).length > 0,
    order: data.orders?.[0] ?? null,
    // A notice means the code was refused; its `reason` is written for a buyer.
    notice: data.couponNotices?.[0]?.reason ?? null,
    error: null,
  };
}

/* ---- 1. student count --------------------------------------------------- */

/**
 * Public, unauthenticated, started before Firebase has even resolved — nothing
 * about the badge depends on who is looking. A failed count leaves the markup
 * alone rather than printing 0: a wrong number is worse than no number.
 */
async function paintCount() {
  const targets = [el('enrollCount'), ...document.querySelectorAll('[data-enroll-count]')]
    .filter(Boolean);
  if (!targets.length) return;

  try {
    const { ok, data } = await call(EP.count);
    if (!ok || typeof data?.count !== 'number') return;
    const text = data.count.toLocaleString('en-US');
    targets.forEach((node) => { node.textContent = text; });
  } catch { /* badge stays as the markup left it */ }
}

/* ---- price display ------------------------------------------------------ */

function paintPrice() {
  el('sprice').innerText = state.payable;
  el('price').value = state.payable;
  el('nop').innerText = `${state.payable}৳`;
}

/* ---- 4. enrolment ------------------------------------------------------- */

/** The legacy body the init route reads. */
const purchaseBody = (uid) => ({
  productName: product,
  Platform, // the server takes Platform from the catalogue; sent for parity only
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

/** Paint an accepted coupon: the server's own discount, not a local subtraction. */
function showDiscount(order) {
  state.payable = order.currency_amount;
  state.coupon = order.appliedCoupons?.[0] ?? el('cupon').value.trim().toUpperCase();
  disOFF = order.discount_amount;

  paintPrice();
  el('disC').value = state.coupon;
  el('cupon').value = state.coupon;
  el('cupon').disabled = true;
  cpn.innerText = 'Applied ✔';
  cpn.disabled = true;
  cpn.style.cursor = 'not-allowed';
  el('coupnbosh').style.display = 'none';

  const percent = Math.round(((order.discount_amount + (fix - state.base)) / fix) * 100);
  el('how').style.display = 'block';
  el('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${state.coupon}"</span> promo code`;
  el('smp').innerHTML = `<del style='color:red'> ${fix}৳</del> <span style='color:rgb(26, 185, 66);'>${state.payable} ৳</span>`;
  el('cup').style.display = 'block';
}

async function applyCoupon() {
  const code = el('cupon').value.trim();
  if (!code) return alertError("Cupon can't be Empty 😶").then(notdis);
  if (!state.user) return toLogin();

  cpn.innerText = 'Checking..';
  cpn.disabled = true;
  el('cupon').disabled = true;

  let result;
  try {
    result = await quoteThisCourse(code);
  } catch {
    releaseCoupon(true);
    return alertError('Could not check that code', 'Please try again in a moment.');
  }

  // The code was refused — the server says why ("Coupon not found", expired,
  // already used, minimum order, …). Show that rather than a generic message.
  if (result.notice) {
    releaseCoupon(true);
    return alertError('Code not valid', result.notice);
  }
  if (result.error || !result.order) {
    releaseCoupon(true);
    return alertError('Could not check that code', result.error || 'Please try again in a moment.');
  }

  showDiscount(result.order);
  return undefined;
}

cpn.addEventListener('click', (ev) => {
  ev.preventDefault();
  applyCoupon();
});

/* ---- boot --------------------------------------------------------------- */

paintCount(); // public — does not wait for auth

firebase.auth().onAuthStateChanged(async (user) => {
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

  state.user = user;
  el('uid').value = user.uid;

  // Ownership + authoritative price, asked about this one course. In flight
  // while the form prefills below, so it costs no visible time.
  const quoted = quoteThisCourse();

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

  // 2 & 3. Already holds this cycle → their invoice. A quote that FAILED is
  // not an answer: let them proceed, since init refuses a repeat purchase
  // server-side with 409 and that path also lands on the invoice.
  const { owned, order } = await quoted;
  if (owned) return toInvoice(user.uid);

  // The catalogue's own price wins over whatever the page was rendered with.
  if (order) {
    state.base = order.subtotal;
    state.payable = order.currency_amount;
    paintPrice();
  }

  document.forms.purchase.addEventListener('submit', (ev) => {
    ev.preventDefault();
    enrol(user.uid);
  });

  // A promo arriving in the URL can only be applied once there is a buyer to
  // price it for — the quote is authenticated.
  if (queryPromo != null) {
    el('cupon').value = cookie('promo');
    notdis();
    el('app').style.display = 'none';
    if (el('cupon').value.trim()) applyCoupon();
  }
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
paintPrice();
notdis();

if (queryPromo == null) {
  el('cup').style.display = 'none';
  delete_cookie('promo');
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

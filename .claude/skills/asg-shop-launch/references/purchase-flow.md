# Purchase and payment flow

Everything below runs in the browser. The backend host is `shopName2` from a `key.js`
(normally `shop.aparsclassroom.com`). Canonical implementation to read when in doubt:
`shop/physics/b2m28/assets/script.js` (cycle with books) and
`shop/admission/HSC_26/assets/js/scriptiba.js` (normal, no books).

## 1. Page boot (script load order — all `defer`, so order = document order)

1. Firebase 8.2.10 app/auth/analytics (CDN)
2. `/shop/assets/js/script.js` — Firebase init (project `asg-shop`), stores `ip` cookie (ipify),
   copies **every URL query param into a 7-day cookie on `.aparsclassroom.com`** (so `utm_*`,
   `affiliate`, `lead`, `promo`… survive navigation), sets `returnURL` cookie, defines
   `getCookie`, `setCookie`, `delete_cookie`, and `queryPromo` (= `?promo=`).
3. sweetalert (v1 `swal`) and, on book pages, sweetalert2 (`Swal.fire`) + jQuery/Popper/Bootstrap 4
4. a `key.js` — `shopName`, `shopName2`, `cuponApi` (+ `shopName3 = payment.aparsclassroom.com`, unused)
5. `/assets/js/count.js` (CountUp)
6. course config: `assets/info.js` and/or `assets/ss.js`
7. the purchase script (`script.js` / `sript.js` / `scriptXXX.js`)

The purchase script reads the config **globals** (`product`, `productCode`, `fix`, `pls`, …), so a
missing global = ReferenceError = dead buy button.

## 2. Config globals

| Global | Meaning |
|---|---|
| `product` | backend product slug, sent as `productName` in the init body (no-books variant) |
| `product2` | slug of the with-books variant (convention `<slug>wbooks`, sometimes `wbook`) |
| `productName` / `productName2` | display names (page `<h3 id="prod">` and `document.title`) |
| `productCode` / `productCode2` | backend codes: no-books / with-books. **Used in the URL of every API call** |
| `productCode3..6` | extra codes whose ownership should count as "already enrolled" (combos covering this cycle, older variants) |
| `fix` | strike-through "regular" price |
| `pls` | price without books |
| `pls2` | price with books |
| `Platform` / `Platform2` | `"Online"` / `"Physical"` (books ship) — `"Offline"` for Achieve |
| `init` | number added to the public enrollment count (usually 0) |
| `Cycle` | `"Cycle-N"` parsed from the URL path (cycle pages only) |

Prices shown on the page are display-only; the backend charges per product code. A price change
must also be made in the backend — mention this to the user.

## 3. Logged-out vs logged-in

`firebase.auth().onAuthStateChanged`:
- **Logged out**: coupon box hidden; the buy button (`#moda`) sets
  `sessionStorage[product + '_potential']` and redirects to
  `/shop/dashboard/login?signInSuccessUrl=<current url>`.
- **Logged in**: fills `#uid`, `#phone` (read-only if Firebase has it, else `+880`), `#name`,
  `#email` (read-only), `#hscBatch` / `#college` from custom claims `HSC` / `Institution`;
  `#moda` gets `data-target="#purchaseFrm"` (opens the Bootstrap modal). Then runs the
  "already enrolled?" check.

## 4. "Already enrolled?" check (purchase check)

| Endpoint | Body | Used by |
|---|---|---|
| `POST /v3/purchase/multiple` | `{products:[codes], uid}` | normal courses, combos (any-cycle codes) |
| `POST /v3/purchase/multiple/<Cycle>` | `{products:[codes], uid}` | cycle pages — cycle codes are cycle-scoped |
| `POST /<productCode>/purchase` | `{product, uid}` | legacy normal / Achieve |
| `POST /<productCode>/purchase/<Cycle>` | `{product, uid}` | legacy cycle scripts |

Response `status === 200` → swal "Already Enrolled!" → `location.replace(result.invoices[0].invoice)`
(v3) or `result.Invoice` (legacy). Anything else (or a network error, via `.catch`) → attach the
submit handler. Newer scripts run several checks with `Promise.allSettled` and take the first
`status === 200` (`findExistingPurchase`).

## 5. Submit → init → payment

On `#purchase` form submit: button text "Please wait....", disabled, then

```
POST https://${shopName2}/${productcode}/init              // normal course, combo
POST https://${shopName2}/${Cycle}/${productcode}/init     // cycle page
(legacy: /v1/<code>/init, /v2/<code>/init — Achieve uses /v2/<code>/init)
```

Body (JSON):
```
productName: isShipping ? product2 : product,
Platform:    isShipping ? Platform2 : Platform,
cus_name, cus_email (lower-cased), Institution, HSC, cus_phone (normalizePhone → +8801XXXXXXXXX),
Cupon (#disC, default "N/A"), uid, Cycle (cycle pages only),
affiliate, utm_id, utm_source, utm_medium, utm_campaign, utm_term, utm_content, lead,
Referrer, Ip  (all from cookies)
+ when books: ship_name, ship_phone, ship_add1, ship_city (district), ship_upzilla, ship_method:'Courier'
+ Achieve: BranchName, BranchId, BatchId
```

The response is **HTML text** that replaces `<html id="doc">` (`document.getElementById('doc').innerHTML = result`) —
the backend returns a self-submitting gateway redirect page. On fetch failure: swal
"Please visit after 10 pm tonight" → `/shop`. (The `result != '...404...' || ...` guard is always true —
known quirk, leave it.)

After the gateway the backend redirects to `/payment/success.html`, `/payment/failed.html` or
`/payment/cancel.html` with `?tran_id=&productID=&Invoice=`. Success shows Dashboard / View Course
(`https://shop.aparsclassroom.com/<productID>`) / See Invoice (new tab).

Experimental (not production): `shop/SchoolofExcellence/techtest/` uses its own `key.js`
(`payment.aparsclassroom.com`) and `POST /api/checkout` with a Firebase ID token and
`{items:[{productId}], provider:"bkash"}` → redirect to `orders[0].redirectUrl`. Do not copy unless asked.

## 6. Coupons and promo links

- Manual: `#app` ("Do you have any Coupon?") reveals `#cup`; `#cpnCheck` calls
  `GET ${cuponApi}/<CODE uppercased>/<productcode>` (cuponApi = `https://shop.aparsclassroom.com/v1/Coupon/check`).
  Success `{status:"success", Off, Cupon}` → price = (`isShipping ? pls2 : pls`) − `Off`; writes
  `#price`, `#sprice`, `#smp` (strike `fix`, green new price), `#how` ("X% discounted by CODE" where
  X = round((Off + fix − pls)/fix·100)), puts the code in hidden `#disC` (sent as `Cupon`). Combo and
  normal-with-books scripts also hide `#addbooksdiv` so the variant locks once a coupon is applied
  (coupons are validated per product code); the b2m28-style cycle script does not.
- Promo link: `?promo=<CODE>` auto-fills and clicks apply (newer scripts read the URL directly
  via `getURLParameter('promo')`; older ones read the `promo` cookie via `queryPromo`).
- **Variant from promo**: book scripts parse `C-<code>-` from the promo
  (`/C-(\d+)-/`). If it equals `productCode` → start without books and hide the toggle; if it equals
  `productCode2` → start with books and hide the toggle; otherwise the default state.
- **Auto-applied default coupon** (`scriptvar26.js`): `applyAutomaticCoupon('<code>')` runs on load
  and on every books toggle with a per-variant code (e.g. `Varsity26` / `Varsity26book`), guarded
  by `couponRequestId` (drop stale responses) and `setCouponApplying` (disables `#moda` with
  "Coupon applying .."). Copy this whole block when a course needs it.
- Static "X% discount applied with CODE" banners in HTML (`<center>` under the coupon box) are
  marketing text only — comment them out when the coupon ends (see IBA commit 4a28f60b4).

## 7. Books toggle (with-books variants)

- `#addbooksdiv` holds checkbox `#addBooks`; label "Add Books (+<pls2−pls> TK) 🏠 (Delivery Charge included)".
- Checked → show `#shippingFields`, set price `pls2`, `productcode = productCode2`, mark
  `ship_name, ship_phone, ship_add1, ship_city, ship_upzilla` required.
- Unchecking opens a Swal2 "Are you sure?" with a book image, a random reading quote, Bangla text
  ("আমাদের বইগুলো … পরিপূরক"), optional "গত বছরের সাইকেলের বইয়ের রিভিউ" button (`bookReviewUrl`).
  Confirm ("না আমি বই নিতে চাইনা") → price `pls`, `productcode = productCode`, fields not required.
  Cancel → re-check.
- **Default variant** = the `else` branch at the top of the script (no/unknown promo). Most current
  book courses default to **books checked** (`productcode = productCode2`). To flip the default
  (as in commit 804b7677c "fahad med default without book"), change that `else` branch **and** the
  `checked` attribute on `#addBooks` in HTML.
- District → Upazila dropdowns come from the inline `districtUpazilas` map at the bottom of the page HTML.
- The yellow `<small>` under Address states when delivery starts — update per launch.

## 8. Enrollment counter (`#enrolled`)

`GET https://${shopName2}/enrollment?productCode=<code>` (normal),
`/enrollment/<Cycle>?productCode=<code>` (cycle-scoped), `/enrollment/combined?productCodes=a,b,c`
→ `{count}`; CountUp animates `count + init`. Newer pages sum several sources with
`Promise.all` (cycle code + books code + covering combos + partner platforms):
- ACS Future School: `https://hsc.acsfutureschool.com/api/enrollments/count?product_code=<code>` → `data.count`
- Rakib's Classroom: `https://rakibsclassroom.com/api/enrollments/count?product_code=<code>&key=…` → `data.count`
- ACS Camp: `POST https://api.acscamp.com/v1/products/sales-count` `{productGroup, productCode}` (cycle N → offset + N, e.g. `phy28` 1000+N)
- Achieve: `https://achieveacs.com/api/v1/b2b/enroll-count?courseId=<achieveID>`

Only add partner counts when the user says the course is also sold there.
Landing pages add `/shop/assets/js/course-total-enrollment.js`, which fetches each linked
Cycle/Combo page's `info.js`/`ss.js`, regex-extracts the endpoints above and shows
"Total enrolled: N" above `.buttonContainer` (cached 10 min in localStorage). It only understands the
patterns listed in that file — keep new `ss.js` files in the same shape so it keeps working.
`data-count-total-cycles="Cycle-1,Cycle-2"` on `.buttonContainer` limits which links are counted.

## 9. Pre-booking (before a course opens)

`pre-book.html` + `prebk.js`/`prebook.js` post the form to a Google Apps Script `scriptURL`
(`?q=Indivisual&uid=` returns whether already booked + booking count; POST FormData returns
`roll` = booking number). No payment. When enrollment opens, hub buttons change
"Pre-book Now" → "Enroll Now" and point to the real page (commit 8426ae7ac).

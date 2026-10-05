# Normal (single-product) courses

One page = one purchasable product (or two when books are optional). Typical homes:
`shop/admission/HSC_XX/<Course>/`, `shop/achieve/HSC_XX/<course>/`, `shop/<teacher>/<course>/`,
top-level `shop/<COURSE>/` (FRB27, IELTS, architecture-2026…).

## Layout

```
<Course>/
  index.html
  assets/
    info.js     config globals
    ss.js       page chrome: swiper, sticky price box, enrollment counter
```
The purchase script is usually **shared by the batch folder** and loaded relatively:
`<script src="../assets/js/scriptiba.js" defer>` (admission/HSC_26), `../assets/js/sript.js`
(achieve, older admission), `../js/sript.js` (teacher folders), or local `./assets/sript.js` (FRB27).
The batch folder also has its own `assets/js/key.js` (same hosts as `/shop/assets/js/key.js`, plus `cuponApi2`).

Script tag order in `index.html`:
```html
<script src="/shop/assets/js/script.js" defer></script>      <!-- in <head>, after Firebase -->
…
<script src="../assets/js/key.js" defer></script>
<script src="/assets/js/count.js" defer></script>
<script src="./assets/info.js" defer></script>
<script src="./assets/ss.js" defer></script>
<script src="../assets/js/<purchase-script>.js" defer></script>
```

## Normal, no books (template `shop/admission/HSC_26/IBA/` + `scriptiba.js`)

`info.js`:
```js
const product = "iba26";
const productName = "ACS IBA BBA Admission Private Batch 2026";
const productCode = "811";
const fix = 10000;
const pls = 8000;
const Platform = "Online";
const init = 0;
```
Script: sets prices on load, purchase check `POST /v3/purchase/multiple` with
`products: [productCode, …older/sibling codes]` (e.g. the CX-special code so special buyers are
recognised), init `POST /<productCode>/init`, coupon by `productCode`, promo via cookie
(`queryPromo`). Logged-in button text: "কোর্সটিতে এনরোল করো".
`ss.js` counter: `/enrollment/combined?productCodes=${productCode},<other codes>` to sum siblings.

If a new course needs its own sibling-code list, create a new `script<name>.js` next to the others
rather than editing a script another live course uses.

## Normal WITH books (templates `admission/HSC_26/Engineering` + `scripteng26.js`, `FRB27`, `admission/HSC_27/MediMaster` + `scriptmedi27.js`)

`info.js`:
```js
const product = "Engineering26";            const product2 = "Engineering26wbooks";
const productName = "…";                   const productName2 = "… with Books";
const productCode = "591";                  let productCode2 = "596";   // books
const productCode3 = "592"; let productCode4 = "597"; let productCode5 = "837"; let productCode6 = "838"; // extra codes for the enrolled check
const fix = 10000; const pls = 5000; const pls2 = 7250;
const Platform = "Online"; const Platform2 = "Physical";
const init = 0;
```
Script = the books machinery from purchase-flow.md §7 (promo `C-<code>-` variant detection,
default variant in the `else` branch, Swal2 confirm on uncheck, shipping fields), purchase check
`/v3/purchase/multiple` with all codes, init `POST /<productcode>/init` (lower-case `productcode` =
currently selected variant). Some book scripts toggle extra info blocks
`#couponinfocenter` / `#couponinfocenter2` (no-books vs books promo text) — keep those IDs in the HTML
if the script references them, or guard with `if (el)`.

HTML needs: `#addbooksdiv` with `#addBooks` (add `checked` when books are the default),
`#shippingFields` block inside the modal, the `districtUpazilas` inline script at the bottom,
sweetalert2 CDN, the `.custom-checkbox` / `.no-image-margin` styles, the Swal book image URL in the script.

Auto-coupon variant: `admission/HSC_26/Varsity` + `scriptvar26.js` (`applyAutomaticCoupon`,
per-variant coupon codes `Varsity26` / `Varsity26book`). Engineering 26 has the same logic in
`scripteng26.js` history (commit 85f363563) — copy from `scriptvar26.js`.

## CX special (hidden campaign copy)

Folder = course name + random suffix (`IBASpecialXeBm6Q`, `VarsitySpecialY8p76m`,
`EngineeringSpecialj2w5fY`, `PreMedicalSpecial1fH5fS`) so the URL is unguessable. Own product code
and lower price; `product = "<slug> (CX Special)"`; `<meta name="robots" content="noindex, nofollow">`;
**not** linked from any hub or sitemap. `info.js` keeps the regular codes (`productCode2/3`) so
regular buyers are detected as enrolled; its script (`script<name>special.js`) fixes
`const productcode = productCode` (no books). The regular page's purchase-check list also includes
the special code.

## Achieve (offline, branch + batch) — template `shop/achieve/HSC_27/achievefrb27/`

`info.js` adds `achieveID` (Achieve platform course id, used by `ss.js` for
`https://achieveacs.com/api/v1/b2b/enroll-count?courseId=`) and `Platform = "Offline"`.
`../assets/js/sript.js`: logged in → loads branches
`https://crm.apars.shop/branch/find/available-branches?productId=<code>` into `#branch`, then batches
`…/available-batches?branchId=&productId=` into `#batch` (full batches disabled). Purchase check
`POST /<productCode>/purchase` → "Already Enrolled" button "Achieve Card". Init
`POST /v2/<productCode>/init` with `BranchName`, `BranchId`, `BatchId`. The HSC_XX hub
`achieve/HSC_XX/index.html` lists the cards. Branch/batch data lives in the CRM — the user must set it up there.

## Teacher-folder legacy courses (`shop/<teacher>/js/sript.js`, `sript2.js`)

Older single products (`sakib/benjon28`, `reza/*`, `codervai/*`) use `assets/info.js` +
`../js/sript.js` with the legacy `POST /<productCode>/purchase` check. Fine to clone for a
same-teacher course; for anything new prefer the admission-style scripts above.

## Variations to watch for when cloning an older page

- `const`/`let` mix: some pages declare `productCode2` with `let` — keep each global declared
  exactly once across all loaded files; redeclaring in two files throws and kills the page.
- `normalizePhone` exists only in newer scripts; older ones send the raw phone.
- `Referrer` key appears twice in the init body (second wins = `Platform` cookie) — existing quirk.

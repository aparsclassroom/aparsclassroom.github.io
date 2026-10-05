# Cycle courses

A subject is split into **cycles** (each ≈ 3–4 chapters, ~4 months, sold separately) plus optional
**combos** (bundles of cycles) and an optional free **Cycle-0**. Each cycle/combo is its own backend
product code (two codes when books are offered).

## Folder layout (current generation, e.g. `shop/physics/b2m28/`)

```
<course>/
  index.html            landing: banner + buttons to Combos and Cycles (+ course-total-enrollment.js)
  pre-book.html         optional, pre-launch (assets/info.js + assets/ss2.js + ../js/prebk.js)
  assets/
    script.js           SHARED purchase script for all Cycle-N pages (books toggle, checks, init, coupon)
    info.js             landing/pre-book config (product, productCode of cycle 1, fix, pls…)
    ss.js / ss2.js      landing/pre-book helpers (sticky price box; ss2 = no enrollment fetch)
    js/index.js         wait() → swal "Not Published" for not-yet-open cycle buttons
  Cycle-1/ … Cycle-6/
    index.html          the cycle page
    assets/ss.js        THIS cycle's config + enrollment counter (loaded before ../assets/script.js)
  Combo1/ Combo2/ Combo3/      (or a single Combo/)
    index.html
    assets/info.js      combo config
    assets/ss.js        combo enrollment counter
    assets/script.js    combo's own purchase script (no Cycle in URL, blocks owners of covered cycles)
  Cycle-0/              optional free cycle
```

Cycle page script tags (order matters):
```html
<script src="/shop/assets/js/key.js" defer></script>
<script src="/assets/js/count.js" defer></script>
<script src="assets/ss.js" defer></script>
<script src="../assets/script.js" defer></script>
```
Combo page: `key.js`, `count.js`, `assets/info.js`, `assets/ss.js`, `assets/script.js`.

Teacher-folder courses (`shop/<teacher>/<course>/`) are identical, one level deeper. Older courses
(HSC 24–27 at `shop/b2m27/`, `shop/chem27/`…) are top-level.

## Cycle WITH books (template `shop/physics/b2m28/`)

`Cycle-N/assets/ss.js`:
```js
const product = "b2m28";            const product2 = "b2m28wbooks";
const productName = "ACS Camp HSC 2028 Physics";
const productName2 = "ACS Camp HSC 2028 Physics with Books";
let productCode = "734";            // this cycle, no books
let productCode2 = "740";           // this cycle, with books
let productCode3 = "746";           // combo covering this cycle (no books)
let productCode4 = "749";           // same combo with books
let productCode5 = "748";           // total combo (no books)
let productCode6 = "751";           // total combo with books
const fix = 1500; const pls = 1000; const pls2 = 1350;
const init = 0; const Platform = "Online"; const Platform2 = "Physical";
const Cycle = location.pathname.split('/')[4];   // see path-index gotcha
```
Same slug (`product`) for every cycle; only codes differ. The shared `script.js` checks
`[productCode, productCode2]` against `/v3/purchase/multiple/<Cycle>` **and**
`[productCode3..6]` against `/v3/purchase/multiple` (owning a covering combo = already enrolled),
then posts to `/<Cycle>/<productcode>/init`. Title becomes `productName(Cycle-N) | ASG Shop`
(override the suffix with a global `productDisplaySuffix`).

Code-numbering convention seen in every HSC 28 book course: the backend creates codes in blocks —
all no-book cycle codes consecutive, then all with-book cycle codes, then combos
(e.g. b2m28: cycles 734–739, cycles+books 740–745, combo1/2 746/747, combo3 748, combo1/2+books
749/750, combo3+books 751). Always use the codes the user gives; the pattern only helps spot typos.

Alternative used by `dmc-dreamers/b2b28`: no `productCode3..6` in `ss.js`; instead the shared
`script.js` has a map `b2b28CycleComboBlocks = { "Cycle-1": [combo codes…], … }`. Either way works —
stay consistent within a course.

Exceptions inside a book course: a cycle without books uses a separate `scriptnobk.js` (no toggle,
no shipping; e.g. `chem28/Cycle-4`) and its HTML drops `#addbooksdiv`.

## Combos (with books)

`ComboN/assets/info.js` — same shape as above with `product = "<slug>combo1"`,
`product2 = "<slug>combo1wbooks"`, combo codes, combo prices (`fix 4000 / pls 2750 / pls2 3750` for a
half combo, `8000 / 5000 / 7000` for the total combo in physics/math/chem 28).

`ComboN/assets/script.js` differs from the cycle script:
- no `Cycle`; init is `POST /<productcode>/init`; title is just `productName`.
- `blockedCyclePurchaseChecks = [{cycle:"Cycle-1", products:["734","740"]}, …]` — the cycles this
  combo covers; each checked with `/v3/purchase/multiple/<cycle>`.
- plus `checkPurchase([productCode, productCode2], uid)` and a check for the total combo codes
  (half combos) or for both half-combo codes (total combo, e.g. `["746","747","749","750"]`).
- coupon success hides `#addbooksdiv`; Swal text says "কোর্সের লেকচার কন্টেন্টের পরিপূরক".

Combo HTML vs cycle HTML: loads `assets/info.js` and own `assets/script.js`; adds JSON-LD `Course`;
`#duration` is usually "১ বছর" for full-year combos (commits on 2026-09-30 fixed many that still said
"৪ মাস"); "Add Books (+X TK)" with the combo difference; description lists covered cycles.

Combo coverage differs by subject — ask:
- Physics/Math/Chem 28: Combo1 = Cycles 1–3 (1st paper), Combo2 = 4–6 (2nd paper), Combo3 = all.
- Biology 28 (b2b28, hbio28, compactbio28): Combo1 = Cycles 1,3,5; Combo2 = 2,4,6; Combo3 = all.

## Cycle WITHOUT books (template `shop/tanvir/banglabodh28/`, `shop/jamil/jamileng28/`)

`Cycle-N/assets/ss.js`: `product`, `productName`, `productCode` (per cycle), `fix`, `pls`, `init`,
`Platform`, `Cycle`, and the counter (often also the combo code via `comboProductCode` /
`comboEnrollmentCode` so cycle pages show combo buyers too).

`assets/script.js`: no books code at all; prices set once on load (`#prevP`, `#nop`, `#sprice`,
`#price`); purchase check = `POST /<productCode>/purchase/<Cycle>` + `/v3/purchase/multiple`
with the combo code(s); init = `POST /<Cycle>/<productCode>/init`; coupon checks `productCode`.
HTML has no `#addbooksdiv` / `#shippingFields` / district script.

Combo (`Combo/assets/script.js`): a `<prefix>ComboBlocks` map
`{ "<comboCode>": { combos: [], cycles: [{cycle:"Cycle-1", products:["662"]}, …] } }` checked both on
login and again in a capture-phase `submit` listener (eligibility re-check before paying).
Rename the `tundraRegion28…` / course prefix consistently when cloning.

## Free Cycle-0

Two styles:
1. **Link-out** (cleanest: `dmc-dreamers/b2b28/Cycle-0`): price box shows "ফ্রি সাইকেল"; the
   buy button is replaced by an `<a>` to the FB group ("ক্লাসে জয়েন করো"); `ss.js` only does page
   chrome + an enrollment count; no purchase script. (`jamil/jamileng28/Cycle-0` is a quicker hack:
   a cycle page whose button has no `id="moda"` and wraps the FB link, while still loading
   `../assets/script.js` — works, but prefer the b2b28 shape for new ones.)
2. **Login-gated** (`SchoolofExcellence/techtest/Cycle-0`, `lodestareng28/Cycle-0`,
   `kazi/kazieng28/Cycle-0`): `assets/free.js` with `freeCourseGroupUrl`; logged-in → "Get access now"
   opens the group; logged-out → login redirect.

Add it to the landing page (`<a href="./Cycle-0/">Free Course…`) and the hub card.

## Landing page (`<course>/index.html`)

- Banner image + "এইচএসসি'২৮ (এসএসসি'২৬) ব‍্যাচের জন‍্য" line.
- `.buttonContainer` with buttons: `class="combo-total"` (orange) for the total combo,
  `class="combo-group"` (green) for half combos, plain for cycles; text = cycle name + chapters.
- Not-yet-open cycle: `<a type="button" onclick="wait()">…</a>` (needs `assets/js/index.js`).
- `<script src="/shop/assets/js/course-total-enrollment.js" defer>` for the total badge.
- HSC 28 pages use the `hsc28-shop-header` nav with "Join Official FB Group"
  (`/shop/assets/css/hsc28-fb-group.css`).

## Adding a new cycle to a running course

1. `cp -R Cycle-5 Cycle-6`; edit `Cycle-6/assets/ss.js` codes (+ covering combo codes).
2. Edit HTML: title "| Cycle 6 |", canonical/og:url, description, chapter list, thumbnail.
3. Landing button (replace the `wait()` stub).
4. Every combo that should cover it: add `{cycle:"Cycle-6", products:[code, code2]}` to
   `blockedCyclePurchaseChecks` and update the combo description.
5. Hub card list (`<li>Cycle-6: …</li>` + button).

## Path-index gotcha

`const Cycle = location.pathname.split('/')[4]` is right for `/shop/<teacher>/<course>/Cycle-N/`;
top-level courses (`/shop/<course>/Cycle-N/`) need `[3]`. Wrong index → `Cycle` is `"Cycle-N"`'s
neighbour (e.g. `"index.html"` or `""`) → wrong/blank init URL. Safest: 
`location.pathname.split('/').find(part => /^Cycle-\d+$/.test(part))` (used by chem28aloron).

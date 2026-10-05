# Architecture, repo map, page contract, gotchas

## Hosting

- GitHub Pages, branch `master`, custom domain `aparsclassroom.com` (CNAME). No build, no bundler,
  no package.json; Jekyll default processing (no `.nojekyll`), so dot-folders like `.claude/` are not
  published. Push = deploy.
- Backend APIs (not in this repo): `shop.aparsclassroom.com` (products, purchase checks, init,
  enrollment counts, coupons, logs), `profile.aparsclassroom.com` (dashboard profile/OTP),
  `crm.apars.shop` (Achieve branches/batches), Google Apps Script (pre-booking),
  partner count APIs (acscamp, acsfutureschool, rakibsclassroom, achieveacs).
- Auth: Firebase project `asg-shop` (config in `/shop/assets/js/script.js`). Login page:
  `/shop/dashboard/login?signInSuccessUrl=…`; student dashboard `/shop/dashboard/`.

## Repo map (top level)

`shop/` — the store (≈4k files, everything this skill is about). `payment/` — post-gateway
success/failed/cancel pages. `assets/` — shared JS (`count.js`, `sweetalert.min.js`,
`swiper-bundle.min.js`), images, `assets/postimg/<id>/` self-hosted image mirror.
`HSC-Full-Course/` (logo `assets/images/1.png` used in shop navs), `BioDictionary/`, `Photon/`,
`App/`, `QnA/`, `QNA-Hint/`, `acsapp/`, `affiliation/`, `Ambassador/`, `Mentorship/`, `crm/`,
`daily-quiz/`, `free-pdf/`, `url-shortner/`, `upload/` — unrelated mini-apps/landing pages.
`sitemaps/` + `websitemapv1.xml` — sitemaps. Root `*.html` — site pages (terms, privacy, refund…).

## `shop/` map

- `shop/index.html` — main store (filter bar + course rows + featured carousel).
- `shop/assets/` — shared: `js/script.js` (Firebase + cookies), `js/key.js` (API hosts),
  `js/course-total-enrollment.js`, css (`minimal.css`, `css/style.css`, `css/custom.css`,
  `css/hsc28-fb-group.css`, `css/print.css`), `images/course-thumbnails/<slug>/`.
- `shop/academic/HSC_23..28/` — academic hubs per HSC batch (+ `HSC_28/enrollment-dashboard/`).
- `shop/admission/HSC_21..27/` — admission courses (Engineering, Varsity, Medical, IBA, specials) +
  each batch's shared `assets/js/` scripts and `key.js`.
- `shop/achieve/HSC_23..28/` — Achieve offline model tests (branch/batch flow).
- Subject cycle courses, top level (older gen): `b2m24..27` (physics), `chem25..28`, `chem26Aloron`,
  `chem27aloron`, `bio26`, `bio27`, `compactbio`, `compactbio27`, `phyfusion27`, `b2a27`, `b2a28`,
  `ebi26/27`, `bundle26/27` (multi-cycle bundles).
- Teacher/brand folders (current gen lives here): `physics/` (b2m28, Apurbo–Mashrur), `abhi/`
  (Math28, ebi28, decoder…), `aloronxyz/` (chem28aloron, Mottasin Pahlovi), `dmc-dreamers/` (b2b24–28,
  Medicup), `hasnat/` (hbio28, hbio28eng…), `rtd/` (compactbio28), `drfahad/` (fahadbio28,
  SignatureSeries), `hemel/` (b2a28 pre-book, BounceBack), `jamil/`, `kazi/`, `tanvir/`, `tandra/`,
  `sadman/`, `sakib/`, `reza/`, `crowning/`, `SchoolofExcellence/`, `Unlockenglish/`, `afsFahad/`,
  `codervai/`, `onushilon/`, `emon/`, `fahim_aohin/`, `medishark/`, `biology-haters/`, …
  Teacher folders often carry `js/key.js`, `js/sript.js`, `js/prebook.js` and a teacher `index.html`.
- Standalone products: `FRB23..27` (+ `FRB26onlybook`), `SSC-FRB24/25`, `Commerce-FRB25`,
  `architecture-2023..2026`, `IELTS`, `Japanese`, `sat`, `ExamApp`, `BioDictionary`, `Book`, `cpv3`…
- `shop/dashboard/` (student dashboard + login), `shop/eligibility-checker/`, `shop/return.html`
  (legacy bKash return), `shop/success_story/`.

Naming (HSC 28 examples): `b2m28` = ACS Camp Physics (Apurbo–Mashrur), `Math28` = Higher Math
(abhi), `b2a28` = Basic to Advance Chemistry by Hemel (top-level `shop/b2a28/`), `chem28` =
Chemistry by ChemShifu, `chem28aloron` = Academic Chemistry (Mottasin Pahlovi), `b2b28` = Biology by
DMC Dreamers, `hbio28` = College Biology by BioMission (Hasnat), `compactbio28` = Compact Biology
(rtd), `fahadbio28` = Dr Fahad biology, `ebi28` = English/Bangla/ICT. `FRB` = Final Revision Batch,
`FMT` = final model test, `wbooks`/`wbook` = with books. Year suffix = HSC batch year.

## Page DOM contract (IDs the purchase scripts expect)

| ID | Element |
|---|---|
| `doc` | `<html id="doc">` — replaced by the init response |
| `prod` | `<h3>` course name |
| `prevP`, `nop`, `smp` | price line: `<span id="smp"><del><span id="prevP"></span>৳</del> <span id="nop"></span></span>` |
| `enrolled`, `duration` | stat tags ("কোর্সটি করছেন", "সময় লাগবে") |
| `video`, `clprc`, `thumb`, `player` | right column, sticky/fixed-bottom price box (`ss.js` toggles `fixed-bottom` ≤600px) |
| `app`, `cup`, `coupnbosh`, `cupon`, `cpnCheck`, `how` | coupon UI (`oninput="func()" onkeyup="suc()"`) |
| `addbooksdiv`, `addBooks` | books toggle (book courses only) |
| `moda` | main buy button (opens `#purchaseFrm`) |
| `purchaseFrm`, form `purchase` | modal + form |
| `name`, `email`, `college`, `hscBatch`, `phone`, `uid`, `disC`, `price`, `sprice`, `gridCheck`, `buy` | form fields |
| `shippingFields`, `ship_name`, `ship_phone`, `ship_add1`, `ship_city`, `ship_upzilla` | shipping (book courses) |
| `branch`, `batch`, `branchInfo` | Achieve only |
| `couponinfocenter`, `couponinfocenter2` | optional promo-text blocks some book scripts toggle |

A script that does `document.getElementById('x').…` on a missing ID throws and stops everything
after it — when removing UI (e.g. books), remove the matching script lines or switch to the
no-books script.

## Gotchas

1. **Cycle path index**: `split('/')[4]` for `/shop/<teacher>/<course>/Cycle-N/`, `[3]` for
   `/shop/<course>/Cycle-N/`. Prefer the `.find(/^Cycle-\d+$/)` form in new code.
2. **Relative script paths**: cycle pages use `../assets/script.js`; combos use `assets/script.js`.
   After `cp -R` to a different depth, root-relative `/shop/...` paths still work but `../` ones
   may not.
3. **Global collisions**: config is plain top-level `const`/`let` across several classic scripts —
   declare each name once. Combo `info.js` must not be loaded alongside a cycle `ss.js`.
4. **Shared scripts are live for other courses**: `shop/admission/HSC_26/assets/js/*.js`,
   teacher `js/sript.js`, a course's `assets/script.js` — editing one changes every page that loads
   it. Copy to a new file when behaviour must differ.
5. **Leftovers after cloning**: grep the new folder for the template's slug, codes, year, teacher
   names, image paths, FB group link, YouTube IDs, `canonical`/`og:url`.
6. **`key.js` hosts**: always `shop.aparsclassroom.com` in production. `payment.aparsclassroom.com`
   appears only in the `techtest` experiment — do not switch a live course to it unless asked.
7. **Prices**: HTML/JS prices are display only; the backend charges per product code. Price edits
   (e.g. commit 61a9abbe5 "iba pricing edit") must also be made in the backend.
8. **Cache busting**: browsers cache JS; pages that change a shared script sometimes append
   `?v=YYYYMMDD-N` to the `<script src>` (chem28aloron). Do this when editing a widely cached script.
9. Bangla text is everywhere (UTF-8). Use Bangla digits in Bangla copy (৪ মাস, ১ বছর) and keep `lang`/`class="bangla"`.

## Useful commands

```bash
# product registry (dir | slug | codes | prices | BOOKS | scripts)
python3 .claude/skills/asg-shop-launch/scripts/registry.py shop
# who uses a product code
grep -rn '"734"' shop --include='*.js'
# syntax-check edited scripts
node --check shop/<path>/assets/script.js
# find leftovers after cloning
grep -rn -e 'b2m28' -e '734' shop/<new-course>
```

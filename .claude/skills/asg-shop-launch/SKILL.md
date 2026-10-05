---
name: asg-shop-launch
description: Knowledge base for the ASG Shop (aparsclassroom.com/shop) static course store. Use whenever launching, cloning, editing, pricing, closing, or debugging a course page under shop/ — cycle courses (with books / without books), combos, free Cycle-0, normal single-product courses (with or without books), offline Achieve courses, pre-booking pages, coupons/promo links, product codes, enrollment counts, the purchase/payment flow, or adding a course to hub pages (shop/index.html, shop/academic/HSC_XX, teacher pages, sitemap).
---

# ASG Shop course launch kit

Static GitHub Pages site (`aparsclassroom.com`, CNAME). No build step: every course page is
hand-written HTML + a few small JS files. The backend (`shop.aparsclassroom.com`) owns product
codes, prices it charges, coupons and payment; this repo only renders pages and posts to it.

**Read only what the task needs:**

| Task | Read |
|---|---|
| Any launch — decide the type first | the decision table below |
| How buying works, endpoints, coupons, promo links, books toggle, post-payment | [references/purchase-flow.md](references/purchase-flow.md) |
| Cycle course (Cycle-N, Combo, free Cycle-0, landing, pre-book) | [references/cycle-courses.md](references/cycle-courses.md) |
| Normal (single product) course, with/without books, CX-special, offline Achieve | [references/normal-courses.md](references/normal-courses.md) |
| Listing the course on hub pages, SEO, sitemap, closing a course | [references/hub-pages-and-seo.md](references/hub-pages-and-seo.md) |
| Repo map, shared globals, page DOM contract, gotchas | [references/architecture.md](references/architecture.md) |
| Which product codes / slugs / prices already exist | run `python3 .claude/skills/asg-shop-launch/scripts/registry.py shop` (or grep [references/registry.txt](references/registry.txt), a snapshot) |

## Decision table — what kind of course is it?

| User says / data shows | Type | Best template to clone (newest, cleanest) |
|---|---|---|
| Cycles + book add-on, combos | **Cycle course WITH books** | `shop/physics/b2m28/` (Cycle-1..6, Combo1/2/3) |
| Cycles, no books, maybe one combo | **Cycle course WITHOUT books** | `shop/tanvir/banglabodh28/` (Cycle-1..2 + Combo) or `shop/jamil/jamileng28/` (+ free Cycle-0) |
| A free intro cycle | **Cycle-0 free** | `shop/jamil/jamileng28/Cycle-0/` (FB-group button) or `shop/SchoolofExcellence/techtest/Cycle-0/` (`free.js`, login-gated) |
| One product, one price | **Normal course** | `shop/admission/HSC_26/IBA/` (+ `assets/js/scriptiba.js`) |
| One product + optional books | **Normal course WITH books** | `shop/admission/HSC_26/Engineering/` (+ `scripteng26.js`), `shop/FRB27/` (+ `assets/sript.js`), `shop/admission/HSC_27/MediMaster/` (+ `scriptmedi27.js`) |
| Book toggle + an auto-applied coupon per variant | **Normal with books + auto coupon** | `shop/admission/HSC_26/Varsity/` (+ `scriptvar26.js`, `applyAutomaticCoupon`) |
| Hidden discounted copy of an existing course for a campaign | **CX special** | `shop/admission/HSC_26/IBASpecialXeBm6Q/` (random-suffixed folder, own product code) |
| Offline / branch + batch selection | **Achieve offline** | `shop/achieve/HSC_27/achievefrb27/` (+ `../assets/js/sript.js`) |
| Course not open yet, collect interest | **Pre-book page** | `shop/physics/b2m28/pre-book.html` (+ `../js/prebk.js`, Google Apps Script) |

## Launch checklist (any type)

1. **Collect inputs** (ask only for what's missing — see the template below).
2. **Clone the template folder** with `cp -R`, never hand-retype pages. Keep relative script paths valid
   (cycle pages load `../assets/script.js`; combos and normal courses load their own).
3. **Edit config only**: `assets/info.js` (normal / combo) or `Cycle-N/assets/ss.js` (cycle) —
   slugs, names, codes, `fix` / `pls` / `pls2`, `Platform`. Then the cross-product code lists
   (combo codes inside every cycle's `ss.js`, `blockedCyclePurchaseChecks` inside each combo
   `script.js`, the `products` array of the purchase check).
4. **Edit page HTML**: `<title>`, canonical, meta description, og:* tags (title/description/image/url),
   JSON-LD, teacher cards, description block, feature tags, `#duration`, thumbnail `<img>` in `#thumb`,
   the "Add Books (+X TK)" label (= `pls2 - pls`), FB group link, HSC batch `<select>` options,
   book-delivery note.
5. **Register the course**: landing page buttons (cycle course), `shop/academic/HSC_XX/index.html`
   card, `shop/index.html` (only if featured), teacher page (`shop/<teacher>/index.html`),
   `websitemapv1.xml`.
6. **Verify**: `node --check` each edited JS file; grep the new folder for the template's old slug,
   old codes, old cycle numbers, old image paths and old year (e.g. `b2m28`, `734`, `2028`) to catch
   leftovers; confirm `Cycle` path index (see architecture gotchas).
7. Commit only when asked. Before pushing to `master`, fetch first (other clones push concurrently;
   force-push is blocked).

## Input template to ask the user for

```
Course type:            cycle-with-books | cycle-no-books | normal | normal-with-books | achieve | prebook
Folder / URL:           shop/<teacher>/<slug>/       (teacher folder or top-level)
HSC batch:              e.g. HSC 28  (also: which <select> options to show)
Product slug(s):        e.g. xyz28 / xyz28wbooks      (must match backend product names)
Product codes:          per cycle: code (no books) + code2 (with books); per combo: code + code2
Prices:                 fix (strike-through) / pls (no books) / pls2 (with books)  — per cycle & combo
Combos:                 which cycles each combo covers (e.g. Combo1 = C1-3, Combo2 = C4-6, Combo3 = all)
Teachers:               name, credential line, photo URL
Content per cycle:      chapter list, duration (e.g. ৪ মাস / ১ বছর), Bangla description, feature tags
Images:                 thumbnail per cycle/combo + landing banner (+ og:image)
Links:                  FB group, "how to buy" YouTube video, book review video (books courses)
Default variant:        books checked by default? (most book courses: yes)
Auto coupon:            coupon code(s) to auto-apply, if any
Listing:                which hub pages / filter tab to add it to
```

Product codes come from the backend admin — never invent them. If the user does not give a code,
leave a clearly marked `TODO` and say so.

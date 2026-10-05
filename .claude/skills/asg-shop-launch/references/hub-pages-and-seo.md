# Hub pages, SEO, images, closing a course

A new course page is invisible until it is linked. Update every hub the user asks for; default set
is in bold.

## Where courses are listed

| Hub | When | How |
|---|---|---|
| **`shop/academic/HSC_XX/index.html`** | any academic (HSC batch) course | add a card (below) |
| `shop/admission/HSC_XX/index.html` | admission courses | card, same markup family |
| `shop/achieve/HSC_XX/index.html` | Achieve offline | card |
| **Teacher page `shop/<teacher>/index.html`** | course belongs to a teacher folder | card with an `id` (e.g. `id="MediMaster27"`), see commit 186be6ace |
| `shop/index.html` (main shop) | featured / new batch | course row with `data-id` filter tag, and/or a featured carousel `.item p-3` card, and/or a filter-bar button (FRB27 got a shiny `.btn-frb27` "NEW" button, commit b48a896d1) |
| Course landing `<course>/index.html` | cycle courses | `.buttonContainer` buttons (see cycle-courses.md) |
| **`websitemapv1.xml`** | every public (non-CX) page | `<url>` entry |

### Academic hub card (`shop/academic/HSC_28/index.html`)

```html
<div class="col-12 mb-3">
  <div class="card bg-primary shadow-soft border-light p-4">
    <div class="row align-items-center">
      <aside class="col-md-3">
        <a href="/shop/<teacher>/<course>/">
          <img sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1199px) 25vw, 270px"
               src="https://aparsclassroom.com/shop/assets/images/course-thumbnails/<slug>/main.webp"
               loading="lazy" decoding="async" class="course-thumb course-thumb-square" alt="<Course name>">
        </a>
      </aside>
      <div class="col-md-6">
        <div class="info-main">
          <a href="/shop/<teacher>/<course>/" class="h5 title"><Course name></a>
          <div class="d-flex my-3"> …5 × <span class="star fas fa-star text-warning fa-beat …"> (copy) </div>
          <p class="bangla"> Bangla pitch </p>
          <ul>
            <li>Combo: … (Enrollment On)</li>
            <li>Cycle-1: … (Enrollment ongoing)</li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="mt-4">
          <a class="btn btn-primary btn-sm btn-block mb-3" href="/shop/<teacher>/<course>/"><i class="fas fa-info-circle mr-1"></i> Enrollment Details</a>
          <a href="/shop/<teacher>/<course>/Combo/" class="btn btn-primary btn-sm btn-block"><span class="fas fa-shopping-cart mr-1"></span> Combo <br> Enrollment Details</a>
          <a href="/shop/<teacher>/<course>/Cycle-1/" class="btn btn-primary btn-sm btn-block"><span class="fas fa-shopping-cart mr-1"></span> Cycle-1 <br> Enrollment Details</a>
        </div>
      </div>
    </div>
  </div>
</div>
```
The HSC_28 hub has its own inline copy of the total-enrollment logic (cache key
`hsc28EnrollmentCount:v2:`) that reads each card's Cycle/Combo links the same way
`course-total-enrollment.js` does; `data-count-total-cycles="Cycle-1,Cycle-2,Cycle-3"` on a card's
container limits it. If a new count source is added to `course-total-enrollment.js`, mirror it in the
hub's inline copy (commit e30fee535 did this for Rakib's Classroom).

Placement: newest/most important near the top of its section. A "highlighted course" carousel at the
top of an HSC hub (`#Carousel`, commit 13a24646f) can feature one course image.

### Main shop page (`shop/index.html`)

Course rows: `<div class="row mb-3 mt-3 course" data-id="HSC28">…card…</div>`; the filter bar
`filterDivs('HSC26'|'HSC27'|'HSC28'|'HSC29'(=SSC 27)|'jp'|'HSC25offline'(=Achieve)|'others')` shows
rows by `data-id`. Old rows are commented out, not deleted. The featured carousel section lower down
uses `<div class="item p-3"><div class="card bg-primary shadow-soft border-light">… <h2 class="h2 card-title">…</h2> <a class="btn btn-block" href="…">…</a>`.

## SEO block for every new page (`<head>`)

- `<title>`: cycle `"<Course> | Cycle N | ASG Shop"`, combo/normal `"<Course> | ASG Shop"` (the
  script overwrites `document.title` at runtime, but crawlers read the HTML).
- `<link rel="canonical" href="https://aparsclassroom.com/shop/…/">` (trailing slash).
- `<meta name="robots" content="index,follow">` (CX special: `noindex, nofollow`).
- `<meta name="description">` — Bangla one-liner, e.g. "HSC 28 ব্যাচের Physics একাডেমিক কোর্সের Cycle 4 এ … কভার করা হবে।"
- `og:title`, `og:site_name`, `og:description`, `og:image` + `og:image:secure_url` (the thumbnail),
  `og:url` (= canonical), `og:type=website`; `application-name` / `apple-mobile-web-app-title`.
- Combo, landing and admission pages add JSON-LD `{"@type":"Course", name, description, provider:{ASG Shop}, instructor…}`.
- Facebook pixels (`430193434618183`, `593459298431756`) and Cloudflare beacon are part of the template — keep them.

## Sitemap (`websitemapv1.xml`)

```xml
<url>
  <loc>https://aparsclassroom.com/shop/<path>/</loc>
  <lastmod>2026-10-05T00:00:00+06:00</lastmod>
  <priority>0.80</priority>
</url>
```
Add the landing page (and cycle/combo pages if the user wants them indexed). Use today's date, +06:00.

## Images

- Never hotlink `i.postimg.cc` (its TLS cert expired 2026-09-10; commit 78b8ddd12 self-hosted
  everything). New images go to `shop/assets/images/course-thumbnails/<slug>/` (webp, e.g.
  `main.webp`, `cycle1.webp`, `combo-1.webp`) or `assets/postimg/<8-char-id>/<file>`; reference
  root-relative (`/assets/postimg/...`) or absolute `https://aparsclassroom.com/...`.
- The book-confirm Swal image and the teacher photos are per course — swap them.
- Filenames with spaces must be URL-encoded in `src` (`Frb-27%20images/...`).

## Closing / pausing enrollment

- Close a finished course (commit 6975122ee): in the purchase script add
  `const courseClosed = true;` + `markCourseClosed()`, guard the submit-handler branches with
  `!courseClosed`, and in each page change `#moda` to
  `class="btn … btn-secondary" disabled` with text "কোর্সটি সমাপ্ত হয়েছে". Enrolled students still get
  "Already Enrolled → invoice".
- Not yet open: landing button `onclick="wait()"`; hub `<li>` says "(Coming soon)".
- Hide from the shop: comment out the row in `shop/index.html` (commit 6e8e2a54a).
- Pre-book → enroll: switch hub button text/icon and href (commit 8426ae7ac).

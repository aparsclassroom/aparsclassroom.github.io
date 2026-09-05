# Apar's Classroom Project Analysis

> Repository: `Im-Shihab/aparsclassroom.github.io`  
> Branch analyzed: `master`  
> Project type: Static, multi-module education platform  
> Primary audience: Bangladeshi students, teachers, mentors, ambassadors, and internal content/admin teams

## 1. Executive summary

Apar's Classroom is not a single web application. It is a large collection of independently navigable HTML products, course portals, content pages, utilities, campaign pages, dashboards, and learning tools deployed under one domain. The repository is primarily browser-rendered HTML/CSS/JavaScript with many repeated, content-heavy routes and several Firebase, Google Apps Script, Google Sheets, video, analytics, payment, and upload integrations.

The repository currently behaves like a static website monorepo without a central package/build system. Most pages can be served directly by a static host, but interactive areas depend on external services and correct URL casing, Firebase authorized domains, browser storage, and third-party scripts.

### Inventory snapshot

| Type | Approximate tracked files |
|---|---:|
| HTML | 2,705 |
| JavaScript | 1,912 |
| CSS | 169 |
| JSON | 117 |
| Images/fonts/media | 2,098 |
| Total tracked files | 7,346 |
|

These numbers describe the checked-out repository and should be refreshed before major migrations because generated/content directories change frequently.

## 2. Repository map

### Root-level pages and shared resources

The root contains the public marketing and policy surface: `index.html`, `about-us.html`, `contact.html`, `registration.html`, `privacy.html`, `terms.html`, `return-and-refund-policy.html`, `piracy.html`, `404.html`, `robots.txt`, `websitemapv1.xml`, and several campaign or utility pages. Shared styles and media are spread across `main.css`, `output.css`, `css/`, `assets/`, `fonts/`, `images/`, and `img/`.

Important root-level platform areas include:

- `App/` — Q&A learning application.
- `BioDictionary/` — Biology dictionary, classes, exams, video, and subscription product.
- `BioCast/` — Biology content/exam/tutorial entry surface.
- `Ambassador/` — ambassador recruitment and result flow.
- `QnA/` and `QNA-Hint/` — question-answer and hint-related learning content.
- `HSC-Full-Course/`, `CrashCourse/`, `Photon/`, `Mentorship/` — course and program content.
- `ModelTest/`, `Test-Paper-Solver/`, `daily-quiz/` — assessment and practice tools.
- `shop/`, `payment/`, `pre-book.html`, `upload/` — commerce, payment, content upload, and guide workflows.
- `crm/`, `cms.html`, `affiliation/`, `moderator-election/` — internal or semi-private operational surfaces.
- `url-shortner/`, `scanner.html`, `redirect.html`, `bunny.html`, `zee.html` — utilities and experimental/tool pages.
- `shuchipotro-assets/` and `shuchipotro-download.html` — document/catalog download system with vendor assets.
- `sitemaps/` — sitemap-related content.

### App

`App/` is a Firebase-backed Q&A learning product. Its route structure is organized around a landing/login experience, subject selection, chapter pages, Q&A content, search, profile behavior, and subscription entry points. Question content is partly loaded from JSON files and rendered into the page dynamically.

Observed responsibilities include:

- Email/password Firebase authentication.
- Auth-state based redirects and logout.
- Subject and chapter navigation.
- JSON-backed question lists and searchable question cards.
- User/profile display and subscription links.
- Browser-side session flags used to preserve parts of the flow.

### BioDictionary

`BioDictionary/` is the largest and most structured product area. It contains Biology first-paper and second-paper catalogs, Botany and Zoology routes, chapter/episode pages, video lessons, dictionary content, MCQ exams, solution/highscore/end pages, affiliation-related areas, and repeated chapter assets.

A common route pattern is:

```text
BioDictionary/classes/{Botany|Zoology}/Chapter-N/
BioDictionary/classes/{...}/Chapter-N/files/video-N.html
BioDictionary/classes/{...}/Chapter-N/files/Exam/eN/
  index.html
  exam.html
  end.html
  solution.html
  highscores.html
```

The product combines free/trial gating, Firebase auth, chapter content, external or embedded video, and an exam engine. It appears to contain both hand-maintained templates and many generated/repeated chapter files.

### BioCast

`BioCast/` provides a Biology content and exam-facing experience. It includes entry pages, tutorial/player behavior, fixed MCQ variants such as 10/15/20-question modes, and links to a Google Sheets/dashboard workflow. It is best understood as a lightweight content/exam front end rather than a standalone server application.

### Ambassador

`Ambassador/` contains the ambassador recruitment campaign, landing/status states, a result page, static assets, and a multi-step form/progress flow. Its scripts manage section progression, validation, and submission/display behavior. Because this is a campaign surface, the user experience is heavily form-driven and depends on external form handlers or data endpoints where configured.

## 3. Runtime and deployment architecture

### Rendering model

Pages are rendered in the browser from static HTML. CSS is loaded from local files and external CDNs; JavaScript attaches event listeners, changes DOM state, loads JSON, calls remote endpoints, and performs client-side gating. There is no detected `package.json`, framework entry point, central server runtime, or standard test runner in the repository.

### Hosting assumptions

The repository is suitable for GitHub Pages, Vercel static hosting, or another static file host. `CNAME` indicates a custom-domain deployment. The deployment must preserve:

- Case-sensitive file and folder names.
- Existing relative URL relationships.
- Directory-style routes and `index.html` behavior.
- External script availability.
- Firebase authorized domains and authentication configuration.
- Correct handling of redirects and `404.html`.

Opening HTML files with `file://` is not an adequate local test because fetch requests, module behavior, auth callbacks, and some browser security rules require HTTP(S).

### Build/development state

The repository has no central package manager workflow or build entry point. `tailwind.config.js` and generated CSS exist, but the current site also contains legacy Bootstrap/jQuery/vendor assets and many standalone scripts. Treat the current deployment as a direct static publish workflow unless a future migration explicitly introduces a build system.

## 4. Major user flows

### App Q&A flow

1. Visitor opens the App landing/login page.
2. User signs in or creates/authenticates an account through Firebase.
3. Auth state determines whether the user may continue.
4. User selects a subject and chapter.
5. Chapter page loads question content, often from local JSON.
6. Search/filter logic renders matching question cards.
7. User can navigate to profile/logout or subscription-related surfaces.

### BioDictionary learning and exam flow

1. Visitor opens login or trial entry.
2. Firebase auth and trial/subscription checks determine access.
3. User selects Botany or Zoology and a chapter.
4. User opens dictionary entries, chapter pages, episodes, or video lessons.
5. User enters an MCQ exam.
6. Questions are fetched or assembled, randomized, timed, and scored.
7. Result, solution, highscore, and end pages consume state passed through browser storage or route conventions.

### BioCast flow

1. User enters the Biology content/exam surface.
2. User chooses tutorial or MCQ mode.
3. The selected lesson/player or question set is loaded.
4. Fixed variants such as 10, 15, or 20 MCQs drive the assessment experience.
5. Related content or dashboard links may open Google Sheets or other external resources.

### Ambassador flow

1. Visitor opens the recruitment landing page.
2. The page presents campaign information and form steps.
3. User progresses through multi-step sections with client-side validation.
4. Submission is sent to the configured external handler.
5. Status/result pages display campaign state or submitted results.

### Supporting flows

Other parts of the repository support course browsing, daily quizzes, model tests, question hints, book/document downloads, payments, shop/catalog pages, referral/affiliation forms, file uploads, URL shortening, CRM/CMS actions, and campaign registration. These areas vary significantly in age and implementation style.

## 5. Authentication, authorization, and data sources

### Firebase projects

Two Firebase configurations were observed in the project family:

- Q&A application configuration associated with project `apars-qna-app`.
- BioDictionary configuration associated with project `asg-biodictionary`.

Firebase client configuration values such as API key, project ID, auth domain, and app ID are normally browser-visible identifiers, not server secrets. However, access control must never rely only on hiding these values; it must be enforced by Firebase Security Rules and server-side checks where privileged operations exist.

### Auth patterns

Observed patterns include:

- Firebase Email/Password authentication.
- Auth-state listeners that redirect unauthenticated users.
- Email verification or subscription/trial gating.
- Anonymous or limited trial behavior.
- Logout and password-reset flows.
- Hard-coded admin/trial UID checks in client-side logic.
- `sessionStorage` and related browser flags used to carry exam or access state.

Client-side UID checks are not sufficient authorization. Any operation that changes data, exposes private content, or grants a paid/admin capability must be revalidated by Firebase Rules or a trusted backend.

### Other data sources

The repository also uses or references:

- Local JSON question/content files.
- Google Apps Script endpoints returning JSON or accepting form submissions.
- Google Sheets dashboards and content-management sheets.
- Google Drive/OAuth or upload flows.
- URL/path-derived exam identifiers.
- External video/CDN and media services.
- Browser storage for temporary exam state.

External endpoints should be cataloged and access-controlled. Apps Script deployments, spreadsheet sharing, upload scopes, and dashboard URLs should be reviewed for accidental public access.

## 6. Asset and content model

The project uses a combination of shared assets and product-local assets:

- Logos, favicons, icons, chapter thumbnails, backgrounds, preloaders, and illustrations.
- Local font files and Google Fonts.
- Vendor libraries under product-specific asset folders.
- Video/player scripts and embedded media.
- Repeated chapter/episode files with predictable naming.
- JSON question banks and content lists.

### BioDictionary naming conventions

The dominant convention is chapter and episode repetition under Botany/Zoology folders. Exam directories commonly contain `index.html`, `exam.html`, `end.html`, `solution.html`, and `highscores.html`. Video resources are commonly grouped by paper/chapter/episode, for example `Assets/video/p1/CN/EpN`.

### App naming conventions

App routes generally group content by subject and chapter, with question data stored in JSON and rendered into reusable visual cards. Search and question navigation depend on predictable data keys and page structure.

### Content maintenance implication

A large amount of the repository is content duplication rather than unique application logic. A future template/data migration should preserve the current public URL structure, because URLs are likely shared in course materials, social posts, and search results.

## 7. Important implementation details

### Dynamic Q&A search

The Q&A area loads question data, applies search/filter logic, and creates DOM cards dynamically. This makes the JSON schema and escaping strategy important. Any user-controlled or remotely loaded text inserted through `innerHTML` should be audited and preferably rendered with safe text APIs or a sanitizer.

### Exam engine

The exam flow commonly includes:

- Fetching question data from Google Apps Script or another remote endpoint.
- Randomizing question order.
- Timer/countdown handling.
- Correct/incorrect scoring.
- Passing temporary state between exam pages with `sessionStorage`.
- Redirecting to result, solution, and highscore pages.

Failure states should be handled explicitly: network failure, malformed JSON, expired session state, duplicate submissions, timer manipulation, and users opening result pages directly.

### Video/tutorial player

Video pages use YouTube, Plyr, embedded media, or external CDN patterns. Third-party player failures should produce a visible fallback rather than leaving an empty player container.

### Forms and tracking

Several forms use multi-step sections, progress indicators, reCAPTCHA, IP/geolocation collection, analytics, and external submission handlers. These flows should clearly disclose data collection and provide keyboard-accessible validation/error messages.

## 8. External integrations and dependencies

| Integration/dependency | Typical purpose | Impact if unavailable | Review notes |
|---|---|---|---|
| Firebase Auth | Login, registration, password reset, auth state | Login/protected products fail | Verify Rules, authorized domains, and project separation |
| Firebase Analytics | Usage analytics | Analytics only | Check consent/privacy requirements |
| Google Apps Script | Questions, forms, dashboards, JSON APIs | Exams/forms/content may fail | Review deployment access and token exposure |
| Google Sheets/Drive | Content/admin data and uploads | CMS/admin/upload workflows fail | Audit sharing scopes and permissions |
| Bootstrap/jQuery/Popper | Layout, components, legacy interactions | Visual/interaction regressions | Multiple versions may coexist |
| Font Awesome/Google Fonts | Icons and typography | Visual fallback | Consider local fallback and privacy |
| Plyr/YouTube | Video playback | Lesson playback fails | Add fallback and privacy-aware embeds |
| reCAPTCHA | Anti-abuse form protection | Form submission may be blocked | Verify keys, domains, and accessible challenge flow |
| Microsoft Clarity/Cloudflare Analytics | Behavior/performance analytics | Analytics only | Review consent and data minimization |
| IP/geolocation services | Location or abuse signals | Optional form logic may fail | Avoid collecting more data than needed |
| Short.io/Rebrandly | URL shortening | Utility page fails | Keep API credentials server-side |
| Facebook Pixel/other tracking | Campaign attribution | Attribution only | Audit privacy/consent behavior |
| S3/CDN/external media | Asset and content delivery | Images/videos may fail | Prefer local fallback for critical assets |

## 9. Local development and deployment guide

Because the project is static, use a local HTTP server rather than opening files directly. Any static server that serves the repository root and supports directory indexes is suitable.

Recommended validation sequence:

1. Open the root landing page and confirm CSS, fonts, images, and navigation.
2. Test `404.html` through a missing route on the deployed host.
3. Test App login, logout, auth redirect, subject, chapter, question, and search flows.
4. Test BioDictionary login/trial, Botany/Zoology chapter, video, exam, result, solution, and highscore routes.
5. Test BioCast tutorial and each MCQ variant.
6. Test Ambassador form progression, validation, submission, and result/status pages.
7. Test upload, payment/shop, quiz, model test, and document download flows.
8. Inspect browser console and network failures while disabling external services where possible.
9. Run a link/asset checker against case-sensitive paths.
10. Confirm Firebase authorized domains and third-party callback URLs for the deployed domain.

Do not change filenames or directory case casually. On a case-insensitive development machine, a broken path can appear to work locally and fail on Linux hosting.

## 10. Quality, security, accessibility, and maintainability assessment

### Strengths

- Broad education content coverage in one domain.
- Static hosting simplicity and low infrastructure overhead.
- Predictable chapter/episode/exam route patterns.
- Reusable legacy vendor components and responsive layouts.
- Firebase auth already integrated into key products.
- Separate product areas allow focused student experiences.

### Security risks

- Client-side authorization and hard-coded UID checks can be bypassed.
- External Apps Script URLs, spreadsheet links, upload handlers, and API identifiers require permission review.
- Any Short.io/Rebrandly or other service token present in browser code must be revoked and moved server-side.
- Dynamic HTML insertion needs XSS review.
- IP/geolocation and analytics collection require privacy disclosure and data minimization.
- Browser storage is user-controlled and must not be treated as authoritative exam or entitlement state.
- Firebase Rules must be reviewed independently of frontend behavior.

### Maintainability risks

- Large duplication of HTML and scripts.
- Inline CSS/JavaScript and inconsistent naming.
- Multiple Bootstrap/jQuery/vendor versions.
- No central dependency lockfile, linting, unit tests, or CI quality gates.
- Mixed relative, absolute, CDN, and path-derived URL styles.
- Repeated generated content makes global fixes difficult.
- Stale links and unavailable third-party services can silently break flows.

### Accessibility and SEO concerns

Audit for missing or generic `alt` text, incomplete form labels, non-semantic clickable elements, keyboard/focus issues, inconsistent language metadata, weak heading hierarchy, inaccessible modal/dropdown behavior, and disabled text selection/context menus. The site should also verify canonical URLs, page titles, descriptions, structured data where useful, sitemap freshness, and meaningful 404 behavior.

## 11. Recommended roadmap

### Immediate

1. Audit all browser-visible external endpoints and credentials; revoke exposed API tokens.
2. Review Firebase Security Rules and authorized domains for both Firebase projects.
3. Review Apps Script, Sheets, Drive, upload, and dashboard permissions.
4. Inventory third-party analytics and add appropriate consent/privacy controls.
5. Run broken-link, missing-asset, and case-sensitivity checks.
6. Add visible failure states for Firebase, Apps Script, video, and payment dependencies.

### Near term

1. Add a repeatable static-server development script and CI smoke test.
2. Add HTML, CSS, and JavaScript linting without rewriting the entire site.
3. Add a route/link checker and asset existence checker.
4. Create a dependency/version inventory for Bootstrap, jQuery, Firebase, player, font, and analytics assets.
5. Extract shared constants for Firebase, external endpoints, and route naming.
6. Improve form labels, keyboard navigation, focus states, alt text, headings, and metadata.

### Long term

1. Consolidate duplicated chapter, episode, and exam templates into data-driven generation.
2. Preserve existing public URLs while generating pages from structured content.
3. Move privileged operations and entitlement checks to trusted server-side code.
4. Modernize Firebase SDK and third-party dependency loading incrementally.
5. Replace browser-only exam authority with server-validated attempts where exam integrity matters.
6. Introduce a documented content publishing workflow and ownership model.
7. Consider a framework/build system only after route preservation and content migration are planned.

## 12. Representative file references

- `index.html` — root public landing page.
- `404.html` — not-found experience.
- `App/` — Q&A application and associated assets/scripts.
- `App/Assets/firebase.js` — App Firebase configuration.
- `App/Assets/js/script.js` — representative App interaction logic.
- `App/Assets/js/buysub.js` — subscription/purchase entry behavior.
- `BioDictionary/` — Biology dictionary/course/exam product.
- `BioDictionary/Assets/js/fbin.js` — representative Firebase/auth configuration.
- `BioDictionary/Assets/js/login.js` — login and access logic.
- `BioDictionary/Assets/js/exam.js` — representative exam behavior.
- `BioCast/` — Biology tutorial and exam surface.
- `Ambassador/` — ambassador campaign and multi-step form.
- `upload/` — upload and guide workflows.
- `payment/`, `shop/` — payment/commerce surfaces.
- `crm/`, `affiliation/`, `cms.html` — operational/admin-related areas.
- `CNAME`, `robots.txt`, `websitemapv1.xml` — deployment and crawl configuration.

## 13. Analysis limitations

This document analyzes the checked-out `master` branch through repository inventory, representative entry pages, authentication/configuration scripts, exam/search logic, forms, and integration references. Because the repository contains thousands of repeated or generated pages, every duplicate file is not listed individually; repeated patterns are documented by representative structures. External Firebase, Apps Script, Sheets, payment, and analytics behavior was inferred from client-side references and should be verified against the live service consoles and security rules.

## 14. Final assessment

Apar's Classroom has substantial educational value and a wide feature surface, but it is operationally closer to a static content platform plus several browser applications than to one unified software system. The safest modernization strategy is incremental: first secure and inventory integrations, then automate validation, then consolidate repeated content while preserving public URLs and existing student workflows.

The highest-priority principle is to treat frontend code as untrusted: authentication state, subscription status, exam scores, admin privileges, and upload/payment outcomes must be validated by trusted service rules or backend logic, not only by JavaScript running in the browser.

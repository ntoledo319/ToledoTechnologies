# Product audit — toledotechnologies.com — 2026-09-23

Branch `audit/product-audit-2026-09-23`, based on `origin/main` @ `6a46d0f`
(= live: `https://toledotechnologies.com/version.txt` returned that SHA on
2026-09-23). Nothing was pushed or deployed. No form was submitted to a live
endpoint, no checkout was opened, no payment link was followed, nothing on the
VPS was touched.

## Summary

**Inspected:** all 67 built routes (source + local production build), the
four lead forms and the handler they post to (read-only, in the Rupture repo),
the three purchase pages, the kit delivery path, the Stripe return pages, the
legal pages, the deploy workflow, dependencies, and the live site's headers,
third-party requests and cookies (GETs only). Reused the 2026-09-19 storefront
audit (`Product Command/_work/staged/storefront-audit-2026-09-19/`) rather than
re-deriving it; its main-site findings F1–F6, F8–F10, F13, F16, F17, F19 were
confirmed **merged and live**. Its still-open owner decisions are carried below.

**Changed (8 commits, plus this file):**

1. **Mobile navigation broke after one click.** The layouts use Astro's
   ClientRouter, which runs a module script once; the menu button's listener
   stayed on the first page's detached node. Reproduced (menu stays closed after
   a client-side navigation), fixed with delegated listeners, re-tested. The
   three free tools had the same defect and now re-bind on `astro:page-load`.
2. **DOM XSS in `/tools/robots-audit/`.** User-agent and sitemap lines from a
   third party's robots.txt went straight into `innerHTML`. Now escaped; a
   mocked hostile robots.txt (`<img onerror>`) renders as text. The page's
   privacy note claimed the fetch ran "from your browser" while the code first
   sends the address to `r.jina.ai`; the note now says so.
3. **Unreadable buttons and text.** `.novel-container a` out-ranked
   `.btn-primary`, so in-article buttons rendered accent-on-charcoal (2.47:1);
   the discovery form's submit label used an undefined token and rendered
   charcoal on charcoal (1.11:1); three other undefined `--gf-ink-*` tokens
   silently erased table rules and panels on care/discovery/partner; the footer
   legal row on every page was 3.24:1; low-opacity metadata failed across blog,
   field notes, contact, nonprofit, 404 and the performance page. axe
   colour-contrast failures went from 71 pages to 0.
4. **Reflow and keyboard.** `/audit/toledo-technologies/` overflowed a 375px
   screen by 428px and the robots tool by 39px; both fixed. Horizontally
   scrolling command/code blocks are now focusable regions.
5. **Storefront.** The two card-purchase pages now state USD, tax treatment and
   link the terms and refund summary directly under the buy button. The
   withdrawn US$450 product's Stripe return page (`/order/reconciliation/`)
   still told a payer to email an `.xlsx`; it now opens with the withdrawal and
   the refund-before-delivery term that page already published. The withdrawn
   product no longer publishes FAQPage markup describing it as live.
6. **Privacy notice.** Every page loads Google Fonts; `/privacy` disclosed
   Cloudflare but not Google. Disclosed; date bumped.
7. **Dependencies.** Non-breaking `npm audit fix`: 14 advisories → 6
   (astro 5.16.9 → 5.18.2, vite 6.4.3, postcss, rollup, h3, svgo…).
8. **Regression tests** (`src/test/audit-2026-09-23.test.ts`, 7 tests) guard
   each fix, including one that fails if any `var(--gf-*)` is used but never
   defined.

**Round 2 (2026-09-24, 6 more commits):** Astro 5.18.2 → 7.2.8 clears the
last 6 advisories (#24); every page now carries a meta Content Security
Policy (#23); CI actions are pinned to commit SHAs (#35). The upgrade was
checked page by page against a build of `origin/main`, and one CSS
regression it introduced was fixed. Details in "Round 2 fixes" below.

## Applicability and findings register

Basis: **L** = legal requirement (verified source), **P** = platform/contract,
**E** = engineering safeguard. Severity is for the gap found, "—" when none.

| #   | Check                                                     | Trigger / evidence                                                                                                                                                                 | Class                     | Basis                                       | Sev    | Status                   | Action / verification                                                                                                                                                                                                                    |
| --- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------- | ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Mobile nav after in-site navigation                       | ClientRouter on all three layouts; `Header.astro` bound listeners once                                                                                                             | APPLIES                   | E (WCAG 2.1.1)                              | High   | FIXED                    | Delegated listeners; Playwright 375px: menu opens on the second page                                                                                                                                                                     |
| 2   | In-article button contrast                                | `.btn-primary` inside `.novel-container` = 2.47:1 (case-study notices, blog CTA, tool CTAs)                                                                                        | APPLIES                   | E (WCAG 1.4.3) / L (ADA Title III guidance) | High   | FIXED                    | axe 0; screenshot                                                                                                                                                                                                                        |
| 3   | Discovery form submit label                               | `color: var(--gf-paper)` undefined → 1.11:1 on the primary lead form's only button                                                                                                 | APPLIES                   | E (WCAG 1.4.3)                              | High   | FIXED                    | Screenshot legible; token test                                                                                                                                                                                                           |
| 4   | Site-wide text contrast                                   | axe: colour-contrast on 71 of 72 route runs (footer legal row 3.24:1, contact email link 1.49:1, metadata at 20–55% opacity)                                                       | APPLIES                   | E / L                                       | Medium | FIXED                    | axe WCAG 2.2 A/AA: 0 violations on 72 runs at 1280px and 375px                                                                                                                                                                           |
| 5   | Reflow at 375px, scrollable regions                       | Audit page +428px, robots tool +39px; `.kit-command` not keyboard-scrollable                                                                                                       | APPLIES                   | E (WCAG 1.4.10, 2.1.1)                      | Medium | FIXED                    | overflow=0 on every route; axe `scrollable-region-focusable` 0                                                                                                                                                                           |
| 6   | Homepage gatefold: no-JS, modal, headings, reduced motion | Prior F8–F10                                                                                                                                                                       | APPLIES                   | E                                           | —      | OK                       | Verified merged (`noscript`, `inert`, single h1); axe 0 with cover closed and opened; reduced-motion run 0                                                                                                                               |
| 7   | Third-party content → `innerHTML`                         | `/tools/robots-audit/` renders a stranger's robots.txt                                                                                                                             | APPLIES                   | E (OWASP DOM XSS)                           | Medium | FIXED                    | Mocked hostile file: no execution, 0 injected nodes. Page is 404 in production today (#22) but ships the moment the route is fixed                                                                                                       |
| 8   | Tool privacy notices                                      | robots tool sends the URL to `r.jina.ai`; note said "from your browser"                                                                                                            | APPLIES                   | E / truthfulness                            | Low    | FIXED                    | Note names the third party                                                                                                                                                                                                               |
| 9   | Privacy notice vs actual network traffic                  | Live capture 2026-09-23: only `static.cloudflareinsights.com`, `cloudflareinsights.com`, `fonts.googleapis.com`, `fonts.gstatic.com`; no cookies, no local/session storage on load | APPLIES                   | E (accuracy)                                | Medium | FIXED                    | Cloudflare already disclosed (prior NEW-2 merged); Google Fonts now disclosed                                                                                                                                                            |
| 10  | Cookie / consent banner                                   | No cookies, no ads, no replay, no cross-site tracking observed                                                                                                                     | NOT APPLICABLE            | —                                           | —      | OK                       | Not added (prompt §1.E)                                                                                                                                                                                                                  |
| 11  | Contact-form data flow                                    | 4 forms POST to `eolkits.com/api/v1/lead`: honeypot, per-IP/day/global rate limits, body limit, escaped notification email (`Rupture/.../app.py:780-990`, read-only)               | APPLIES                   | E                                           | —      | OK                       | Notice on the form matches the handler. Not submitted (live endpoint)                                                                                                                                                                    |
| 12  | Lead retention                                            | Handler never purges leads; `/privacy` states no retention for inquiries                                                                                                           | APPLIES                   | E (privacy notice accuracy)                 | Medium | OPEN                     | **OWNER DECISION:** a retention period to publish and enforce. Not invented                                                                                                                                                              |
| 13  | Access / deletion requests                                | `/privacy` offers access/correction/deletion by email to `hello@`; deletion is manual in the lead DB; no evidence anyone reads `hello@`                                            | APPLIES                   | E                                           | Medium | BLOCKED                  | Depends on OD-06 (which mailbox is monitored)                                                                                                                                                                                            |
| 14  | CT Data Privacy Act                                       | CT business. Applies at ≥35,000 consumers/yr (excl. payment-only data), or any sensitive data, or any sale. No sale, no sensitive data found                                       | UNKNOWN                   | L                                           | Low    | OPEN                     | Missing fact: prior-year count of consumers whose data was processed (Cloudflare Analytics / lead DB). If ever in scope, universal opt-out signals (GPC) must be honoured                                                                |
| 15  | Other state laws (CCPA etc.), GDPR                        | US$0 lifetime revenue, no sale/share; EU targeting not evident beyond worldwide availability and B2B offers                                                                        | UNKNOWN                   | L                                           | Low    | OPEN                     | Owner to confirm whether EU consumers are intended buyers; if yes, EU digital-content withdrawal rules need review                                                                                                                       |
| 16  | Price, currency, tax before commitment                    | `/terms` promises the product page states them; file-conversion and GTFS pages lacked tax wording and terms links at the button                                                    | APPLIES                   | L (FTC Act §5 deception) / E                | Medium | FIXED                    | One line under the first buy button; kit and engagements already had it                                                                                                                                                                  |
| 17  | CT sales tax on what is sold                              | CT taxes computer/data-processing services and business-use electronic canned software at 1%, most digital goods at 6.35%                                                          | UNKNOWN                   | L                                           | Medium | OPEN                     | **OWNER DECISION:** whether Toledo is registered and whether Stripe collects tax on these links. Pages say prices exclude tax, which is true either way                                                                                  |
| 18  | Refund terms                                              | Published per product, consistent between product pages and `/policies`; no window invented                                                                                        | APPLIES                   | L / P                                       | —      | OK                       | Refund _contact_ differs: `/policies` says `hello@`, kit/licence/buy pages say `dev@` → OD-06                                                                                                                                            |
| 19  | Withdrawn US$450 SKU                                      | Page withdrawn; Stripe return page still asked for `.xlsx`                                                                                                                         | APPLIES                   | L (deception)                               | Medium | FIXED (page) / OK (link) | Payment Link `14A9AT07I7le8Jt2sI87K0f` rendered in Chromium on 2026-09-25: "The link is no longer active." (OD-01 closed)                                                                                                                |
| 20  | Fulfilment of paid items                                  | Kit: ciphertext 200 live, SHA published, key shown on Stripe confirmation; conversion/GTFS/triage: delivered by email from `dev@`                                                  | UNKNOWN                   | E                                           | Medium | BLOCKED                  | Needs one owner test purchase or Stripe dashboard read; mailbox staffing is OD-06 (prior F14)                                                                                                                                            |
| 21  | Dark patterns                                             | No timers, scarcity, pre-ticked extras, fake reviews; kit page states "no buyers, no reviews"                                                                                      | APPLIES                   | L (FTC)                                     | —      | OK                       | grep + manual read of all purchase pages                                                                                                                                                                                                 |
| 22  | `/tools/*` in production                                  | `/tools/bootcamp-roi/`, `/robots-audit/`, `/speed-test/` return 404 live; VPS route shadows the prefix; sitemap lists them                                                         | APPLIES                   | E                                           | Medium | FIXED                    | Caddy route fixed and reloaded on the VPS with owner approval 2026-09-25 (backup /etc/caddy/Caddyfile.bak-20260925-070926); /tools/speed-test/, /robots-audit/, /bootcamp-roi/ return 200 live                                           |
| 23  | Security headers / CSP                                    | Caddy sends HSTS (preload), nosniff, XFO SAMEORIGIN, Referrer-Policy, Permissions-Policy; no CSP; `public/_headers` is ignored by Caddy                                            | APPLIES                   | E                                           | Low    | FIXED                    | One meta CSP per page from Astro `security.csp`, hoisted above every stylesheet and script; no `'unsafe-inline'`/`'unsafe-eval'` for scripts. 0 violations on all 67 Astro pages and through swaps, tools, 4 mocked form posts (Round 2) |
| 24  | Dependency advisories                                     | 14 → 6 after non-breaking fix. Remaining: astro ≤7.2.7 (critical AVIF RCE GHSA-26w7-cxv4-gfx2 is patched only in ≥7.2.8; no patched 5.x or 6.x exists) and sharp                   | APPLIES                   | E                                           | Medium | FIXED                    | Astro 7.2.8, sharp 0.35.4: `npm audit` 6 → 0. Same 68 HTML files, all 68 pages pixel-identical to `origin/main` at 1280 and 375 px (Round 2)                                                                                             |
| 25  | Secrets in repo                                           | Analytics token is public by design; kit key absent; no `.env` tracked                                                                                                             | APPLIES                   | E                                           | —      | OK                       | grep                                                                                                                                                                                                                                     |
| 26  | Card data                                                 | Stripe-hosted Payment Links; no card fields on site                                                                                                                                | NOT APPLICABLE            | P                                           | —      | OK                       | —                                                                                                                                                                                                                                        |
| 27  | Subscriptions / renewals                                  | Nothing recurring is sold on this domain (Tessera's monthly plan is on `qi.` via Polar)                                                                                            | NOT APPLICABLE            | —                                           | —      | —                        | —                                                                                                                                                                                                                                        |
| 28  | Accounts, auth, tenants, uploads, UGC, DMCA, moderation   | Static site, no accounts, no uploads, no public posting                                                                                                                            | NOT APPLICABLE            | —                                           | —      | —                        | —                                                                                                                                                                                                                                        |
| 29  | Marketing email / SMS                                     | No list or signup; form notice says it is not used for a newsletter                                                                                                                | NOT APPLICABLE            | —                                           | —      | —                        | —                                                                                                                                                                                                                                        |
| 30  | Children / age                                            | B2B software services; `/privacy` states not directed at under-13s                                                                                                                 | NOT APPLICABLE            | —                                           | —      | —                        | —                                                                                                                                                                                                                                        |
| 31  | AI features / AI disclosure                               | No model calls on the site. AI-operated delivery disclosed on buy pages and homepage (prior F1 merged). "AI-powered" not used                                                      | APPLIES (disclosure only) | E                                           | —      | OK                       | grep                                                                                                                                                                                                                                     |
| 32  | Endorsements                                              | Nonprofit track trades a discount for a testimonial; none published                                                                                                                | APPLIES (future)          | L (FTC Endorsement Guides)                  | Low    | OK                       | When one is published it must disclose the discount                                                                                                                                                                                      |
| 33  | Structured data truthfulness                              | Withdrawn product published FAQPage answers describing it as live                                                                                                                  | APPLIES                   | E                                           | Low    | FIXED                    | JSON-LD now Offer `Discontinued` only                                                                                                                                                                                                    |
| 34  | Governing law / seller identity                           | `/terms` names Connecticut LLC, Fairfield County venue                                                                                                                             | APPLIES                   | L                                           | Low    | OK                       | CT business registry (data.ct.gov, account 3356038, checked 2026-09-25): Toledo Technologies LLC, Active, Domestic, formation place Connecticut, registered 2026-01-13 — matches `/terms` (NEW-3 closed)                                 |
| 35  | Deploy safety / rollback, CI supply chain                 | Atomic symlink release, 5 retained, version gate, revenue-page guard. Actions referenced by movable tags; `ci.yml` had no `permissions`                                            | APPLIES                   | E                                           | Low    | FIXED                    | Actions pinned to the commit their tag points at (tag kept as comment); `ci.yml` read-only token; guard untouched and passes on the new build                                                                                            |
| 36  | Licences: fonts, images                                   | JetBrains Mono self-hosted (OFL); Outfit/Lora via Google Fonts (OFL); hero masters in `assets/heroes/`                                                                             | UNKNOWN                   | L                                           | Low    | OPEN                     | Provenance of the hero photographs is not recorded in the repo                                                                                                                                                                           |

## Round 2 fixes (2026-09-24)

Commits: `f1f2106` upgrade, `8300550` CSP, `e40df92` CI pins, `6e78b38` CSS
minifier fix, `a193259` docs, plus this file. Evidence for each is in
"Tests run".

1. **Astro 5.18.2 → 7.2.8 (#24).** The critical AVIF RCE
   (GHSA-26w7-cxv4-gfx2) is patched only in 7.2.8. The newest 5.x (5.18.2,
   what was installed) and the newest 6.x (6.4.8) are both affected, so 7.2.8
   is the smallest upgrade that clears the list. It brings Vite 8, sharp
   0.35.4, vitest 4.1.11, Tailwind 4.2.2. Migrations: content collections
   moved to `src/content.config.ts` with `glob()` loaders (entry ids equal the
   old slugs; every URL unchanged); `compressHTML: true`, because Astro 7's
   new default drops the space between adjacent inline elements; two
   paper-grain overlays removed from BaseLayout/InsertLayout. They never
   rendered (their `\'` escapes made the CSS invalid under Astro 5), and
   Astro 7 would have switched them on for the first time.
   - **Regression found and fixed:** Vite 8 minifies CSS with Lightning CSS,
     which dropped `backdrop-filter` from the sleeve's Unfold button (Chrome
     and Firefox lost the blur: 11,593 pixels, up to 9/255, on the home page
     at 1280px) and `-webkit-backdrop-filter` from the sticky header's blur
     (Safari before 18). `build.cssMinify: 'esbuild'`, which Vite 6 used,
     restores both; the comparison is then pixel-identical.
   - **Accepted, not visible in any tested browser:** Astro 7's compiler
     writes the one scoped media query (speed-test input row) as
     `(width<=640px)`. Safari before 16.4 ignores that syntax, so there the
     URL field and button stay side by side below 640px. Otherwise the shipped
     CSS matches up to whitespace and colour notation. The JS syntax level
     did not change (ES2020 everywhere, ES2022 for the router in both
     builds).
2. **Meta Content Security Policy (#23).** Built by Astro's `security.csp`
   and moved by `scripts/csp.mjs` to sit directly after `<meta charset>`:
   `default-src 'self'; base-uri 'self'; object-src 'none'; form-action
'self' https://eolkits.com; img-src 'self' data:; font-src 'self'
https://fonts.gstatic.com; connect-src 'self'
https://cloudflareinsights.com; script-src 'self'
https://static.cloudflareinsights.com` plus Astro's sha256 hashes;
   `style-src 'self' https://fonts.googleapis.com`; `style-src-attr
'unsafe-inline'` for `style=""` attributes only. Taken from the code and
   Chromium's network log. No `frame-ancestors`/`report-*`/`sandbox`
   (ignored in `<meta>`; Caddy's X-Frame-Options already blocks framing).
   - **ClientRouter:** scripts and stylesheets never ship inline, so all 66
     other pages share one policy and a swap never meets code the first
     page's policy does not cover. `/tools/robots-audit/` adds `connect-src
https://r.jina.ai https:` (its proxy and the direct fallback to the site
     the visitor typed). A `<meta>` policy can be added to but never
     replaced, so `PolicyNavigationGuard` turns any swap to or from a page
     with a different policy into a full load. `/tools/speed-test/` needs
     nothing extra: it makes no request of its own and opens PageSpeed
     Insights with `window.open`, a navigation that CSP does not govern.
   - **Drift checks:** the build re-reads every shipped page and fails on a
     missing hash, an unlisted script or stylesheet host, a form target
     outside `form-action`, a second policy or a weakened directive.
     `src/test/csp.test.ts` (14 tests) recomputes every hash from `dist/`
     and fails if any page other than the robots tool has a different
     policy.
   - **Oracle result.** `_verify/csp-check.mjs` passes all 68 pages. An
     earlier version of that check wrongly failed the proof's own output,
     `proofs/purchasing/archive.html` (it required an explicit `object-src`
     and a site-wide form target on every page). That file ships byte for
     byte because its SHA-256 is published in `manifest.json`,
     `verification.json` and the proof ZIP; its own policy
     (`default-src 'none'` … `form-action 'none'`) is stricter than required.
     The check was corrected on 2026-09-25 to apply the CSP3
     `default-src` fallback and to judge each page by its own forms and
     scripts. No owner decision is needed.
3. **CI (#35).** `actions/checkout` and `actions/setup-node` (v4 in
   `ci.yml`, v6 in `deploy.yml`) are pinned to the commit each tag points at
   today (`gh api …/git/ref/tags/<tag>`, all lightweight tags → commits),
   tag kept as a trailing comment. `ci.yml` gets `permissions: contents:
read`; `deploy.yml` already had it. No runner, trigger, secret, step or
   deploy logic changed; the revenue-page guard is untouched. Actions is
   billing-locked, so this was checked by parsing and by
   `_verify/workflow-check.mjs`, not by a run.

4. **Follow-ups from verification (2026-09-25).**
   - **CI format gate.** `ci.yml` runs `npm run format -- --check`, which
     failed on 25 files before this audit. 22 are now formatted. Every
     changed page was rebuilt and compared with the previous build in
     Chromium at 1280px and 375px: rendered text is identical on all of
     them, and screenshots are identical except the home page, which
     differs between two builds of the same commit (animation).
     Formatting the three kit pages changed a `<pre>` command example that
     buyers see, so those three are listed in `.prettierignore` with that
     reason and were left as they were. `npx prettier --check .` passes.
   - **Stable ordering.** Two case studies share `publishedDate`
     2026-05-21, so their order depended on collection load order. The
     case-study, portfolio and blog lists now break ties by id, which keeps
     the order that clean builds and the live site already show.

## Tests run

| Command / check                                                                                              | Result                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`                                                                                              | pass, 67 pages                                                                                                                                                                                                                     |
| `npm test` (vitest)                                                                                          | pass, 40 tests (33 existing + 7 new)                                                                                                                                                                                               |
| `npm run lint`                                                                                               | pass                                                                                                                                                                                                                               |
| `npm run typecheck` (`astro check`)                                                                          | pass, 0 errors (after typing `NovelContent` for Astro 5.18)                                                                                                                                                                        |
| `npx prettier --check` on touched files                                                                      | clean for every file that was clean at baseline                                                                                                                                                                                    |
| axe-core 4 (WCAG 2.0/2.1/2.2 A+AA tags), Playwright + Chrome, all 66 sitemap URLs + 6 noindex routes, 1280px | before: 71 route runs with colour-contrast, 2 link-in-text-block, 2 scrollable-region; after: **0**                                                                                                                                |
| same at 375px, with horizontal-overflow measurement                                                          | after: 0 violations, 0 overflow on every route                                                                                                                                                                                     |
| homepage with the sleeve opened, 1280 and 375                                                                | 0                                                                                                                                                                                                                                  |
| reduced-motion emulation (`/`, `/kit/`, `/contact/`)                                                         | 0                                                                                                                                                                                                                                  |
| Keyboard: Tab order on `/buy/file-conversion/`, `/contact/`, `/`                                             | skip link first, logical order, visible focus on every stop                                                                                                                                                                        |
| Mobile menu across a ClientRouter navigation (375px)                                                         | before: dead on page 2; after: opens, Escape closes and returns focus                                                                                                                                                              |
| Hostile robots.txt via mocked `r.jina.ai`                                                                    | no script execution, no injected elements                                                                                                                                                                                          |
| Live GETs: headers, route status, third-party hosts, cookies                                                 | recorded in #9, #22, #23                                                                                                                                                                                                           |
| `npm audit`                                                                                                  | 14 → 6 advisories                                                                                                                                                                                                                  |
| **Round 2 (2026-09-24)**                                                                                     |                                                                                                                                                                                                                                    |
| `npm audit` after Astro 7.2.8                                                                                | 6 → **0**; clean `npm ci` from the lockfile: 592 packages, 0 vulnerabilities                                                                                                                                                       |
| `npm run build` / `npm test` / `npm run lint` / `npm run typecheck`                                          | pass: 67 pages; 54 tests (40 + 14 CSP); lint clean; `astro check` 0 errors. Build also passes on Node 24.18; Node 20 is refused by Astro 7                                                                                         |
| Built files vs a build of `origin/main` (temporary worktree at `f6627d5`)                                    | same 68 HTML paths; all 44 other files outside `_astro/` byte-identical (`catalog.json`, `llms.txt`, `robots.txt`, sitemaps)                                                                                                       |
| Revenue-page guard loop from `deploy.yml`, run on the new `dist/`                                            | all 9 pages + `catalog.json` + `llms.txt` present                                                                                                                                                                                  |
| Full-page screenshots, Chromium, `origin/main` vs branch                                                     | home, kit, buy/file-conversion, buy/gtfs-feed-check, order/complete, privacy, tools/robots-audit and no-JS home at 1280 + 375: **0 differing pixels**. All 68 HTML pages at both widths: 0 differing pixels, identical `innerText` |
| Interaction states, both builds                                                                              | sleeve opened (1280, 375, 375 reduced motion), mobile menu open, keyboard focus ring on `/kit/`, hover on the Stripe button, robots result table: identical pixels                                                                 |
| Head and link content per page                                                                               | title, meta, canonical, JSON-LD, every link, form action and image `src`: identical on 68 pages                                                                                                                                    |
| ClientRouter + mobile menu, 375px, normal and reduced motion                                                 | menu opens by click and Enter, Escape closes and returns focus: on first load, after 4 swaps and after a back-button swap. 72 checks, 3 consecutive runs green                                                                     |
| CSP at runtime (`securitypolicyviolation` listener)                                                          | 0 on load of all 67 pages; 0 across a 15-page desktop swap chain, the three tools (robots proxied + direct fallback, speed test, ROI) and 4 lead forms reached by swap and posted to a mocked `eolkits.com` that 303s back         |
| `_verify/csp-check.mjs`                                                                                      | all 68 pages pass (after the 2026-09-25 correction to the check; see Round 2, item 2)                                                                                                                                              |
| `_verify/workflow-check.mjs`                                                                                 | WORKFLOW CHECK PASSED (2 workflows, 4 pinned actions)                                                                                                                                                                              |

**Untested boundaries:** no real or test payment (no Stripe access; Payment
Link state and the kit key reveal unverified); no live form submission; no
screen-reader pass (automated checks are not conformance); the lead handler
and VPS config were read, not exercised; mail delivery to `hello@`/`dev@`
unverified.

## Release-blocking issues

None of the committed changes needs anything to ship; they are ready to merge
(a push to `main` deploys, so the push itself needs the owner's yes). These
remain blocked on the owner and are not fixable in code:

1. **OD-06 — which mailbox is monitored.** Refunds, privacy requests and
   delivery all route to `hello@` or `dev@`. Evidence 2026-09-25: Resend's log
   shows lead alerts to the `@toledotechnologies.com` recipient **bounced** on
   2026-09-17, 09-20 and 09-24 (delivered on other days), and Gmail shows no
   mail forwarded from `hello@`. Needed: a working mailbox, one reader, one
   cadence.
2. ~~OD-01 — Payment Link state~~ closed 2026-09-25: the link renders "The link is no longer active."
3. **Lead retention period** (#12) — a number to publish on `/privacy` and a
   purge to match.
4. **CT sales tax** (#17) — registration status and whether Stripe collects.
5. ~~VPS `/tools/` route~~ fixed and live 2026-09-25 (owner-approved Caddy reload).
6. ~~NEW-3 — state of formation~~ closed 2026-09-25: Connecticut (CT registry account 3356038).

Merging round 2 also changes the deploy pipeline itself: `deploy.yml` now
pulls `actions/checkout` and `actions/setup-node` by commit SHA, and CI runs
on Node 22. Same versions, same steps; it still needs the owner's yes like
any push to `main`.

## Sources

All checked 2026-09-23.

- Connecticut AG, CT Data Privacy Act applicability (35,000 consumers, sensitive data, sale; GPC since 2025-01-01): https://portal.ct.gov/ag/sections/privacy/the-connecticut-data-privacy-act
- SB 1295 threshold change effective 2026-07-01 (secondary, law-firm summary; statute text not fetched): https://www.hunton.com/privacy-and-cybersecurity-law-blog/connecticut-amends-the-connecticut-data-privacy-act
- Connecticut DRS, sales and use tax rates (1% computer/data processing, 1% business-use electronic canned software, 6.35% general): https://portal.ct.gov/drs/sales-tax/tax-information
- US DOJ, web accessibility guidance under the ADA (no mandated standard; WCAG named as helpful): https://www.ada.gov/resources/web-guidance/
- W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
- FTC, Endorsement Guides FAQ (material connections must be disclosed): https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking
- OWASP DOM-based XSS Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
- Astro docs, view transitions (module scripts run once; use `astro:page-load`): https://docs.astro.build/en/guides/view-transitions/
- Cloudflare Web Analytics metrics: https://developers.cloudflare.com/web-analytics/data-metrics/

Round 2, checked 2026-09-24:

- GitHub advisory GHSA-26w7-cxv4-gfx2, Astro AVIF-optimisation RCE (affected < 7.2.8, patched 7.2.8): https://github.com/advisories/GHSA-26w7-cxv4-gfx2
- Astro configuration reference, `security.csp` (directives, script/style resources, `Astro.csp`): https://docs.astro.build/en/reference/configuration-reference/#securitycsp
- W3C Content Security Policy Level 3 (directive fallback: `object-src` → `default-src`; `frame-ancestors`, `report-uri`, `sandbox` not honoured in `<meta>`): https://www.w3.org/TR/CSP3/
- WHATWG HTML, `http-equiv="content-security-policy"` pragma: https://html.spec.whatwg.org/multipage/semantics.html
- Vite build options, `build.cssMinify` / `build.cssTarget`: https://vite.dev/config/build-options#build-cssminify
- GitHub Docs, secure use of Actions (pin actions to a full-length commit SHA): https://docs.github.com/en/actions/reference/security/secure-use

## Migration, configuration, and rollback

- **Round 1: no migration.** `package-lock.json` changed (non-breaking
  updates within existing ranges); CI's `npm ci` picks it up.
- **Round 2: Node 22.12+ is required** (Astro 7). `deploy.yml` already used
  22; `ci.yml` moved from 20 to 22. No new environment variables or secrets.
- **Round 2 config:** `astro.config.mjs` gains `security.csp`,
  `compressHTML: true`, `build.inlineStylesheets: 'never'`,
  `vite.build.assetsInlineLimit`, `vite.build.cssMinify: 'esbuild'` and the
  `cspMetaFirst()` integration; `esbuild` is a devDependency. Content
  collections moved to `src/content.config.ts`. Any new third-party script,
  stylesheet, font, image host, fetch target or form endpoint must be added
  to the policy (README, "Content Security Policy").
- **Round 2 workflows:** action references are SHA-pinned (tag in a
  comment); `ci.yml` has `permissions: contents: read`. To move an action to
  a newer tag, replace the SHA with the one `gh api
repos/<owner>/<repo>/git/ref/tags/<tag>` returns.
- **Deploy:** merging to `main` deploys through the existing workflow and its
  revenue-page guard. The pages it guards all still build.
- **Rollback:** revert the audit commits (`git revert <sha>` for any one; they
  are independent except that `test:` expects the fixes), or repoint the VPS
  `current` symlink to the previous release as documented in the README.
  The dependency bump can be reverted alone by restoring the previous
  `package-lock.json`. Round 2, newest first: the CI pins (`e40df92`) revert
  on their own; the CSP (`8300550`) reverts on its own and leaves Astro 7;
  the upgrade needs `6e78b38` and `f1f2106` reverted after the CSP commit
  (the policy uses Astro 7's `security.csp`), then `npm ci`.
- **Visual change to expect:** muted metadata is darker (≈75% ink instead of
  20–55%), the accent orange is 2% darker in lightness, care/discovery/partner
  panels now show the borders and tint they always referenced. Round 2
  changes nothing visible (pixel-identical to `origin/main`).

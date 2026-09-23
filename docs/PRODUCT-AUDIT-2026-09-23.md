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

## Applicability and findings register

Basis: **L** = legal requirement (verified source), **P** = platform/contract,
**E** = engineering safeguard. Severity is for the gap found, "—" when none.

| #   | Check                                                     | Trigger / evidence                                                                                                                                                                 | Class                     | Basis                                       | Sev    | Status                        | Action / verification                                                                                                                                                     |
| --- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Mobile nav after in-site navigation                       | ClientRouter on all three layouts; `Header.astro` bound listeners once                                                                                                             | APPLIES                   | E (WCAG 2.1.1)                              | High   | FIXED                         | Delegated listeners; Playwright 375px: menu opens on the second page                                                                                                      |
| 2   | In-article button contrast                                | `.btn-primary` inside `.novel-container` = 2.47:1 (case-study notices, blog CTA, tool CTAs)                                                                                        | APPLIES                   | E (WCAG 1.4.3) / L (ADA Title III guidance) | High   | FIXED                         | axe 0; screenshot                                                                                                                                                         |
| 3   | Discovery form submit label                               | `color: var(--gf-paper)` undefined → 1.11:1 on the primary lead form's only button                                                                                                 | APPLIES                   | E (WCAG 1.4.3)                              | High   | FIXED                         | Screenshot legible; token test                                                                                                                                            |
| 4   | Site-wide text contrast                                   | axe: colour-contrast on 71 of 72 route runs (footer legal row 3.24:1, contact email link 1.49:1, metadata at 20–55% opacity)                                                       | APPLIES                   | E / L                                       | Medium | FIXED                         | axe WCAG 2.2 A/AA: 0 violations on 72 runs at 1280px and 375px                                                                                                            |
| 5   | Reflow at 375px, scrollable regions                       | Audit page +428px, robots tool +39px; `.kit-command` not keyboard-scrollable                                                                                                       | APPLIES                   | E (WCAG 1.4.10, 2.1.1)                      | Medium | FIXED                         | overflow=0 on every route; axe `scrollable-region-focusable` 0                                                                                                            |
| 6   | Homepage gatefold: no-JS, modal, headings, reduced motion | Prior F8–F10                                                                                                                                                                       | APPLIES                   | E                                           | —      | OK                            | Verified merged (`noscript`, `inert`, single h1); axe 0 with cover closed and opened; reduced-motion run 0                                                                |
| 7   | Third-party content → `innerHTML`                         | `/tools/robots-audit/` renders a stranger's robots.txt                                                                                                                             | APPLIES                   | E (OWASP DOM XSS)                           | Medium | FIXED                         | Mocked hostile file: no execution, 0 injected nodes. Page is 404 in production today (#22) but ships the moment the route is fixed                                        |
| 8   | Tool privacy notices                                      | robots tool sends the URL to `r.jina.ai`; note said "from your browser"                                                                                                            | APPLIES                   | E / truthfulness                            | Low    | FIXED                         | Note names the third party                                                                                                                                                |
| 9   | Privacy notice vs actual network traffic                  | Live capture 2026-09-23: only `static.cloudflareinsights.com`, `cloudflareinsights.com`, `fonts.googleapis.com`, `fonts.gstatic.com`; no cookies, no local/session storage on load | APPLIES                   | E (accuracy)                                | Medium | FIXED                         | Cloudflare already disclosed (prior NEW-2 merged); Google Fonts now disclosed                                                                                             |
| 10  | Cookie / consent banner                                   | No cookies, no ads, no replay, no cross-site tracking observed                                                                                                                     | NOT APPLICABLE            | —                                           | —      | OK                            | Not added (prompt §1.E)                                                                                                                                                   |
| 11  | Contact-form data flow                                    | 4 forms POST to `eolkits.com/api/v1/lead`: honeypot, per-IP/day/global rate limits, body limit, escaped notification email (`Rupture/.../app.py:780-990`, read-only)               | APPLIES                   | E                                           | —      | OK                            | Notice on the form matches the handler. Not submitted (live endpoint)                                                                                                     |
| 12  | Lead retention                                            | Handler never purges leads; `/privacy` states no retention for inquiries                                                                                                           | APPLIES                   | E (privacy notice accuracy)                 | Medium | OPEN                          | **OWNER DECISION:** a retention period to publish and enforce. Not invented                                                                                               |
| 13  | Access / deletion requests                                | `/privacy` offers access/correction/deletion by email to `hello@`; deletion is manual in the lead DB; no evidence anyone reads `hello@`                                            | APPLIES                   | E                                           | Medium | BLOCKED                       | Depends on OD-06 (which mailbox is monitored)                                                                                                                             |
| 14  | CT Data Privacy Act                                       | CT business. Applies at ≥35,000 consumers/yr (excl. payment-only data), or any sensitive data, or any sale. No sale, no sensitive data found                                       | UNKNOWN                   | L                                           | Low    | OPEN                          | Missing fact: prior-year count of consumers whose data was processed (Cloudflare Analytics / lead DB). If ever in scope, universal opt-out signals (GPC) must be honoured |
| 15  | Other state laws (CCPA etc.), GDPR                        | US$0 lifetime revenue, no sale/share; EU targeting not evident beyond worldwide availability and B2B offers                                                                        | UNKNOWN                   | L                                           | Low    | OPEN                          | Owner to confirm whether EU consumers are intended buyers; if yes, EU digital-content withdrawal rules need review                                                        |
| 16  | Price, currency, tax before commitment                    | `/terms` promises the product page states them; file-conversion and GTFS pages lacked tax wording and terms links at the button                                                    | APPLIES                   | L (FTC Act §5 deception) / E                | Medium | FIXED                         | One line under the first buy button; kit and engagements already had it                                                                                                   |
| 17  | CT sales tax on what is sold                              | CT taxes computer/data-processing services and business-use electronic canned software at 1%, most digital goods at 6.35%                                                          | UNKNOWN                   | L                                           | Medium | OPEN                          | **OWNER DECISION:** whether Toledo is registered and whether Stripe collects tax on these links. Pages say prices exclude tax, which is true either way                   |
| 18  | Refund terms                                              | Published per product, consistent between product pages and `/policies`; no window invented                                                                                        | APPLIES                   | L / P                                       | —      | OK                            | Refund _contact_ differs: `/policies` says `hello@`, kit/licence/buy pages say `dev@` → OD-06                                                                             |
| 19  | Withdrawn US$450 SKU                                      | Page withdrawn; Stripe return page still asked for `.xlsx`                                                                                                                         | APPLIES                   | L (deception)                               | Medium | FIXED (page) / BLOCKED (link) | Whether Payment Link `14A9AT07I7le8Jt2sI87K0f` is Inactive cannot be seen from outside (OD-01)                                                                            |
| 20  | Fulfilment of paid items                                  | Kit: ciphertext 200 live, SHA published, key shown on Stripe confirmation; conversion/GTFS/triage: delivered by email from `dev@`                                                  | UNKNOWN                   | E                                           | Medium | BLOCKED                       | Needs one owner test purchase or Stripe dashboard read; mailbox staffing is OD-06 (prior F14)                                                                             |
| 21  | Dark patterns                                             | No timers, scarcity, pre-ticked extras, fake reviews; kit page states "no buyers, no reviews"                                                                                      | APPLIES                   | L (FTC)                                     | —      | OK                            | grep + manual read of all purchase pages                                                                                                                                  |
| 22  | `/tools/*` in production                                  | `/tools/bootcamp-roi/`, `/robots-audit/`, `/speed-test/` return 404 live; VPS route shadows the prefix; sitemap lists them                                                         | APPLIES                   | E                                           | Medium | BLOCKED                       | Caddy route change = reload on the VPS (prior F7). Owner OK required                                                                                                      |
| 23  | Security headers                                          | Caddy sends HSTS (preload), nosniff, XFO SAMEORIGIN, Referrer-Policy, Permissions-Policy; no CSP; `public/_headers` is ignored by Caddy                                            | APPLIES                   | E                                           | Low    | OPEN                          | CSP would be a Caddy change on the VPS; not attempted                                                                                                                     |
| 24  | Dependency advisories                                     | 14 → 6 after non-breaking fix. Remaining: astro ≤7.2.7 (define:vars / spread-props XSS, server-island replay) and sharp                                                            | APPLIES                   | E                                           | Medium | OPEN                          | Needs Astro 7 (breaking). Site uses no `define:vars`, no server islands, no untrusted image input, so exposure is build-time only                                         |
| 25  | Secrets in repo                                           | Analytics token is public by design; kit key absent; no `.env` tracked                                                                                                             | APPLIES                   | E                                           | —      | OK                            | grep                                                                                                                                                                      |
| 26  | Card data                                                 | Stripe-hosted Payment Links; no card fields on site                                                                                                                                | NOT APPLICABLE            | P                                           | —      | OK                            | —                                                                                                                                                                         |
| 27  | Subscriptions / renewals                                  | Nothing recurring is sold on this domain (Tessera's monthly plan is on `qi.` via Polar)                                                                                            | NOT APPLICABLE            | —                                           | —      | —                             | —                                                                                                                                                                         |
| 28  | Accounts, auth, tenants, uploads, UGC, DMCA, moderation   | Static site, no accounts, no uploads, no public posting                                                                                                                            | NOT APPLICABLE            | —                                           | —      | —                             | —                                                                                                                                                                         |
| 29  | Marketing email / SMS                                     | No list or signup; form notice says it is not used for a newsletter                                                                                                                | NOT APPLICABLE            | —                                           | —      | —                             | —                                                                                                                                                                         |
| 30  | Children / age                                            | B2B software services; `/privacy` states not directed at under-13s                                                                                                                 | NOT APPLICABLE            | —                                           | —      | —                             | —                                                                                                                                                                         |
| 31  | AI features / AI disclosure                               | No model calls on the site. AI-operated delivery disclosed on buy pages and homepage (prior F1 merged). "AI-powered" not used                                                      | APPLIES (disclosure only) | E                                           | —      | OK                            | grep                                                                                                                                                                      |
| 32  | Endorsements                                              | Nonprofit track trades a discount for a testimonial; none published                                                                                                                | APPLIES (future)          | L (FTC Endorsement Guides)                  | Low    | OK                            | When one is published it must disclose the discount                                                                                                                       |
| 33  | Structured data truthfulness                              | Withdrawn product published FAQPage answers describing it as live                                                                                                                  | APPLIES                   | E                                           | Low    | FIXED                         | JSON-LD now Offer `Discontinued` only                                                                                                                                     |
| 34  | Governing law / seller identity                           | `/terms` names Connecticut LLC, Fairfield County venue                                                                                                                             | APPLIES                   | L                                           | Low    | OPEN                          | State of formation still unverified (prior NEW-3) — owner confirm                                                                                                         |
| 35  | Deploy safety / rollback                                  | Atomic symlink release, 5 retained, version gate, revenue-page guard                                                                                                               | APPLIES                   | E                                           | —      | OK                            | Read `deploy.yml`; no workflow changed                                                                                                                                    |
| 36  | Licences: fonts, images                                   | JetBrains Mono self-hosted (OFL); Outfit/Lora via Google Fonts (OFL); hero masters in `assets/heroes/`                                                                             | UNKNOWN                   | L                                           | Low    | OPEN                          | Provenance of the hero photographs is not recorded in the repo                                                                                                            |

## Tests run

| Command / check                                                                                              | Result                                                                                              |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `npm run build`                                                                                              | pass, 67 pages                                                                                      |
| `npm test` (vitest)                                                                                          | pass, 40 tests (33 existing + 7 new)                                                                |
| `npm run lint`                                                                                               | pass                                                                                                |
| `npm run typecheck` (`astro check`)                                                                          | pass, 0 errors (after typing `NovelContent` for Astro 5.18)                                         |
| `npx prettier --check` on touched files                                                                      | clean for every file that was clean at baseline                                                     |
| axe-core 4 (WCAG 2.0/2.1/2.2 A+AA tags), Playwright + Chrome, all 66 sitemap URLs + 6 noindex routes, 1280px | before: 71 route runs with colour-contrast, 2 link-in-text-block, 2 scrollable-region; after: **0** |
| same at 375px, with horizontal-overflow measurement                                                          | after: 0 violations, 0 overflow on every route                                                      |
| homepage with the sleeve opened, 1280 and 375                                                                | 0                                                                                                   |
| reduced-motion emulation (`/`, `/kit/`, `/contact/`)                                                         | 0                                                                                                   |
| Keyboard: Tab order on `/buy/file-conversion/`, `/contact/`, `/`                                             | skip link first, logical order, visible focus on every stop                                         |
| Mobile menu across a ClientRouter navigation (375px)                                                         | before: dead on page 2; after: opens, Escape closes and returns focus                               |
| Hostile robots.txt via mocked `r.jina.ai`                                                                    | no script execution, no injected elements                                                           |
| Live GETs: headers, route status, third-party hosts, cookies                                                 | recorded in #9, #22, #23                                                                            |
| `npm audit`                                                                                                  | 14 → 6 advisories                                                                                   |

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
   delivery all route to `hello@` or `dev@`; there is no evidence either is
   read. Needed: one address, one reader, one cadence.
2. **OD-01 — Payment Link state.** Confirm in the Stripe dashboard that the
   US$450 link `14A9AT07I7le8Jt2sI87K0f` is Inactive.
3. **Lead retention period** (#12) — a number to publish on `/privacy` and a
   purge to match.
4. **CT sales tax** (#17) — registration status and whether Stripe collects.
5. **VPS `/tools/` route** (#22, prior F7) — Caddy change needs a reload, which
   needs an explicit yes.
6. **NEW-3 — state of formation** for the LLC named in `/terms`.

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

## Migration, configuration, and rollback

- **No migration, no new environment variables, no workflow changes.**
  `package-lock.json` changed (non-breaking updates within existing ranges);
  CI's `npm ci` picks it up.
- **Deploy:** merging to `main` deploys through the existing workflow and its
  revenue-page guard. The pages it guards all still build.
- **Rollback:** revert the audit commits (`git revert <sha>` for any one; they
  are independent except that `test:` expects the fixes), or repoint the VPS
  `current` symlink to the previous release as documented in the README.
  The dependency bump can be reverted alone by restoring the previous
  `package-lock.json`.
- **Visual change to expect:** muted metadata is darker (≈75% ink instead of
  20–55%), the accent orange is 2% darker in lightness, care/discovery/partner
  panels now show the borders and tint they always referenced.

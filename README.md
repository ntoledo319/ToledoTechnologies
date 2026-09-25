# Toledo Technologies Website

Static website for [toledotechnologies.com](https://toledotechnologies.com) built with Astro, Tailwind CSS, and TypeScript.

## Tech Stack

- **Framework**: [Astro](https://astro.build) v7 (Node 22.12+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Language**: TypeScript
- **Deployment**: G.R.A.C.E. VPS (git push → GitHub Actions → atomic release)

## Project Structure

```text
/
├── public/              # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Content collections (blog, codebases, case-studies)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── styles/          # Global CSS
│   └── utils/           # Utility functions (JSON-LD helpers, etc.)
├── astro.config.mjs     # Astro configuration
└── package.json
```

## Local Development

```bash
# Install dependencies
npm ci

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Every push to `main` deploys automatically: `.github/workflows/deploy.yml`
builds the site (`npm ci && npm run build` → `dist/`) and streams it over SSH
to the G.R.A.C.E. VPS (`15.204.209.97`), where a forced-command release script
(`/home/ubuntu/bin/deploy-toledo-root`) extracts it into a timestamped release
and atomically swaps the `current` symlink that host Caddy serves at
`toledotechnologies.com`. The workflow then polls `/version.txt` until the
pushed commit SHA is live — a deploy isn't green until the new build is
provably serving.

The CI pipeline is unchanged (same four secrets, same `tar | ssh` over the
forced-command key, same `version.txt` gate). What changed on 2026-07-03: the
box release script was regenerated from the shared static template
(`deploy/sites/_template/deploy-static.sh.tmpl`), so every deploy now logs a
deploy event into G.R.A.C.E. — `published` on success, `failed` if the release
aborts before publish. Those events are visible on the "Living Fleet" hosting
dashboard at `https://graceai.love/hosting` and via
`GET /api/v1/hosting/toledo-root/deploys`. The canonical copy of this site's
release script is `deploy/sites/toledo/deploy-toledo-root.sh` in grace-complete
— edit there and reinstall on the box; never hand-edit the live script.

DNS is authoritative at Porkbun (`A @` and `A www` → the VPS). Server-side
pieces (release script, Caddy block, deploy-key model) are documented in the
grace-complete repo at `deploy/sites/toledo/README.md`.

Required GitHub Actions secrets: `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER`,
`VPS_KNOWN_HOSTS`. No site environment variables are required — the site
builds with zero configuration.

Rollback: repoint the `current` symlink to a previous release on the VPS (the
newest 5 are retained), or revert the commit and push.

The deploy replaces the whole tree, so anything absent from `dist/` stops
existing the moment the symlink swaps — a build from a branch that never had a
page would delete it from the live site without a single error. The
**revenue-page guard** step in `deploy.yml` runs before the upload and fails the
job if any of `buy/file-conversion`, `buy/gtfs-feed-check`, `kit`,
`engagements`, `listing`, `order/complete`, `order/reconciliation`, `proofs` or
`file-reconciliation` is missing from `dist/`, or if `catalog.json` or
`llms.txt` did not build. Adding or renaming a purchase path means updating that
list in the same commit.

## Post-Launch SEO Checklist

After deploying to production:

### Google Search Console

- [ ] Add property for `toledotechnologies.com`
- [ ] Verify ownership (DNS or HTML file)
- [ ] Submit sitemap: `https://toledotechnologies.com/sitemap-index.xml`
- [ ] Request indexing for key pages

### Social Preview Testing

- [ ] Test Open Graph with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test X (Twitter) Cards with the [Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify OG images render correctly

### Performance & SEO Audit

- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on homepage
- [ ] Check [Core Web Vitals](https://web.dev/vitals/) in Search Console
- [ ] Verify all pages return 200 status
- [ ] Test 404 page works correctly
- [ ] Confirm sitemap is accessible and valid

### Analytics (Optional)

- [ ] Set up Google Analytics 4 or Plausible
- [ ] Configure goal tracking for contact form submissions

## Content Collections

### Blog Posts

Add new posts to `src/content/blog/` as Markdown files with frontmatter:

```yaml
---
title: 'Post Title'
description: 'Brief description for SEO'
publishedDate: 2024-01-15
modifiedDate: 2024-01-20
author: 'Author Name'
tags: ['tag1', 'tag2']
featured: false
draft: false
tldr: 'One-sentence summary'
---
```

### Codebase references — retired

There is no `src/content/codebases/` collection. The capability archive, its
routes and its schema were deleted; `src/content/` now holds `blog` and
`case-studies` only. Do not re-add the collection to document a product —
anything buyable belongs on a page under `src/pages/buy/`, `src/pages/kit/` or
`src/pages/engagements.astro`, where the price and the refund condition are
published together.

### Proof and field notes

Every entry in `src/content/case-studies/` must identify its provenance and
limitations. Independent public research and sample deliverables must never be
rendered as paid client work.

```yaml
---
title: 'Case Study Title'
description: 'Brief description'
industry: 'Industry Name'
services: ['Service 1', 'Service 2']
publishedDate: 2024-01-15
measurementDate: 2024-01-14 # optional
featured: false
results: ['Recorded observation 1', 'Recorded observation 2']
evidenceType: 'independent-research' # or "sample-deliverable"
evidenceNote: 'Plain-language provenance statement'
limitations: 'What this evidence cannot establish'
---
```

## Lead capture

Lead forms POST to the eolkits lead bus at
`https://eolkits.com/api/v1/lead`. Valid submissions are stored and notify the
owner. The first-step forms keep visible fields to the information needed for
routing; `source`, `product`, `service`, and `context` travel as hidden metadata.

- Native HTML forms 303-redirect to their `_next` page after submit.
- AJAX forms (SiteLift-style) get back JSON: `{ ok, lead_id }`.

## Content Security Policy

Every page carries one `<meta http-equiv="content-security-policy">`, generated
by Astro's `security.csp` in `astro.config.mjs` (Caddy sends no CSP header).

- **Adding a third party** (script, stylesheet, font, image, fetch target,
  form endpoint) means adding its origin to that config, or the browser
  refuses it. The build's CSP check catches scripts, stylesheets and form
  targets; a missing font, image or fetch origin only shows up in the
  browser console, so load the page and watch for refusals.
- **Inline code**: none. Scripts and stylesheets always ship as files
  (`build.inlineStylesheets: 'never'`, JS never inlined), and `is:inline`
  scripts are reserved for JSON-LD and external `src` scripts (the analytics
  beacon). That keeps one policy with no per-page hashes, so ClientRouter
  swaps between pages never meet code the first page's policy does not
  cover. `src/test/csp.test.ts` enforces this.
- **Per-page widening**: `Astro.csp.insertDirective(...)` in the page (only
  `/tools/robots-audit/` does this). `PolicyNavigationGuard` gives any page
  with a different policy a full load, because a `<meta>` policy can be added
  to but never replaced.
- `scripts/csp.mjs` moves the tag to the top of `<head>` after each build and
  re-checks every page against its own markup; the build fails on drift.
- `public/proofs/purchasing/archive.html` is generated by the proof's
  `archive.py` and ships unchanged with its own `default-src 'none'` policy.

## Truth contracts

- `/case-studies/` contains labeled research and samples, not implied clients.
- `/portfolio/` separates reference builds, research notes, and sample outputs.
- There is no `/checkout-success/` route. Post-checkout pages live under
  `src/pages/order/` — `/order/complete/`, `/order/cancelled/` and
  `/order/reconciliation/` — all `noindex`, and all named in the deploy
  guard's list so a build cannot drop one.
- Contact links may pass `service` and `subject`; `/contact/` preserves both in
  lead metadata and makes the routing context visible to the visitor.
- `/file-reconciliation/` is withdrawn, not sold. The page renders a withdrawal
  notice, its `PAYMENT_LINK` constant is deliberately the empty string, and its
  JSON-LD publishes `availability: Discontinued` with no price so aggregators
  stop advertising the offer. Do not paste a Payment Link back in unless the
  delivery path can genuinely read and write the formats the page names.
- The capability list in `src/data/listing.ts` is republished verbatim by third
  parties, so it names only what the tooling does. Delimited and structured text
  only — Excel workbooks are neither read nor written, and that wording must
  stay in step with `/engagements/` and `public/llms.txt`.
- `/policies/` states the refund terms per rail in its own words. It no longer
  defers to "the signed agreement", which does not exist for a one-click card
  purchase. `/terms/` names Connecticut law and Fairfield County venue, and
  `/privacy/` discloses the Cloudflare Web Analytics beacon the site loads.
- The source-contract tests in `src/test/truth-contract.test.ts` protect these
  boundaries from copy drift.

## License

Proprietary - Toledo Technologies

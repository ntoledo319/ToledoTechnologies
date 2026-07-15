# Toledo Technologies Website

Static website for [toledotechnologies.com](https://toledotechnologies.com) built with Astro, Tailwind CSS, and TypeScript.

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5
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

### Codebase references

Add capability references to `src/content/codebases/`. This collection is not a
storefront; pricing, inventory, checkout, license-availability, and support-sale
fields are intentionally absent from the schema.

```yaml
---
title: 'Product Name'
tagline: 'Short tagline'
description: 'Full description'
status: 'reference' # or "active" or "archived"
category: 'Security'
tags: ['tag1', 'tag2']
features: ['Feature 1', 'Feature 2']
included: ['Item 1', 'Item 2']
targetAudience: ['Audience 1', 'Audience 2']
order: 1
---
```

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

## Truth contracts

- `/codebases/` is a reference archive, not a sale or licensing surface.
- `/case-studies/` contains labeled research and samples, not implied clients.
- `/portfolio/` separates reference builds, research notes, and sample outputs.
- `/checkout-success/` is retained only as a no-index retired-route notice.
- Contact links may pass `service` and `subject`; `/contact/` preserves both in
  lead metadata and makes the routing context visible to the visitor.
- The source-contract tests in `src/test/truth-contract.test.ts` protect these
  boundaries from copy drift.

## License

Proprietary - Toledo Technologies

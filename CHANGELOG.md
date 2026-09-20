# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A gatefold-native proof ledger, labeled sample discovery insert, evidence bands,
  and source-contract tests for public claims and lead forms.
- A contextual Tessera catalog entry with exact live products and prices, the free
  scanner, reviewer-owned inventory template, and personal `ntoledo319` Marketplace
  Action, all paired with the static-check and qualified-review limitations.
- A single contextual handoff from the existing compliance-automation article to
  Tessera's account-free served-HTML inventory, with authorization, runtime-script,
  continuous-monitoring, and compliance-determination limits stated beside it.

### Changed

- Converted the former codebase storefront into a capability archive; retired
  checkout, pricing, inventory, scarcity, transfer, and support-sale language.
- Reframed case studies as dated field notes and sample deliverables with required
  provenance and limitation fields; removed unsupported healthcare and fintech
  client stories.
- Reconciled founder/studio attribution, partner non-solicitation terms, Care-plan
  fit language, mobile and AI discovery targets, and performance-audit claims.
- Reduced contact, discovery, Care, and Partner first-step forms to five visible
  fields while preserving source and service context for the eolkits lead bus.
- Reworked mobile tables, forms, calls to action, and navigation targets for
  contained horizontal scrolling and touch-size controls.
- Replaced the dead local speed-test API experience with a transparent launcher
  for Google PageSpeed Insights and a non-causal measurement guide.

### Removed

- Retired the public codebase archive entirely: deleted the AegisTwin, ComplyCrawl,
  and TallySec capability notes, the `/codebases/` routes and collection, the
  archived checkout page, and all sale collateral under `public/downloads/`.
- Scrubbed every remaining reference — navigation, footers, the Proof Ledger
  (now research notes + sample deliverables), services, 404, terms, policies,
  `llms.txt`, blog cross-links, the robots.txt tool attribution, the unused
  `softwareSchema`, and the codebase-specific truth-contract tests.

### Fixed

- Contact and privacy copy now describe the actual eolkits storage and notification
  path instead of the retired form provider.
- Removed placeholder performance metrics that appeared to be measured results.
- Preserved `service` and `subject` query context through contact submission.

## [2026-09-20] - Storefront truth and reachability

Deployed to `main` as `585a357`; the live site serves it. Appended, not edited —
earlier entries stand as written.

### Added

- `/buy/gtfs-feed-check/` — US$99, one public GTFS Schedule feed URL entered at
  checkout, with the exclusions and the refund condition published on the page.
- A revenue-page guard in `.github/workflows/deploy.yml`. The deploy replaces
  the whole tree, so a build missing a purchase path would silently delete it;
  the guard fails the job instead when a listed path, `catalog.json` or
  `llms.txt` is absent from `dist/`.
- Header and footer entries that reach the buyable work, which previously had no
  route from the site chrome.

### Changed

- `/policies/` now states the real refund terms for each rail in its own words.
  It previously deferred to "the signed agreement" — a document that does not
  exist for a one-click card purchase, and therefore the refund document every
  card buyer was accepting.
- `/terms/` names Connecticut as governing law and Fairfield County as venue.
- `/privacy/` discloses the Cloudflare Web Analytics beacon the site loads.
- `/engagements/` and `/kit/` show their prices in the first screen, on mobile
  as well as desktop.

### Removed

- "Excel output" as a published capability, on all three surfaces that carried
  it: `/engagements/`, `public/llms.txt` and `src/data/listing.ts`. The delivery
  path has no xlsx reader or writer; the list now reads "delimited and
  structured text only — not Excel workbooks".

### Withdrawn

- The US$450 two-file reconciliation SKU. `/file-reconciliation/` is titled
  "withdrawn", its Stripe CTA and the email-invoice fallback are gone,
  `PAYMENT_LINK` is the empty string, and the JSON-LD publishes
  `availability: Discontinued` with no price. The terms it was published under
  are kept on the page for anyone who read them.

### Fixed

- The home sleeve panel now has a ground that is legible without the hero
  photograph on top of it.
- Heading order and landmarks in the gatefold layout.
- Vestigial FormSubmit fields on `/contact/`.

## [1.0.0] - 2026-07-02

### Added

- ProfessionalService local schema on homepage via shared helper.
- Site-wide ProfessionalService (CT service-area) schema + `llms.txt`.
- Rupture added to codebases catalog, linking out to live Rupture site.
- Automated deployment to G.R.A.C.E. VPS via GitHub Actions (dropped Render).

### Changed

- Lead capture now points to GRACE `/api/v1/lead` (replaced FormSubmit).
- Hero image performance improved with AVIF/WebP responsive ladder (mobile 4.9MB -> ~64KB).

### Fixed

- AegisTwin inventory updated from 94 to 136 test functions, verified against
  the public `main` source rather than described as a passing test run.

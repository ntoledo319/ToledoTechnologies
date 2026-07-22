# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A gatefold-native proof ledger, labeled sample discovery insert, evidence bands,
  and source-contract tests for public claims and lead forms.

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

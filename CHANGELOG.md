# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- Test count for AegisTwin updated (94 -> 136).

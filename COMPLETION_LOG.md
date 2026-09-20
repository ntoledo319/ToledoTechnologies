# Completion Log

- Searched codebase for `TODO`, `FIXME`, `XXX`, `NotImplementedError`, and "coming soon" placeholders.
- No incomplete work or stubs found in the `src/` directory.
- Moved root-level clutter (`copy-rewrites-2026-05-11`, `designpowers`, `tt`) into `docs/archive/` to clean up the workspace.
- Proceeding to verification and completion.

## 2026-07-14 — Offer truth and conversion repair

- Replaced unsupported healthcare and fintech client stories with a proof-note
  model that requires an evidence type, provenance note, and limitations.
- Converted the codebase storefront, portfolio, policy, checkout-confirmation,
  and TallySec ROI surfaces into a non-sale reference archive, proof ledger,
  retired-route notice, and neutral planning tool. Source assets remain intact.
- Aligned founder attribution, Partner non-solicitation and IP boundaries, Care
  fit language, App Store wording, performance claims, and discovery routing.
- Routed AI inquiries to `https://ai.toledotechnologies.com/#start` and mobile
  inquiries to `https://mobile.toledotechnologies.com/#discovery`.
- Reduced Contact, Discovery, Care, and Partner intake to five visible fields
  each and preserved source, product, service, subject, and context metadata for
  the eolkits lead bus.
- Added the record-insert sample discovery artifact, evidence labels, archive
  tracklists, contained mobile ledgers, and 44px mobile navigation targets.
- Added 10 source-contract tests covering claim provenance, non-sale archive
  boundaries, exact service targets, lead routing, and form field counts.

Verification completed after the final edits:

- `npx prettier --check $(git diff --name-only --diff-filter=ACM)` — passed.
- `npm run lint` — passed.
- `npm test` — 33 tests passed.
- `npm run typecheck` — 0 errors, 0 warnings, 0 hints.
- `npm run build` — 54 routes built successfully.
- `git diff --check` — passed.
- The shared Playwright release audit passed all 60 route/viewport checks across
  the six service sites at 1440×900 and 390×844. It checked route and resource
  responses, console errors, overflow, real anchors, intake field counts,
  email-only required fields, acknowledgement states, legal/retirement routes,
  disclosure controls, and minimum touch targets. No form was submitted.

## 2026-09-20 — Documentation caught up with the deployed storefront

Append-only: nothing above this line was edited.

The storefront truth and reachability work shipped to `main` as `585a357` and
the live site serves it, but this repository's own docs still described the
world before it. Corrected in place, because each statement was false rather
than merely old:

- `README.md` — the "Codebase references" section told an author to add files to
  `src/content/codebases/`. That collection, its routes and its schema were
  deleted; `src/content/` holds `blog` and `case-studies` only. The section now
  says so and points at `src/pages/buy/`, `src/pages/kit/` and
  `src/pages/engagements.astro` instead.
- `README.md` — the truth-contract list opened with "`/codebases/` is a
  reference archive", a claim about a route that no longer exists. Replaced with
  the contracts that are now load-bearing: the withdrawn `/file-reconciliation/`
  SKU, the capability wording in `src/data/listing.ts`, and the per-rail refund
  terms on `/policies/`.
- `README.md` — the Deployment section described the CI pipeline without the
  revenue-page guard that now runs before the upload. Documented, including the
  fact that adding or renaming a purchase path means updating the guard's list
  in the same commit.
- `README.md` — the same list claimed `/checkout-success/` was "retained only as
  a no-index retired-route notice". That route does not exist; the post-checkout
  pages are `/order/complete/`, `/order/cancelled/` and
  `/order/reconciliation/`, all `noindex` and all named in the deploy guard.
- `AGENTS.md` — listed `src/content/codebases/` as a live content collection.
  Corrected.

`CHANGELOG.md` carries a new dated `[2026-09-20]` section for the shipped work.
The existing `[Unreleased]` block was left exactly as written.

No page, price, route, asset or workflow was changed in this pass. Nothing was
built, deployed or pushed to a provider — documentation only.

# Main commercial website implementation

## What changed

- Replaced the gated homepage opening with an immediately usable commercial
  front door while preserving the paper, ink, record-sleeve, typography, and
  evidence-label identity.
- Added `/workflows/`, `/workflows/care/`, `/custom-tools/`, `/brief/`, and
  `/workflow-proof/`.
- Rebuilt `/services/` as a problem-based index and `/partner/` around bounded
  agency workflow delivery. Existing specialist practices, Tessera truth,
  discovery rules, and partner rates remain published.
- Added a shared offer source for the $1,500 Repair, $3,000 Setup, and
  $500/month Care facts and initial one-project/three-workflow capacity.
- Added a same-origin brief form for `POST /api/services/brief`. It preserves
  allowlisted service/source/context query values in a static build, creates a
  UUIDv4, retains only that retry ID in session storage, preserves buyer input
  across recoverable failures, distinguishes confirmed receipts from ambiguous
  responses, and provides an email fallback without JavaScript.
- Configured Astro development to proxy `/api/services/*` to
  `SERVICES_API_ORIGIN`, defaulting to `http://127.0.0.1:8765`.
- Added an indexable, plainly labeled studio-owned synthetic workflow proof.
  It renders the sanitized local rehearsal states and publishes the same JSON at
  `/proofs/workflow/synthetic-proof.json`. It links the existing proof archive,
  field notes, and portfolio without representing fixture values as client or
  production results.
- Captured confirmed product and design context in `PRODUCT.md` and `DESIGN.md`.
- Restored `/kit/compare/`, `/kit/sample/`, and the complete fictional sample
  packet from their exact authored side-branch commits after the production
  backup comparison showed that these reviewed public pages were absent from
  the reconciled main branch. The Astro sources now rebuild against current
  shared assets; source/blob hashes and every sample-manifest entry are guarded.

## Preserved commercial boundaries

- The $1,200 Integration Triage remains diagnosis rather than a promised fix
  and has no automatic Repair credit.
- File conversion remains $850 and the evaluation harness remains $2,200 with
  their existing purchase and acceptance terms.
- Custom work remains separately scoped: a broad $5,500 floor, Web App
  Discovery at $3,500–$5,000, internal tools commonly $15,000+, AI discovery at
  $3,500–$10,000, and production automation commonly $10,000–$30,000.
- The discovery credit remains 50% toward the kickoff Project Retainer when the
  project proceeds within 30 days, capped at that retainer, with no rollover.
- Broader Care plans, partner rates, products, old URLs, proof archives, case
  studies, portfolio pages, and purchase paths remain present.

## Verification

Run the complete leaf gate from the workspace root:

```bash
python3 main/verify.py
```

The script runs the actual Astro typecheck, ESLint, Vitest suite, production
build, and a real local HTTP proxy exercise, then verifies the new and restored
routes, same-origin proxy, intake fields, prices, boundaries, proof labels, and
unique specimen anchor. It prints
`LEAF_1_VERIFIED` only after every check succeeds.

## Local preview

Start the real intake service from the workspace root with a disposable local
database:

```bash
python3 -m ops.server --db /tmp/toledo-services-preview.sqlite3 --host 127.0.0.1 --port 8766
```

Then start Astro from `main/`:

```bash
SERVICES_API_ORIGIN=http://127.0.0.1:8766 npm run dev -- --host 127.0.0.1 --port 4321
```

Port 8765 is occupied by an unrelated local dashboard in this workspace. Do
not stop or reconfigure that process; use 8766 for this preview.

Open `http://127.0.0.1:4321/`. The brief form uses the real local intake through
the Astro proxy; it never fabricates a receipt.

## Readiness and release boundary

The six-site static candidate is ready for root's supervised release. The
separately owned operations leaf reports that the public same-origin endpoint is
live and has passed HTTP 201 create, HTTP 200 idempotent retry, HTTP 409 conflict,
restart durability, and both submitter-confirmation and owner-alert delivery
checks through the existing mail provider. The privacy page describes that
behavior without promising that every email will arrive.

This leaf did not push, commit, deploy, or mutate a live website. Root owns the
final candidate commits, offline packages, receiver calls, and rollback. After
Main is released, its final smoke check must submit through the public
`/brief/` page and match the displayed reference, service, and source to the
durable record. The synthetic workflow proof remains explicitly a local fixture;
the live intake result does not turn its fixture values into production claims.

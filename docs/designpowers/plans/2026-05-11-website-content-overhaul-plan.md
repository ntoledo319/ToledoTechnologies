# Design Plan: Website Content Overhaul (5-Microsite Pivot)

> **For agentic workers:** REQUIRED: Use designpowers:designpowers-critique to review completed work against this plan.

**Goal:** Pivot the Toledo Technologies website to a 5-microsite ecosystem and build out the shared service pillars (/care, /discovery, /partner).

**Design Direction:** [docs/designpowers/strategy/2026-05-11-website-content-overhaul-strategy.md](docs/designpowers/strategy/2026-05-11-website-content-overhaul-strategy.md)

**Personas:** [docs/designpowers/personas/2026-05-09-gatefold-studio-personas.md](docs/designpowers/personas/2026-05-09-gatefold-studio-personas.md)

---

## Task 1: Update Home Page (`/`)

**Files:** `src/pages/index.astro`

- [ ] Step 1: Replace "Four sides to the studio" with "Five sides of the studio" section.
- [ ] Step 2: Update hero deck and Section 1 ("What you'll find on this record").
- [ ] Step 3: Add Section 3 ("What lives on this side") linking to /care, /discovery, /partner.
- [ ] Step 4: Update the Liner Index (sidebar) with new rows (Catalog, Side B).

**Accessibility check:** Ensure the Liner Index table uses semantic HTML or ARIA roles for DL/DT/DD. Verify heading levels (h1 -> h2 -> h3).

**Verification:** Build check + visual verification of the 5-side list.

---

## Task 2: Rebuild Services Page (`/services`)

**Files:** `src/pages/services.astro`

- [ ] Step 1: Replace hero with "Five sides of the catalog" headline.
- [ ] Step 2: Implement the five catalog cards (ToledoWeb, SiteLift, Apps, Mobile, AI) as parallel card-sized blocks.
- [ ] Step 3: Add Section 2 ("What sits across the catalog") and Section 4 ("How a project starts").
- [ ] Step 4: Add Section 3 ("Other shelves on Side B").

**Accessibility check:** Cards should have clear focus states. Links to microsites should clearly indicate they are external.

**Verification:** Confirm all 5 microsite links and 3 shared service links are correct.

---

## Task 3: Create Care Page (`/care`)

**Files:** `src/pages/care.astro` (New)

- [ ] Step 1: Scaffolding with `GatefoldLayout`.
- [ ] Step 2: Implement "The two ladders" section (managed care vs buckets).
- [ ] Step 3: Build the Care Plan table and Bucket Retainer table.
- [ ] Step 4: Implement the Intake Form as specified in `copy-rewrites-2026-05-11/pages/care.md`.

**Accessibility check:** Tables must be responsive and use proper headers (`th`). Form labels must be associated with inputs.

**Verification:** Form validation + responsive check for tables.

---

## Task 4: Create Discovery Page (`/discovery`)

**Files:** `src/pages/discovery.astro` (New)

- [ ] Step 1: Scaffolding with `GatefoldLayout`.
- [ ] Step 2: Implement the "Six paid front doors" as detailed sections.
- [ ] Step 3: Add anchor IDs (e.g., `#website-audit`) for routing from other pages.

**Accessibility check:** Anchor navigation must focus the destination section correctly.

**Verification:** Confirm anchor links from /services point correctly to sections on this page.

---

## Task 5: Create Partner Page (`/partner`)

**Files:** `src/pages/partner.astro` (New)

- [ ] Step 1: Scaffolding with `GatefoldLayout`.
- [ ] Step 2: Implement the "Toledo Partner" white-label engineering copy.
- [ ] Step 3: Add inquiry CTA.

**Accessibility check:** Maintain reading rhythm and contrast.

**Verification:** Correct pricing ($125/hr floor) and non-compete terms displayed.

---

## Task 6: Global Alignment & Footer

**Files:** `src/pages/index.astro` (footer part), and any shared `Footer.astro` (if exists).

- [ ] Step 1: Update the `endsleeve` footer with new columns (Side A / Side B / Inner Sleeve).
- [ ] Step 2: Audit all cross-page links (About, Case Studies, Codebases).
- [ ] Step 3: Update `Liner Notes` credits in footer.

**Accessibility check:** Check footer link targets and labels.

**Verification:** Final site-wide build + link audit.

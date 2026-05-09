# Design Plan: Phase 1 — Foundation & Basic Upgrade

> **For agentic workers:** REQUIRED: Use designpowers:designpowers-critique to review completed work against this plan.

**Goal:** Prepare the site for the "Multi-Realm Engine" and soften the current "sharp" aesthetic while moving to Vercel for high performance.

**Design Direction:** [Toledo Redesign Brief](docs/designpowers/briefs/2026-05-07-toledo-redesign.md)

**Personas:** [Skeptical Lead, Creative Director, High-Access User]

---

## Task 1: Environment & Engine Setup
**Files:** `astro.config.mjs`, `package.json`, `vercel.json`

- [x] Step 1: Add `@astrojs/vercel` adapter for high-performance static/SSR hosting.
- [x] Step 2: Ensure Tailwind CSS v4 is optimized for the "Ethereal Engine."
- [x] Step 3: Define "Engine" design tokens (rounded-engine, base-spacing, volumetric-shadows).

**Accessibility check:** Base contrast ratios must meet WCAG 2.2 AA (4.5:1 for text).

**Verification:** Successful build and deployment to Vercel with 95+ Lighthouse Performance.

---

## Task 2: "Less Sharp" Visual Overhaul
**Files:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`

- [x] Step 1: Implement "rounded-engine" curves across all containers and buttons.
- [x] Step 2: Update typography to the "Senior Dev" pairings (Direct, Bold, Approachable).
- [x] Step 3: Adjust container spacing to feel "welcoming" and "less aggressive."

**Accessibility check:** Interactive elements (buttons, links) must have clear, high-contrast hover/focus states.

**Verification:** Visual check confirms the site feels "less sharp" but still "direct."

---

## Task 3: The First "Leap" Foundation
**Files:** `src/layouts/BaseLayout.astro`, `src/components/Navigation.astro`

- [x] Step 1: Build the "Realm Wrapper" component to handle radical atmosphere shifts.
- [x] Step 2: Implement basic CSS view transitions for moving between realms.
- [x] Step 3: Configure `prefers-reduced-motion` logic to stabilize transitions when requested.

**Accessibility check:** Users with motion sensitivity must be able to navigate without camera swings or flashing.

**Verification:** Navigating between home and portfolio shows the first "leap" foundation working smoothly.

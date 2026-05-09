# Design Plan: Phase 2 — The Ethereal Engine Core

> **For agentic workers:** REQUIRED: Use designpowers:designpowers-critique to review completed work against this plan.

**Goal:** Implement the "3D feeling" and "light-driven depth" through volumetric lighting and reactive surfaces.

**Design Direction:** [Toledo Redesign Brief](docs/designpowers/briefs/2026-05-07-toledo-redesign.md)

**Personas:** [Skeptical Lead, Creative Director, High-Access User]

---

## Task 1: Volumetric Lighting & Background Depth
**Files:** `src/layouts/BaseLayout.astro`, `src/styles/global.css`

- [x] Step 1: Create a mouse-following volumetric light source in the global background.
- [x] Step 2: Implement "Real over Digital" background gradients that react to the light.
- [x] Step 3: Layer soft, atmospheric shadows behind main content containers.

**Accessibility check:** Motion must be subtle and respect `prefers-reduced-motion`. Contrast must remain high for all foreground text.

**Verification:** Moving the mouse creates a subtle sense of "being inside the site" without affecting readability.

---

## Task 2: Tactile & Reactive Components
**Files:** `src/components/Navigation.astro`, `src/pages/index.astro` (hero), `src/styles/global.css`

- [x] Step 1: Add proximity-based "glow" or "lift" to cards and buttons.
- [x] Step 2: Implement weighted transitions for hover states (slower, more physical).
- [x] Step 3: Update hero section to feel like it's "projected" into the 3D space.

**Accessibility check:** Proximity effects must be visual-only and not interfere with focus or click targets.

**Verification:** Hovering over the "What We Do" cards feels tactile and reactive.

---

## Task 3: The Radical Nonprofit Realm
**Files:** `src/pages/nonprofit.astro`, `src/layouts/BaseLayout.astro`

- [x] Step 1: Define the "Nonprofit" realm palette (e.g., warm, organic, earthy).
- [x] Step 2: Implement the first "Huge Leap" transition to the nonprofit world.
- [x] Step 3: Adjust lighting and "physics" in the nonprofit realm to feel "softer" and more "humane."

**Accessibility check:** Color shifts must still pass contrast checks for all personas.

**Verification:** Navigating to /nonprofit shows a radical but unified change in atmosphere.

---

## Task 4: Full Multi-Realm Rollout
**Files:** `src/pages/index.astro`, `src/pages/codebases/*`, `src/pages/services.astro`, `src/pages/portfolio.astro`

- [x] Step 1: Implement "Deep Obsidian" realm for Products (Codebases).
- [x] Step 2: Implement "Electric Indigo" realm for Services.
- [x] Step 3: Implement "Forest Green" realm for Portfolio.
- [x] Step 4: Finalize "Sales Realm" (Home) with large typography and volumetric hero.

**Verification:** Every major section of the site is now a unique "Design World" inside the Ethereal Engine.

---

## Task 5: Complex Pages & Immersive Charts
**Files:** `src/pages/services/performance-audit.astro`

- [x] Step 1: Build a high-fidelity service template with immersive price guides.
- [x] Step 2: Implement "Audit Flow" immersive charts with 3D-feeling bar visuals.
- [x] Step 3: Create "Performance Audit" realm with high-speed Violet palette.

**Verification:** The Performance Audit page serves as a proof-of-concept for complex freelancer service pages.

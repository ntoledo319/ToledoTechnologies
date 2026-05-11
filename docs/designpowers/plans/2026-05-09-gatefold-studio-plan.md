# Design Plan: The Gatefold Studio

> **For agentic workers:** REQUIRED: Use designpowers:designpowers-critique to review completed work against this plan.

**Goal:** Implement the "High-Fidelity Gatefold" redesign, focusing on tactile interactions and narrative-first content.

**Design Direction:** [The Gatefold Studio Strategy](docs/designpowers/strategy/2026-05-09-gatefold-studio-strategy.md)

**Personas:** [Senior Dev / Creative Director]

---

## Task 1: The Gatefold Layout Foundation

**Files:** `src/layouts/GatefoldLayout.astro`, `src/styles/gatefold.css`

- [ ] Create a new `GatefoldLayout` that acts as the physical sleeve.
- [ ] Implement a two-panel "hinge" system that can unfold to reveal the main content.
- [ ] Define CSS variables for "Paper" textures and grain.

**Accessibility check:** The unfolding must be aria-announced, and a "static" version must be provided for `prefers-reduced-motion`.

**Verification:** Test the hinge transition—does it feel physical?

---

## Task 2: The Abstract Hero (Contra Center)

**Files:** `src/pages/index.astro`, `public/images/hero-abstract.webp`

- [ ] Source or generate a stunning, high-res abstract hero image.
- [ ] Implement the hero as a full-bleed backdrop for the "Intro" state.
- [ ] Apply subtle noise and grain overlays to the image.

**Accessibility check:** Alt text must describe the atmosphere and textures of the abstract image.

**Verification:** Visual check—does it match the _Contra_ energy?

---

## Task 3: The "Technical Novel" Template

**Files:** `src/components/NovelContent.astro`, `src/layouts/InsertLayout.astro`

- [ ] Design a distraction-free, high-comfort reading template.
- [ ] Implement "Lyric Sheet" typography—large headings, beautiful body serif/sans mix, generous margins.
- [ ] Remove all "web" artifacts like sidebars, floating buttons, or popups.

**Accessibility check:** Pass WCAG AAA (7:1) contrast for reading comfort. Target a Grade 8 reading level for the narrative prose.

**Verification:** Read a sample 500-word "novel" on the template. Is it comfortable?

---

## Task 4: Interaction Physics (The Needle Drop)

**Files:** `src/utils/motion.ts` (using Framer Motion or simple CSS/JS)

- [ ] Implement spring-based easing for the "unfold" and "flip" interactions.
- [ ] Add subtle "hinge" shadows that shift as the panels open.
- [ ] Ensure all interactions are keyboard-triggerable.

**Accessibility check:** No interactions should be "mouse-only." Every "fold" must be accessible via Tab/Enter.

**Verification:** Navigate the site using only a keyboard. Is the "unfolding" feedback clear?

# Redesign Package: The Gatefold Studio

This folder contains the complete design blueprint for the Toledo Technologies redesign. It is designed for a developer with zero prior context to understand the vision, the strategy, and the technical requirements for the build.

## Document Index (Start Here)

1.  **[Design Brief](briefs/2026-05-09-gatefold-studio.md):** The high-level vision, problem statement, and core intent of the redesign.
2.  **[Inclusive Personas](personas/2026-05-09-gatefold-studio-personas.md):** The people we are building for—guiding our accessibility and content decisions.
3.  **[Design Strategy](strategy/2026-05-09-gatefold-studio-strategy.md):** The mechanical and aesthetic principles that differentiate the "Gatefold Studio."
4.  **[Implementation Plan](plans/2026-05-09-gatefold-studio-plan.md):** A 4-task breakdown of the implementation phases (Layout, Hero, Content, Physics).
5.  **[Design Handoff](handoff/2026-05-09-gatefold-studio-handoff.md):** The final technical specifications, interaction physics, and typographic rules for the developer.

## Key Principles for the Developer

- **Physicality over Digital:** Interactions should feel like paper, record sleeves, and physical hinges.
- **Narrative over Lists:** Content is a "Technical Novel." Treat the typography with extreme care.
- **High-Fidelity:** Stunning visuals (Contra-inspired) must be optimized for performance.
- **Accessibility by Design:** Motion must respect preferences, and the site must be 100% keyboard-navigable.

## Implementation Notes

- **Tech Stack:** Astro, Tailwind CSS, and Framer Motion (recommended for spring physics).
- **Core Layout:** The `GatefoldLayout.astro` is the central "sleeve" that houses the "unfolding" interactions.
- **Content:** Sub-pages are treated as "Vinyl Inserts" using the `InsertLayout.astro`.

---

**Version:** 1.0.0
**Date:** 2026-05-09
**Status:** Ready for Implementation

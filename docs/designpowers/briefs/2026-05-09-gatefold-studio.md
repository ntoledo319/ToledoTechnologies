# Design Brief: The Gatefold Studio

## Problem Statement

Most technical studio sites are either aggressive and sharp or boring and clinical. They don't feel like a place you want to _be_. We need to create a site that feels as rewarding and intentional as putting on a favorite record—high-fidelity, physical, and deep.

## Users

- **The High-End Client:** Who wants a partner that values craft over speed.
- **The Senior Developer:** Who values depth, long-form thought ("Novels"), and technical elegance.
- **Ability Spectrum:**
  - High focus on reading comfort (typography, line length).
  - Semantic structure ensures "Novel" content is accessible to screen readers.
  - `prefers-reduced-motion` will provide a simplified but still "unfolding" feel.

## Design Direction: "The Gatefold Studio"

- **Interaction:** An "Unfolding Gatefold" model. Navigating to sub-pages and menus feels like unfolding a physical vinyl sleeve.
- **Visuals:** A stunning, high-res abstract hero image on the home page (inspired by the _Contra_ cover). Sub-pages are "Vinyl Inserts"—clean, text-heavy, beautifully typeset "novels."
- **Atmosphere:** High-res, intentional, and premium. Tactile and physical.

## Constraints

- **Interaction Complexity:** Smooth, physical transitions using CSS/JS.
- **Performance:** High-res imagery must be optimized (Astro Image).
- **Typography:** Must support long-form "novel" reading comfort.

## Success Criteria

- The "unfolding" interaction feels satisfying and physical.
- The site is perceived as a "rare, high-fidelity" experience.
- High engagement with long-form content.

## Out of Scope

- Complex 3D environments (we stay tactile/2D "folding").
- Gamified interactions (we are high-end, not a game).

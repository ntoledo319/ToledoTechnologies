# Design Brief: Website Content Overhaul (5-Microsite Pivot)

## Problem Statement

The website currently uses placeholder content and an outdated 4-service structure. It needs to pivot to the new **5-microsite ecosystem** (Web, SiteLift, Apps, Mobile, AI) with clear routing, updated pricing, and cross-cutting pages (/care, /discovery, /partner).

## Users

Senior decision-makers, founders, and ops leaders who value **directness** and **senior-only engineering**. They are skeptical of "agency theatre" and respond to the high-fidelity "liner notes" aesthetic.

## Design Direction

- **Ecosystem Pivot**: Update Home and Services to route to the 5 new microsites (ToledoWeb, SiteLift, Apps, Mobile, AI).
- **New Pillars**: Build out `/care` (maintenance ladder), `/discovery` (paid front doors), and `/partner` (white-label).
- **Taste Enforcement**: Adhere strictly to the "Distinctive" target — no generic templates, no AI slop, no "polished" corporate fog. The voice is "Pressed remotely, senior only."

## Constraints

- **Tech Stack**: Astro v5, Tailwind CSS v4, TypeScript.
- **Layout**: Proprietary `GatefoldLayout`.
- **Pricing**: Canonical from internal docs (respecting the 2026-05-11 rewrites).

## Existing Design System

Proprietary `GatefoldLayout` and associated components in `src/components/`.

## Taste Direction (Early Signal)

- **Voice**: Vinyl-record liner notes. Side A (Studio) / Side B (Catalog).
- **Tone**: "Grave intention and art." Direct, senior-dev perspective.
- **Visuals**: High-fidelity, narrative-first, physicality (paper/vinyl feel).

## Success Criteria

- Seamless transition to the 5-microsite routing.
- New pages (`/care`, `/discovery`, `/partner`) active and aligned.
- Passes the **Specificity Test**: Could this exist in any other project? (No).

## Out of Scope

- Redesigning the underlying `GatefoldLayout` (unless required for performance).
- Updating the actual content of the 5 external microsites (those live on their own subdomains).

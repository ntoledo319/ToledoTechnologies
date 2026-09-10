# Design State: The Gatefold Studio

## Current Status: COMPLETED

The High-Fidelity redesign and service-pillar content overhaul are fully implemented and deployed. The studio now operates with a physical metaphor (Gatefold) and a narrative-first communication model (Technical Novel).

## Core Documentation (Consolidated)

- **Strategy:** [docs/design/strategy.md](docs/design/strategy.md)
- **Handoff:** [docs/design/handoff.md](docs/design/handoff.md)
- **Personas:** [docs/design/personas.md](docs/design/personas.md)
- **Taste Standards:** [CLAUDE.md#taste-standards](CLAUDE.md#taste-standards)

## Implementation Highlights

- **Desktop:** 3D Hinge interaction with `hero-midnight.jpg` (Microphone).
- **Mobile:** Art-directed `hero-crt.jpg` (Workstation) with Tap-to-Reveal interaction.
- **Narrative:** Site-wide "Anti-Agency" copy rewrite following strict high-fidelity principles.
- **Pillars:** Dedicated route pages for `/care`, `/discovery`, `/partner`, and `/nonprofit`.
- **Performance:** Hardware-accelerated 3D transforms with `100dvh` stability for mobile browsers.

## Major Decisions Log

| Date       | Decision                 | Rationale                                                                           |
| :--------- | :----------------------- | :---------------------------------------------------------------------------------- |
| 2026-05-09 | Gatefold Interaction     | Mimics a record sleeve; creates an intentional, crafted first impression.           |
| 2026-05-11 | Service-Pillar Pages     | Reflects the studio structure: Care, Discovery, Partner, and Nonprofit offerings.   |
| 2026-05-12 | Mobile Interaction Pivot | Switched from Drag to Tap (Record Release) to avoid mobile gesture conflicts.       |
| 2026-05-12 | Art-Directed Heroes      | Tailored visual impact: wide cinematic depth for desktop, warm intimacy for mobile. |
| 2026-05-12 | Anti-Slop Content Pass   | Site-wide copy review to ensure every word earns its rent. No AI smell.             |

## Archetype Reference

The studio follows the **"Record Label"** archetype:

- We do not "sell solutions," we **"press releases."**
- We do not "manage accounts," we **"engineer records."**
- We do not "provide services," we **"maintain tracks."**

---

# 2026-09-10 — Native Toledo proof ledger

- Brief: [Toledo proof pages](docs/designpowers/briefs/2026-09-10-proof-ledger.md).
- Plan: [Proof ledger implementation](docs/designpowers/plans/2026-09-10-proof-ledger-plan.md).
- Direction: DIRECT. Evidence precedes claims. Synthetic data and AI delivery roles are explicit.
- Composition: existing InsertLayout and sequential document sections, with no new dependencies. A standalone purchasing archive remains usable offline.
- Evidence: 39 request-signing and order-safety tests; 22 purchasing-archive tests. Neither demonstration establishes a working merchant integration or real Stocky export compatibility.
- Verification: lint, typecheck (zero diagnostics), 33 site tests and the production build pass. Both curated ZIPs rerun successfully: 39 signing tests and 22 archive tests. Chromium checks cover 58 route, download, accessibility, responsive and interaction assertions; the standalone archive also works in an offline browser.
- Status: locally verified; deployment verification pending. Source ZIPs, test records and download checksums accompany the samples.

# Design Handoff: The Gatefold Studio

## Context

This redesign transforms Toledo Technologies into a "High-Fidelity Gatefold" experience. It prioritizes physicality, narrative depth ("Novels"), and art-directed visual impact over standard digital conventions.

## 1. Visual Specification

### The Canvas (Paper & Grain)

- **Base Surface:** Warm off-white (`oklch(0.985 0.008 60)`).
- **Texture:** A high-frequency grain overlay (`opacity 0.03`) to simulate physical paper stock.
- **The Hero Art:** Art-directed responsive photography.
  - **Desktop:** `hero-midnight.jpg` (Vintage microphone / record player, cinematic depth).
  - **Mobile:** `hero-crt.jpg` (CRT workstation, vertical intimacy).

### Typography (The Lyric Sheet)

- **Headings:** Bold, clean sans-serif (**Outfit**).
- **Body:** Highly readable serif (**Lora**).
- **Scale:**
  - Desktop uses large `clamp()` values (up to `124px`).
  - Mobile uses reduced floors (`32px`) to ensure headlines do not overflow or force excessive scrolling.
- **Margins:**
  - Desktop: `32px` frame inset.
  - Mobile: `16px` frame inset to maximize content area.

## 2. Interaction Specification (The Reveal)

### The Unfold (Desktop)

- **Mechanism:** A 3D "Hinge" interaction where the cover panels swing away along a Y-axis.
- **Physics:** Spring-based easing for tactile weight (see `src/utils/motion.ts`).
- **Trigger:** "Unfold" button or center seam lateral drag.

### The Record Release (Mobile)

- **Mechanism:** Tap-to-Reveal. Lateral drag is disabled to prevent conflict with browser system gestures.
- **Animation:** Panels slide up and fade out, simulating a record being pulled from its jacket.
- **Stability:** Uses `100dvh` for the fixed overlay to ensure consistent centering across all mobile browsers.

## 3. Component Architecture

### The Technical Novel (`.novel`)

- **Max-width:** `68ch` for optimal reading rhythm.
- **Styling:** Removes all "web" artifacts (no sidebars, no floating buttons).
- **Spacing:** Generous leading (`1.78`) and paragraph margins.

### The Side Ribbon

- **Design:** Vertical monospace text along the left margin.
- **Responsive:** Hidden on screens `< 900px` to focus entirely on the prose.

## 4. Accessibility & Performance

- **Motion Safety:** If `prefers-reduced-motion` is active, skip all 3D rotations in favor of simple fades and slides.
- **Narrative Accessibility:** Semantic heading hierarchy (`h1` → `h2` → `h3`) must be maintained even in long-form "Novel" pages.
- **Hardware Acceleration:** Uses `will-change: transform, opacity` and `backface-visibility: hidden` for smooth 3D performance on mobile.
- **Announcements:** State changes (opening the gatefold) are ARIA-announced for screen readers (see `src/layouts/GatefoldLayout.astro`).

## Key Implementation Files

| File                                    | Responsibility                                       |
| :-------------------------------------- | :--------------------------------------------------- |
| `src/layouts/GatefoldLayout.astro`      | Gatefold shell, ARIA announcer, hero art direction   |
| `src/layouts/BaseLayout.astro`          | Standard page shell with paper grain                 |
| `src/styles/gatefold.css`               | CSS variables, typography scale, gatefold animations |
| `src/utils/motion.ts`                   | Easing curves and duration constants                 |
| `src/components/home/SideAFooter.astro` | Side A footer with vinyl motif                       |
| `src/components/home/LinerNotes.astro`  | Liner notes component                                |

## Design Rationale

"High-fidelity is a feeling, not just a resolution." By moving to a physical model, we signal craft and intentionality. The mobile experience is optimized for ergonomics without sacrificing the core premium metaphor.

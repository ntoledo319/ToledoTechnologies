# Design Handoff: The Gatefold Studio

## Context

This redesign transforms Toledo Technologies into a "High-Fidelity Gatefold" experience. It prioritizes physicality, narrative depth ("Novels"), and intentional interactions over standard digital conventions.

## 1. Visual Specification

### The Canvas (Paper & Grain)

- **Base Surface:** Warm off-white (`oklch(0.98 0.01 45)`).
- **Texture:** A high-frequency grain overlay (`opacity 0.03`) to simulate paper stock.
- **The Hero:** Art-directed responsive photography.
  - **Desktop:** `hero-midnight.jpg` (Microphone).
  - **Mobile:** `hero-crt.jpg` (Workstation).

### Typography (The Lyric Sheet)

- **Headings:** Bold, clean sans-serif (e.g., Nunito/Outfit).
- **Body:** Highly readable serif (Lora).
- **Mobile Scale:** Reduce headline font-size floors to `32px` to prevent overflow and excessive scrolling on small screens.
- **Margins:** Desktop uses `32px` frame inset; Mobile uses `16px` to reclaim content space.

## 2. Interaction Specification (The Reveal)

### The Unfold (Desktop)

- **Mechanism:** A 3D "Hinge" interaction where panels swing along a Y-axis.
- **Physics:** Spring-based easing for tactile weight.

### The Record Release (Mobile)

- **Mechanism:** Tap-to-Reveal. Lateral drag is disabled to avoid browser gesture conflicts.
- **Animation:** Panels slide Up and Fade out (simulating a record being pulled from a sleeve).
- **Stability:** Use `100dvh` for the cover container to ensure perfect viewport centering regardless of mobile UI shifts.

### The Flip

- Moving between pages feels like flipping a physical page or sliding an insert out of a sleeve.

## 3. Accessibility Requirements

### Narrative Accessibility

- Content must be structured as a clean narrative. Headings must clearly follow the story arc.
- **Alt Text:** Abstract images must have evocative alt text (e.g., "A high-resolution macro photograph of soft light reflecting through textured glass, creating a warm, organic glow").

### Motion Safety

- If `prefers-reduced-motion` is active:
  - Skip the 3D hinge rotation.
  - Use a simple, horizontal "slide" or a soft fade to reveal content.

### Interaction

- The "Unfold" must be triggered by a standard button or keyboard event (`Enter`/`Space`).
- Interactive regions must have a minimum `44x44px` target size.

## 4. Content Direction (The Technical Novel)

- Avoid technical jargon in primary headings.
- Use narrative prose for services (e.g., instead of "Bug Fixes," use "The Art of the Rescue: How we stable a falling system").

---

## Design Rationale

"High-fidelity is a feeling, not just a resolution." By moving to a physical, gatefold-inspired model, we signal to our clients that we are a studio of craft and intentionality. The "Novel" content rewards the deep-thinking clients we want to attract.

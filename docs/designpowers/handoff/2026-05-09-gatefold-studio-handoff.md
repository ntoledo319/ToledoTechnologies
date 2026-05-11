# Design Handoff: The Gatefold Studio

## Context

This redesign transforms Toledo Technologies into a "High-Fidelity Gatefold" experience. It prioritizes physicality, narrative depth ("Novels"), and intentional interactions over standard digital conventions.

## 1. Visual Specification

### The Canvas (Paper & Grain)

- **Base Surface:** Warm off-white (`oklch(0.98 0.01 45)`).
- **Texture:** A high-frequency grain overlay (`opacity 0.03`) to simulate paper stock.
- **The Hero:** Ultra-high-resolution abstract photography. No vector art.

### Typography (The Lyric Sheet)

- **Headings:** Bold, clean sans-serif (e.g., Nunito/Outfit).
- **Body:** Highly readable serif or soft sans-serif (e.g., Lora or Inter).
- **Margins:** Generous. Body text should be centered with a max-width of `65ch` for reading comfort.

## 2. Interaction Specification (The Hinge)

### The Unfold

- **Mechanism:** A 3D "Hinge" interaction where the center image splits or a panel "opens" to reveal the content.
- **Physics:** Use spring-based easing (`damping: 20, stiffness: 100`).
- **States:**
  - `Closed`: Pure hero image, minimal typography.
  - `Unfolding`: Panels rotate along a Y-axis.
  - `Open`: Content "Insert" is fully visible.

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

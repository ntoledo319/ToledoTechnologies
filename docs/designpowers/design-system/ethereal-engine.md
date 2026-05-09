# Design System: The Ethereal Engine

## Core Philosophy

Toledo Technologies builds software. Our brand identity is "The Senior Dev"—direct, highly competent, slightly blunt. 

Previously, this was expressed through an austere, minimal, "sharp" aesthetic. The **Ethereal Engine** evolves this. We maintain the directness (no fluff, no SaaS jargon), but we wrap it in a high-craft, immersive, tactile environment. We prove our engineering capability not by being boring, but by building a web experience so technically and visually impressive that it serves as its own case study.

### The Five Pillars
1. **No Boxes. No Panels.** Structure comes from typography, whitespace, and horizontal rules—not from bordered containers, cards, or background panels. If it looks like a box, it doesn't ship.
2. **Real over Digital:** UI elements should feel physical. Shadows have volume, light has source and decay.
3. **Radical Contrast:** The site is not one place; it is a multiverse. Entering a new section (Services, Products, Nonprofit) should feel like a visceral leap into a new atmosphere.
4. **Accessibility as Art:** We do not bolt on high-contrast modes or reduced motion. The accessible versions of the site are designed to be as beautiful as the default experience.
5. **Direct but Welcoming:** The copy remains blunt and honest, but the visual language is "less sharp" (generous border radii, soft lighting).

---

## Design Tokens

All tokens are defined in `src/styles/global.css` using Tailwind v4 `@theme`.

### Typography
- **Headings (`font-mono`):** `JetBrains Mono`. We write code; our headings look like code.
- **Body (`font-sans`):** `Inter Variable` / system-sans. Highly legible, neutral.

### Shapes & Radii
We have moved away from sharp corners (`rounded-md`) to "Engine" radii, which feel more organic and welcoming.
- `--radius-engine`: `2rem` (Used for major structural sections and image containers)
- `--radius-engine-inner`: `1.5rem` (Used for input fields and small modules)
- `--radius-engine-pill`: `9999px` (Used for buttons and badges)

**The Box Ban:** There are no cards, panels, or bordered containers in this system. Content is structured through vertical rhythm (`section-padding`), horizontal rules (`border-white/5`), and typography hierarchy. The only exceptions are interactive buttons and input fields.

### Volumetric Shadows
Shadows in the Ethereal Engine are multi-layered to simulate real light decay, not just a simple drop shadow.
- `--shadow-engine-soft`: Subtle ambient shadow for buttons and small interactive elements.
- `--shadow-engine-focus`: Used for button hover states. Simulates lifting closer to the user.
- `--shadow-engine-glow`: A colored shadow that reads from `var(--realm-glow)`. Used for primary calls to action (CTAs) only.

### The OKLCH Color System
The engine uses OKLCH exclusively. This is critical for the "Multi-Realm" architecture. Because OKLCH separates Perceived Lightness (L) from Chroma (C) and Hue (H), we can programmatically swap the Hue of a realm's light source while guaranteeing the contrast ratio remains accessible.

**The Base Palette:**
- `surface`: A near-zero chroma steel blue-gray (`hue 220`). This is the industrial metal of the engine.
- `brand`: The core Toledo blue.
- `warm`: The "Forge Orange" accent.

---

## Building a New Realm

When Toledo Technologies launches a new initiative, it needs its own "Design World" (Realm). 

To create a new Realm:

1. **Choose an Atmosphere:** What is the emotional goal of the page? (e.g., a "Security" product might need a red/alert atmosphere).
2. **Define the Variables:** Pick OKLCH values for the three core variables.
   - `realmBg`: The deepest background color of the environment.
   - `realmGlow`: The intense, highly saturated color of the volumetric light.
   - `realmText`: The primary text color (usually near-white or near-black).
3. **Apply to BaseLayout:**
   ```astro
   <BaseLayout
     title="New Product"
     realmGlow="0.65 0.25 25" /* Intense Red */
     realmBg="0.10 0.05 20"   /* Dark Crimson */
     realmText="0.95 0.02 20" /* Pink-Tinted White */
   >
   ```
4. **Stay Boxless:** Do not use `bg-white/5`, `backdrop-blur`, `border`, or `shadow` on content containers. Structure is created through `divide-y`, generous padding, and type scale. Buttons and form inputs are the only elements that may have borders.

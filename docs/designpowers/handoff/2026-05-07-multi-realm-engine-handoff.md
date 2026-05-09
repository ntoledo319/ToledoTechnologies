# Design Handoff: The Multi-Realm Engine

## Purpose
This document provides the formal engineering specifications for the "Multi-Realm Engine," the new design system powering Toledo Technologies. It details how the engine creates immersive, 3D-feeling environments ("Realms") and how to implement new realms consistently.

## Global Engine Specifications

### 1. Volumetric Lighting (The Ethereal Core)
The engine relies on a mouse-tracking volumetric light source injected into the background.

**Visual Specification:**
- **Layer 1:** A `fixed`, `inset-0`, `pointer-events-none` container behind all content (`z-0`).
- **Light Source 1 (Soft Fill):** Radial gradient centered on `--mouse-x` and `--mouse-y`. Color is `oklch(var(--realm-glow) / 0.08)`, fading to transparent at `50%`.
- **Light Source 2 (Wide Bloom):** Radial gradient centered on `--mouse-x` and `--mouse-y`. Color is `oklch(var(--realm-glow) / 0.03)`, fading to transparent at `80%`.

**Interaction Specification:**
- Mouse movement updates `--mouse-x` and `--mouse-y` CSS variables on the `:root` element as percentages (0-100%).
- Transitions into new realms update the `--realm-glow` variable, causing the light to smoothly change color.

**Accessibility Requirements:**
- The background light is strictly decorative (`aria-hidden="true"`).
- Contrast ratios for all foreground text must exceed 4.5:1 *against the brightest point of the light bloom*.

### 2. Tactile Surfaces (Cards & Containers)
Cards are no longer flat. They are physical objects floating in the engine's light.

**Visual Specification:**
- **Base State:** `bg-white/5` (or `bg-white/80` in light realms), `backdrop-blur-sm`, `rounded-engine` (2rem), `shadow-engine-soft`.
- **Borders:** Subtle translucent borders (e.g., `border-white/10`).

**Interaction Specification (Hover):**
- **Physical Lift:** `-translate-y-1` on hover.
- **Shadow Focus:** Transitions to `shadow-engine-focus` (deeper, more concentrated).
- **Glow Reaction:** If interactive, borders react to the realm's accent color (e.g., `hover:border-warm-500/50`).
- **Duration:** All card transitions use `duration-500` to feel "weighted" and physical, not snappy.

**Accessibility Requirements:**
- Lift effects must be disabled or significantly reduced if `@media (prefers-reduced-motion: reduce)` is active.
- Click targets must remain large and distinct regardless of the hover state.

---

## Realm Specifications

A "Realm" is defined by three core CSS variables injected into the `<body style={...}>`:
1. `--realm-glow`: The color of the volumetric light and interactive accents (format: `L C H`).
2. `background-color`: The base environmental color.
3. `color`: The base text color.

### The Sales Realm (Home)
- **Atmosphere:** Deep space, high-contrast, bold.
- **Realm Glow:** `0.62 0.16 35` (Warm Forge Orange)
- **Background:** `oklch(0.15 0.01 220)` (Deep Graphite)
- **Text:** `oklch(0.98 0.01 220)` (Near White)

### The Products Realm (Codebases)
- **Atmosphere:** Technical, focused, deep.
- **Realm Glow:** `0.64 0.17 190` (Cyan / Electric Blue)
- **Background:** `oklch(0.12 0.01 220)` (Obsidian)
- **Text:** `oklch(0.98 0.01 220)` (Near White)

### The Services Realm
- **Atmosphere:** Professional, high-end, mysterious.
- **Realm Glow:** `0.66 0.20 280` (Deep Violet)
- **Background:** `oklch(0.10 0.01 240)` (Midnight Purple)
- **Text:** `oklch(0.98 0.01 240)` (Near White)

### The Portfolio Realm
- **Atmosphere:** Archival, dense, proven.
- **Realm Glow:** `0.75 0.15 140` (Matrix Green)
- **Background:** `oklch(0.10 0.02 160)` (Deep Forest)
- **Text:** `oklch(0.98 0.02 160)` (Near White)

### The Nonprofit Realm (Daedalus Landed)
- **Atmosphere:** Humane, organic, warm.
- **Realm Glow:** `0.72 0.14 40` (Warm Amber)
- **Background:** `oklch(0.98 0.01 45)` (Paper White)
- **Text:** `inherit` (Dark Graphite `text-surface-900`)

---

## View Transitions (The Leap)

Moving between realms requires a visual "Leap." We use Astro's `<ViewTransitions />`.

**Interaction Specification:**
- The `<body class="transition-colors duration-1000">` ensures the background color fades smoothly over 1 second.
- The `#realm-wrapper` handles the cross-fade of the main content layout.
- The `#engine-light` smoothly interpolates the new `--realm-glow` color over 1 second.

**Accessibility Requirements:**
- View Transitions automatically respect `prefers-reduced-motion` in Astro, reverting to instantaneous changes. Do not override this safety feature.

---

## Design Rationale & Trade-offs

- **Why Translucent Backgrounds (`bg-white/5`) instead of solid colors?**
  To allow the volumetric lighting to pass *behind* the cards, reinforcing the 3D space. Solid colors break the illusion of depth.
- **Why `oklch` for everything?**
  OKLCH provides perceptually uniform lightness, meaning when we swap the `--realm-glow` hue from Orange to Cyan, the perceived brightness of the light bloom remains exactly the same, preventing accessibility contrast failures.

---

## Accessibility Testing Checklist

### Visual & Contrast
- [ ] Verify text contrast is 4.5:1 against the brightest part of the `--realm-glow` background.
- [ ] Ensure translucent cards (`bg-white/5`) do not cause text to fail contrast when hovering over the light source.

### Motion
- [ ] Enable `prefers-reduced-motion` in OS.
- [ ] Verify View Transitions fallback to instant page loads.
- [ ] Verify volumetric lighting is static (or disabled entirely) when reduced motion is active.

### Keyboard & Screen Reader
- [ ] Tab through the complex pricing tables (Performance Audit). Ensure visual order matches DOM order.
- [ ] Verify that the `aria-hidden="true"` on `#engine-light` effectively hides the entire decorative lighting rig from assistive tech.

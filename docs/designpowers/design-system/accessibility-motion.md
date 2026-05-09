# Accessibility & Motion in the Ethereal Engine

Accessibility is not a compliance checklist; it is a core design principle of the Ethereal Engine ("Accessibility as Art"). The engine is highly immersive, utilizing 3D lighting, blur effects, and large-scale color shifts. This document outlines how we ensure this immersion does not become a barrier.

## 1. Contrast in a Dynamic Environment

Because the `var(--realm-glow)` light source moves with the user's mouse, the background color behind text is constantly shifting. 

**The OKLCH Guarantee:**
We use OKLCH colors for all realm lighting. The `L` (Lightness) value of the glow is strictly controlled (never exceeding `0.75` in dark realms). By locking the perceived lightness, we guarantee that white text (`oklch(0.98 ...)`) will always maintain a minimum 4.5:1 contrast ratio, regardless of where the user moves their mouse or what color the realm is.

**Text Overlays:**
In areas where the light bloom is most intense, or inside translucent cards (`bg-white/5`), we utilize `backdrop-blur-sm` and subtle borders (`border-white/10`). This creates a physical separation that helps the eye distinguish text from the moving light behind it.

## 2. Motion Sensitivity & Vestibular Safety

The Ethereal Engine relies on motion (volumetric light tracking, physical card lifts, view transitions). For users with vestibular disorders, this motion can cause nausea or dizziness.

**Implementation Rules:**
1. **Volumetric Light Tracking:** 
   The Javascript powering the mouse-tracking light *must* be disabled or clamped if the user prefers reduced motion.
   *(Note: This requires a JS `window.matchMedia('(prefers-reduced-motion: reduce)')` check in the initialization script).*
2. **Card Lifts:**
   The `-translate-y-1` hover effect on cards (`.card-interactive`) should be wrapped in a media query to disable the physical lift, relying instead solely on the shadow/border change for interactive feedback.
3. **View Transitions (The Leap):**
   Astro's `<ViewTransitions />` automatically respects the OS-level reduced motion preference, replacing cross-fades and slides with instant DOM swaps. We do not override this default behavior.

## 3. Cognitive Accessibility

"The Leap" (drastic color changes between pages) is a core feature, but it can be disorienting.

**Wayfinding Mechanisms:**
To ensure users always know they are on the Toledo Technologies site and understand where they are:
1. **The Header:** The header is sticky, globally consistent, and maintains the exact same layout and branding across all realms.
2. **Breadcrumbs:** Every realm page begins with a highly visible `Breadcrumbs` component.
3. **Typography:** While colors change, the typography (`JetBrains Mono` and `Inter Variable`) is strictly consistent across the entire site, providing a cognitive anchor.

## 4. Semantic Integrity

Despite the complex visual presentation, the underlying HTML must remain pristine.
- The volumetric lighting `div` is marked `aria-hidden="true"` and `pointer-events-none`. It does not exist to screen readers.
- All "cards" are semantic `<a>` tags or `<article>` wrappers with proper heading hierarchies (`h1` -> `h2` -> `h3`). We do not use `div` elements with click handlers.
- The "Skip to content" link remains the very first element in the DOM, heavily styled to match the Ethereal Engine when focused.

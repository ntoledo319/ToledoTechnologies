/**
 * Gatefold Studio — Motion Physics
 *
 * Spring-based easing and interaction utilities.
 * Design handoff specifies: damping: 20, stiffness: 100
 */

export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass?: number;
}

export const defaultSpring: SpringConfig = {
  damping: 20,
  stiffness: 100,
  mass: 1
};

/**
 * Approximates spring physics with a CSS cubic-bezier.
 * Derived from damping: 20, stiffness: 100 with slight overshoot
 * for a tactile, physical feel.
 */
export function springBezier(config: SpringConfig = defaultSpring): string {
  // Slight overshoot (back easing) makes the hinge feel physical
  return 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
}

/**
 * Gentler spring for subtle micro-interactions.
 */
export function microSpringBezier(): string {
  return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
}

/**
 * Easing for reduced-motion preference.
 */
export const reducedMotionEase = 'cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * Duration for gatefold open/close in milliseconds.
 */
export const gatefoldDuration = 1400;

/**
 * Duration for reduced-motion gatefold in milliseconds.
 */
export const reducedMotionDuration = 600;

/**
 * Announce state changes to screen readers via a live region.
 */
export function announceToScreenReader(message: string): void {
  const announcer = document.getElementById('sr-announcer');
  if (announcer) {
    announcer.textContent = message;
    // Clear after the screen reader has had time to announce
    setTimeout(() => {
      announcer.textContent = '';
    }, 1200);
  }
}

/**
 * Check if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Keyboard handler for the unfold action.
 * Triggers on Enter or Space.
 */
export function handleUnfoldKeydown(
  event: KeyboardEvent,
  onTrigger: () => void
): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onTrigger();
  }
}

/**
 * Compute a dynamic hinge shadow based on panel rotation intensity.
 * Intensity is 0 (closed) to 1 (fully open).
 */
export function hingeShadow(intensity: number): string {
  const blur = Math.round(intensity * 48);
  const spread = Math.round(intensity * 12);
  const opacity = Math.min(intensity * 0.35, 0.45);
  return `0 0 ${blur}px ${spread}px oklch(0.15 0.03 45 / ${opacity})`;
}

/**
 * Spring-animated scroll to an element.
 */
export function springScrollTo(
  target: HTMLElement | number,
  duration: number = 800
): void {
  const startY = window.scrollY;
  const targetY =
    typeof target === 'number'
      ? target
      : target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeOutBack(t: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = prefersReducedMotion() ? progress : easeOutBack(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Pure render for <pura-motion>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function motionTemplate(el = EMPTY_SHIM) {
  const html = `<div class="content" part="content"><slot></slot></div>`;
  return { html, css: MOTION_CSS };
}

// Enter/exit is pure CSS. The host's `show` attribute is the only switch:
//   present  -> content visible (opacity 1, no transform, display in flow)
//   absent   -> content gone    (opacity 0, offset transform, display: none)
// Because `display` is part of the transition with `allow-discrete`, the box
// stays in layout through the exit animation and only collapses at the end, and
// flips into flow at the start of the enter animation. No @starting-style, so a
// server-rendered `show` snaps to visible with no hydration flash; the animation
// only runs when `show` is toggled at runtime (same model as the overlays).
//
// The per-animation offset lives in one custom property (--_m-from) so the
// hidden state declares it once. All durations route through var(--pura-motion)
// is unnecessary here: the whole motion block is gated on no-preference, so
// reduced-motion users get an instant display swap with zero transition.
export const MOTION_CSS = `
  :host { display: block; --_m-from: none; }
  :host([animation="slide-up"])    { --_m-from: translateY(var(--pura-space-4)); }
  :host([animation="slide-down"])  { --_m-from: translateY(calc(-1 * var(--pura-space-4))); }
  :host([animation="slide-left"])  { --_m-from: translateX(var(--pura-space-4)); }
  :host([animation="slide-right"]) { --_m-from: translateX(calc(-1 * var(--pura-space-4))); }
  :host([animation="scale"])       { --_m-from: scale(0.95); }
  :host([animation="fade-slide"])  { --_m-from: translateY(var(--pura-space-3)); }

  .content { will-change: opacity, transform; }

  /* Unconditional hidden state: content is removed from layout when not shown,
     so reduced-motion users still get a clean instant show/hide. */
  :host(:not([show])) .content { display: none; }

  @media (prefers-reduced-motion: no-preference) {
    .content {
      opacity: 1;
      transform: none;
      transition:
        opacity var(--pura-motion-duration, var(--pura-duration-3))
          var(--pura-motion-ease, var(--pura-ease-standard)),
        transform var(--pura-motion-duration, var(--pura-duration-3))
          var(--pura-motion-ease, var(--pura-ease-standard)),
        display var(--pura-motion-duration, var(--pura-duration-3)) allow-discrete;
    }

    :host(:not([show])) .content {
      opacity: 0;
      transform: var(--_m-from);
    }
  }
`;

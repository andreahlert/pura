// Pure render for <pura-motion>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function motionTemplate(el = EMPTY_SHIM) {
  const html = `<div class="content" part="content"><slot></slot></div>`;
  return { html, css: MOTION_CSS };
}

// Enter/exit is pure CSS. The host's `show` attribute is the only switch:
//   present  -> content visible (opacity 1, no transform, display in flow)
//   absent   -> content gone    (opacity 0, offset transform, display: none)
// The full native "four states" recipe drives it:
//   - `display ... allow-discrete` keeps the box in layout through the exit fade
//     and flips it into flow at the start of the enter fade.
//   - `@starting-style` supplies the enter start values, which is REQUIRED: an
//     element leaving display:none has no before-state, so without it the enter
//     would snap (only exit would animate).
//   - the transition is armed only once the host has `data-motion-ready` (set by
//     JS on the first frame). So an element rendered already-`show` snaps to
//     visible with no load flash; the animation runs only on a later toggle.
//
// The per-animation offset lives in one custom property (--_m-from). The whole
// motion block is gated on no-preference, so reduced-motion users get an instant
// display swap with zero transition.
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
    .content { opacity: 1; transform: none; }

    :host([data-motion-ready]) .content {
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

    @starting-style {
      :host([show][data-motion-ready]) .content {
        opacity: 0;
        transform: var(--_m-from);
      }
    }
  }
`;

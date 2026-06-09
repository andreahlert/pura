// Pure render for <pura-border-beam>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function borderBeamTemplate(el = EMPTY_SHIM) {
  // A comet of light travels the host border via offset-path: border-box,
  // tracing the rounded perimeter. The slot carries the wrapped content; the
  // ::after pseudo-element is the beam. All motion is CSS, so the server paints
  // a static frame and the client animates with no runtime tweening.
  const html = `<slot></slot>`;
  return { html, css: BORDER_BEAM_CSS };
}

export const BORDER_BEAM_CSS = `
  :host {
    position: relative;
    display: block;
    border-radius: var(--pura-border-beam-radius, var(--pura-radius, 12px));
  }

  :host::after {
    content: "";
    position: absolute;
    aspect-ratio: 1;
    width: var(--pura-border-beam-size, 64px);
    /* Trace the rounded border of the host. */
    offset-path: border-box;
    offset-distance: var(--pura-border-beam-offset, 0%);
    background: linear-gradient(
      to left,
      var(--pura-border-beam-from, var(--pura-primary, #6366f1)),
      var(--pura-border-beam-to, var(--pura-accent, #d946ef)),
      transparent
    );
    border-radius: var(--pura-radius-full, 999px);
    filter: blur(2px);
    opacity: var(--pura-border-beam-opacity, 0.9);
    pointer-events: none;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       beam comes to rest with no separate guard. */
    animation: pura-border-beam-travel
      var(--pura-border-beam-duration, 5s) linear infinite;
    animation-delay: var(--pura-border-beam-delay, 0s);
  }

  @keyframes pura-border-beam-travel {
    to { offset-distance: 100%; }
  }
`;

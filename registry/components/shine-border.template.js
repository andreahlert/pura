// Pure render for <pura-shine-border>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function shineBorderTemplate(el = EMPTY_SHIM) {
  // A conic sheen rotates around the rounded border of the slotted content, in
  // the style of Magic UI's Shine Border. The ring is a ::before painted with a
  // conic-gradient and clipped to the border via a mask-composite trick; the
  // angle is animated with an @property keyframe, so the server paints a static
  // sheen and the client rotates it. No animation runtime.
  const html = `<slot></slot>`;
  return { html, css: SHINE_BORDER_CSS };
}

export const SHINE_BORDER_CSS = `
  @property --pura-shine-angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }

  :host {
    position: relative;
    display: block;
    border-radius: var(--pura-shine-border-radius, 12px);
  }

  :host::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: var(--pura-shine-border-width, 1.5px);
    background: conic-gradient(
      from var(--pura-shine-angle),
      transparent 0%,
      var(--pura-shine-border-color, var(--pura-primary, #6366f1)) 10%,
      var(--pura-shine-border-color-2, var(--pura-accent, #d946ef)) 18%,
      transparent 30%,
      transparent 100%
    );
    /* Border trick: paint the full box, then punch out the inner content-box so
       only the padding ring (the border) shows. */
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       sheen rests statically with no separate guard. */
    animation: pura-shine-border-spin var(--pura-shine-border-duration, 4s) linear infinite;
  }

  @keyframes pura-shine-border-spin {
    to { --pura-shine-angle: 360deg; }
  }
`;

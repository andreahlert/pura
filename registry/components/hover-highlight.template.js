// Pure render for <pura-hover-highlight>. No DOM; safe on server (SSR/DSD)
// and client. A single highlight rectangle slides and resizes from one item
// to another as hover moves (Vercel docs style). The highlight is an absolute
// shadow element kept behind the slotted items (the items get z-index above
// it); geometry moves are driven by the element through WAAPI, the CSS here
// only handles the fade in/out.
//
// SSR / pre-JS: the items render normally, the highlight stays invisible.
// Reduced motion: the fade transition is disabled (and the element skips the
// slide animation), so the highlight just appears on the hovered item.
import { EMPTY_SHIM } from "../base.js";

export function hoverHighlightTemplate(el = EMPTY_SHIM) {
  const html =
    `<div class="highlight" part="highlight" aria-hidden="true"></div>` +
    `<slot></slot>`;

  const css = `
    :host {
      display: block;
      position: relative;
    }
    .highlight {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      z-index: 0;
      opacity: 0;
      pointer-events: none;
      background: var(--pura-hover-highlight-bg, color-mix(in srgb, var(--pura-fg, #18181b) 8%, transparent));
      border-radius: var(--pura-hover-highlight-radius, 0.5rem);
      transition: opacity var(--pura-hover-highlight-fade, 180ms) ease;
      will-change: top, left, width, height;
    }
    .highlight.show { opacity: 1; }

    /* the items paint above the highlight */
    ::slotted(*) {
      position: relative;
      z-index: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .highlight { transition: none; }
    }
  `;

  return { html, css };
}

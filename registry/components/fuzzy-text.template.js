// Pure render for <pura-fuzzy-text>. No DOM; safe on server (SSR/DSD) and client.
// TV-static fuzzy text: a canvas layer (driven by client JS) redraws horizontal
// slices of the glyphs with per-frame sideways jitter. The slotted original text
// is the accessible copy and the entire SSR / pre-JS paint, so the page reads
// perfectly with no script. Once the client has measured and drawn the canvas it
// sets data-pura-fuzzy-ready on the host, which swaps the visible layer to the
// canvas (aria-hidden) and visually hides, but keeps readable, the real text.
// Reduced motion never swaps: the plain static text stays visible.
import { EMPTY_SHIM } from "../base.js";

export function fuzzyTextTemplate(el = EMPTY_SHIM) {
  const html = `<canvas class="canvas" part="canvas" aria-hidden="true"></canvas><span class="text" part="text"><slot></slot></span>`;
  return { html, css: FUZZY_TEXT_CSS };
}

export const FUZZY_TEXT_CSS = `
  :host {
    display: inline-block;
    vertical-align: bottom;
  }

  .canvas { display: none; }
  .text { display: inline-block; }

  /* The canvas enhancement only ever shows when motion is allowed. Under
     prefers-reduced-motion: reduce this block never applies, so the host keeps
     the plain, static, fully readable text even if JS already marked it ready. */
  @media (prefers-reduced-motion: no-preference) {
    :host([data-pura-fuzzy-ready]) .canvas { display: block; }
    :host([data-pura-fuzzy-ready]) .text {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
  }
`;

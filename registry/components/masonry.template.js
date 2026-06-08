// Pure render for <pura-masonry>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function masonryTemplate(el = EMPTY_SHIM) {
  const html = `<div part="masonry" class="masonry" role="none"><slot></slot></div>`;
  return { html, css: MASONRY_CSS };
}

export const MASONRY_CSS = `
  :host { display: block; }

  .masonry {
    /* Native CSS multi-column flow. column-width (responsive) OR column-count
       (fixed, set via --pura-masonry-count) decides the layout. */
    column-width: var(--pura-masonry-min, 16rem);
    column-count: var(--pura-masonry-count, auto);
    column-gap: var(--pura-masonry-gap, var(--pura-space-4));
  }

  /* Each slotted item is a column item: keep it whole, and add vertical rhythm
     equal to the gap so rows breathe like the columns do. inline-block + width
     100% makes break-inside reliable across engines. */
  ::slotted(*) {
    display: inline-block;
    width: 100%;
    margin: 0 0 var(--pura-masonry-gap, var(--pura-space-4));
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
  }
`;

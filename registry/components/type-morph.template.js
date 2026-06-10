// Pure render for <pura-type-morph>. No DOM; safe on server (SSR/DSD) and client.
// The slotted text inherits the animated variable-font axes through the flat tree,
// so the letters physically thicken (font-weight -> wght) and widen
// (font-stretch -> wdth) as the values interpolate. We drive the axes with the
// native, natively-animatable font-weight / font-stretch properties rather than
// font-variation-settings: Chromium does not re-rasterize a glyph when an *animated*
// value reaches font-variation-settings through var(), but font-weight / font-stretch
// always re-render. Scrub variant is a scroll-driven timeline (no per-frame JS);
// view/load variants transition the same two properties. Before JS (and on the
// server) the text sits at its from-axes, fully readable.
import { EMPTY_SHIM } from "../base.js";

export function typeMorphTemplate(el = EMPTY_SHIM) {
  const html = `<span class="content" part="content"><slot></slot></span>`;
  return { html, css: TYPE_MORPH_CSS };
}

export const TYPE_MORPH_CSS = `
  :host {
    display: block;
    --pura-tm-dur: 0.8s;
    --pura-tm-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    font-weight: var(--pura-tm-from-wght, 400);
    font-stretch: calc(var(--pura-tm-from-wdth, 100) * 1%);
  }
  .content {
    font: inherit;
    font-weight: inherit;
    font-stretch: inherit;
  }

  /* view / load: transition weight + width from -> to. */
  :host([data-pura-tm-anim]) {
    transition:
      font-weight var(--pura-tm-dur) var(--pura-tm-ease),
      font-stretch var(--pura-tm-dur) var(--pura-tm-ease);
  }
  :host([data-pura-tm-in]) {
    font-weight: var(--pura-tm-to-wght, 800);
    font-stretch: calc(var(--pura-tm-to-wdth, 100) * 1%);
  }

  @keyframes pura-type-morph {
    to {
      font-weight: var(--pura-tm-to-wght, 800);
      font-stretch: calc(var(--pura-tm-to-wdth, 100) * 1%);
    }
  }

  /* scrub: tie weight + width 1:1 to a scroll-driven timeline, reversible, no JS frame. */
  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-tm-scrub]) {
        animation: pura-type-morph linear both;
        animation-timeline: var(--pura-tm-timeline, view());
        animation-range: var(--pura-tm-range, cover 0% cover 50%);
      }
    }
  }

  /* Reduced motion: never scrub. Land at the morph's destination so the text reads
     at its intended emphasis weight instead of being pinned at a hairline from-axis. */
  @media (prefers-reduced-motion: reduce) {
    :host([data-pura-tm-scrub]) {
      font-weight: var(--pura-tm-to-wght, 800);
      font-stretch: calc(var(--pura-tm-to-wdth, 100) * 1%);
    }
  }
`;

// Pure render for <pura-text-morph>. No DOM; safe on server (SSR/DSD) and client.
// Two stacked, aria-hidden text layers sit under an SVG alpha-threshold filter
// (feColorMatrix snaps soft alpha to hard edges) plus a tiny softening blur:
// while one layer blurs out and the other blurs in, the thresholded overlap
// reads as a single fused blob, the classic gooey melt. The slotted original
// text is both the accessible copy and the pre-JS paint: before the client
// upgrades (and on the server) only the slot is visible, so the first phrase
// renders sharp with zero script. Once JS fills the layers it sets
// data-pura-text-morph-ready on the host, which flips visibility to the
// animated copy and visually hides (but keeps readable) the original.
// Reduced motion: the morph layers stay hidden and the plain slotted text
// stands as the settled state.
import { EMPTY_SHIM } from "../base.js";

export function textMorphTemplate(el = EMPTY_SHIM) {
  const html = `
    <span class="morph" part="morph" aria-hidden="true">
      <span class="layer" part="text" data-layer="0"></span>
      <span class="layer" part="text" data-layer="1"></span>
    </span>
    <span class="a11y" part="a11y"><slot></slot></span>
    <svg class="defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="pura-text-morph-threshold">
          <feColorMatrix in="SourceGraphic" type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
        </filter>
      </defs>
    </svg>
  `;

  const css = `
    :host {
      display: inline-block;
      position: relative;
      --pura-text-morph-smoothing: 0.6px;
    }

    /* Gooey threshold: snap the children's blurred alpha into one fused shape,
       then soften the snapped edge a hair so it does not look aliased. */
    .morph {
      display: none;
      filter: url(#pura-text-morph-threshold) blur(var(--pura-text-morph-smoothing, 0.6px));
    }
    :host([data-pura-text-morph-ready]) .morph { display: grid; }

    /* Both layers share the same grid cell so phrases of different lengths
       stack perfectly and the host sizes to the widest one. */
    .layer {
      grid-area: 1 / 1;
      will-change: filter, opacity;
    }
    .layer[data-layer="1"] { opacity: 0; }

    /* Once the animated copy is live, keep the original readable for AT but
       visually hidden (same move as pura-split). */
    :host([data-pura-text-morph-ready]) .a11y {
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

    .defs {
      position: absolute;
      width: 0;
      height: 0;
      overflow: hidden;
    }

    /* Reduced motion: never melt. Hide the animated layers entirely and let the
       plain slotted text stand, even if JS already flipped the ready flag. */
    @media (prefers-reduced-motion: reduce) {
      .morph { display: none !important; }
      :host([data-pura-text-morph-ready]) .a11y {
        position: static;
        width: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        clip-path: none;
        white-space: inherit;
      }
    }
  `;

  return { html, css };
}

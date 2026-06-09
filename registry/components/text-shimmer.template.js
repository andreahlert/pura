// Pure render for <pura-text-shimmer>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function textShimmerTemplate(el = EMPTY_SHIM) {
  // A bright band sweeps across the slotted text via a moving gradient clipped
  // to the glyphs (background-clip: text). Pure CSS @keyframes; the server paints
  // the base color and the client animates the sweep.
  const html = `<span class="shimmer" part="text"><slot></slot></span>`;
  return { html, css: TEXT_SHIMMER_CSS };
}

export const TEXT_SHIMMER_CSS = `
  :host {
    display: inline-block;
  }

  .shimmer {
    background: linear-gradient(
      90deg,
      var(--pura-text-shimmer-base, var(--pura-muted-fg, #71717a)) 0%,
      var(--pura-text-shimmer-base, var(--pura-muted-fg, #71717a)) 40%,
      var(--pura-text-shimmer-highlight, var(--pura-fg, #fafafa)) 50%,
      var(--pura-text-shimmer-base, var(--pura-muted-fg, #71717a)) 60%,
      var(--pura-text-shimmer-base, var(--pura-muted-fg, #71717a)) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       sweep freezes and the text shows in the base color with no separate guard. */
    animation: pura-text-shimmer-sweep var(--pura-text-shimmer-duration, 3s) linear infinite;
  }

  @keyframes pura-text-shimmer-sweep {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
  }
`;

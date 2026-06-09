// Pure render for <pura-retro-grid>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function retroGridTemplate(el = EMPTY_SHIM) {
  // A tilted, perspective grid floor whose lines converge at a horizon and
  // scroll toward the viewer, evoking an 80s synthwave floor (Magic UI's Retro
  // Grid). Motion is one CSS @keyframes background-position scroll, so the
  // server paints a static floor and the client animates.
  const html = `<span class="grid" part="grid" aria-hidden="true"><span class="plane" part="plane"></span></span><slot></slot>`;
  return { html, css: RETRO_GRID_CSS };
}

export const RETRO_GRID_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
    isolation: isolate;
  }

  .grid {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    perspective: var(--pura-retro-grid-perspective, 240px);
    perspective-origin: 50% 0%;
    overflow: hidden;
    opacity: var(--pura-retro-grid-opacity, 0.7);
  }

  .plane {
    position: absolute;
    /* The floor occupies the lower half and recedes upward to a horizon at the
       vertical centre. transform-origin at the bottom keeps near rows large and
       far rows compressed, so lines visibly converge. */
    left: -50%;
    bottom: 0;
    width: 200%;
    height: 100%;
    transform-origin: 50% 100%;
    transform: rotateX(var(--pura-retro-grid-angle, 60deg));
    background-image:
      linear-gradient(to right, var(--pura-retro-grid-line, var(--pura-primary, #a855f7)) 1px, transparent 0),
      linear-gradient(to bottom, var(--pura-retro-grid-line, var(--pura-primary, #a855f7)) 1px, transparent 0);
    background-size: var(--pura-retro-grid-cell, 44px) var(--pura-retro-grid-cell, 44px);
    /* Fade the far edge (top) into the horizon so the floor blends into the bg. */
    -webkit-mask-image: linear-gradient(to top, #000 10%, transparent 85%);
    mask-image: linear-gradient(to top, #000 10%, transparent 85%);
    /* base.js RESET collapses animation-duration under reduced motion, so the
       grid holds still with no separate guard. */
    animation: pura-retro-grid-scroll var(--pura-retro-grid-duration, 6s) linear infinite;
  }

  @keyframes pura-retro-grid-scroll {
    to { background-position: 0 var(--pura-retro-grid-cell, 44px); }
  }
`;

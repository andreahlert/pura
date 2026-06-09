// Pure render for <pura-retro-grid>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function retroGridTemplate(el = EMPTY_SHIM) {
  // A tilted, perspective grid plane whose lines scroll toward the viewer,
  // evoking an 80s synthwave floor (Magic UI's Retro Grid). Motion is one CSS
  // @keyframes background-position scroll, so the server paints a static grid
  // and the client animates.
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
    perspective: var(--pura-retro-grid-perspective, 200px);
    opacity: var(--pura-retro-grid-opacity, 0.5);
    /* Fade the far edge so the plane recedes into the background. */
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 35%);
    mask-image: linear-gradient(to bottom, transparent, #000 35%);
  }

  .plane {
    position: absolute;
    left: -50%;
    top: 0;
    width: 200%;
    height: 200%;
    transform-origin: top center;
    transform: rotateX(var(--pura-retro-grid-angle, 65deg));
    background-image:
      linear-gradient(to right, var(--pura-retro-grid-line, var(--pura-primary, #6366f1)) 1px, transparent 0),
      linear-gradient(to bottom, var(--pura-retro-grid-line, var(--pura-primary, #6366f1)) 1px, transparent 0);
    background-size: var(--pura-retro-grid-cell, 60px) var(--pura-retro-grid-cell, 60px);
    /* base.js RESET collapses animation-duration under reduced motion, so the
       grid holds still with no separate guard. */
    animation: pura-retro-grid-scroll var(--pura-retro-grid-duration, 18s) linear infinite;
  }

  @keyframes pura-retro-grid-scroll {
    to { background-position: 0 var(--pura-retro-grid-cell, 60px); }
  }
`;

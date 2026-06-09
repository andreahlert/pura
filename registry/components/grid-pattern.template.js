// Pure render for <pura-grid-pattern>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function gridPatternTemplate(el = EMPTY_SHIM) {
  // A tiled grid sits behind slotted content, with a glowing patch that sweeps
  // across it, in the style of Magic UI's (Animated) Grid Pattern. A dim base
  // grid is always visible; a brighter copy is revealed through a moving radial
  // mask. Motion is one pure CSS @keyframes on the mask position, so the server
  // paints a static grid and the client animates the sweep. No animation runtime.
  const dots = el.hasAttribute("dots");
  const html =
    `<span class="lines base${dots ? " dots" : ""}" part="grid" aria-hidden="true"></span>` +
    `<span class="lines spot${dots ? " dots" : ""}" part="spot" aria-hidden="true"></span>` +
    `<slot></slot>`;
  return { html, css: GRID_PATTERN_CSS };
}

export const GRID_PATTERN_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .lines {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(to right, var(--pura-grid-line, color-mix(in oklab, var(--pura-fg, #71717a) 16%, transparent)) 1px, transparent 0),
      linear-gradient(to bottom, var(--pura-grid-line, color-mix(in oklab, var(--pura-fg, #71717a) 16%, transparent)) 1px, transparent 0);
    background-size: var(--pura-grid-cell, 40px) var(--pura-grid-cell, 40px);
  }

  /* Dot variant: a single radial-dot tile instead of crossed lines. */
  .lines.dots {
    background-image:
      radial-gradient(var(--pura-grid-line, color-mix(in oklab, var(--pura-fg, #71717a) 22%, transparent)) 1.2px, transparent 1.3px);
    background-position: center;
  }

  .base { opacity: var(--pura-grid-opacity, 0.5); }

  /* Brighter grid revealed only through a moving radial mask = a sweeping glow. */
  .spot {
    --pura-grid-line: var(--pura-grid-glow, var(--pura-primary, #6366f1));
    opacity: var(--pura-grid-glow-opacity, 0.9);
    -webkit-mask: radial-gradient(circle at center, #000 0%, transparent 70%);
    mask: radial-gradient(circle at center, #000 0%, transparent 70%);
    -webkit-mask-size: var(--pura-grid-spot, 260px) var(--pura-grid-spot, 260px);
    mask-size: var(--pura-grid-spot, 260px) var(--pura-grid-spot, 260px);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       glow rests in one spot with no separate guard. */
    animation: pura-grid-sweep var(--pura-grid-duration, 9s) ease-in-out infinite alternate;
  }

  @keyframes pura-grid-sweep {
    0%   { -webkit-mask-position: 0% 0%;    mask-position: 0% 0%; }
    33%  { -webkit-mask-position: 100% 30%; mask-position: 100% 30%; }
    66%  { -webkit-mask-position: 20% 100%; mask-position: 20% 100%; }
    100% { -webkit-mask-position: 90% 80%;  mask-position: 90% 80%; }
  }
`;

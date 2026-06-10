// Pure render for <pura-starfield>. No DOM; safe on server (SSR/DSD) and
// client. The server paints a dark space backdrop with a deterministic static
// star field (gently twinkling via CSS) plus an empty canvas; client JS takes
// the canvas over with the live hyperspace projection and hides the static
// field. Without JS the page still shows a presentable night sky.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index scatter so server and client paint byte-identically
// (no Math.random, which would diverge between renders).
function starStyle(i) {
  const left = (i * 53) % 100; // spread horizontally
  const top = ((i * 29) + 7) % 100; // spread vertically
  const size = 1 + ((i * 7) % 3); // 1..3 px
  const opacity = (4 + ((i * 13) % 6)) / 10; // 0.4..0.9
  const delay = ((i * 0.61) % 4).toFixed(2);
  return `left:${left}%;top:${top}%;width:${size}px;height:${size}px;--pura-star-opacity:${opacity};animation-delay:${delay}s`;
}

export function starfieldTemplate(el = EMPTY_SHIM) {
  const raw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 400) : 200;
  // the static SSR field stays light: a subset reads as a full sky
  const fieldCount = Math.min(count, 160);
  let stars = "";
  for (let i = 0; i < fieldCount; i++) {
    stars += `<span class="star" part="star" style="${starStyle(i)}"></span>`;
  }
  const html =
    `<span class="field" part="field" aria-hidden="true">${stars}</span>` +
    `<canvas class="canvas" part="canvas" aria-hidden="true"></canvas>` +
    `<slot></slot>`;
  return { html, css: STARFIELD_CSS };
}

export const STARFIELD_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
    background: var(--pura-starfield-bg, radial-gradient(ellipse at 50% 50%, #0c1233 0%, #04020e 75%));
  }

  .field,
  .canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .star {
    position: absolute;
    border-radius: 50%;
    background: var(--pura-starfield-color, #e8eaff);
    opacity: var(--pura-star-opacity, 0.7);
  }

  /* pre-JS twinkle, explicitly gated so reduced motion holds a still sky */
  @media (prefers-reduced-motion: no-preference) {
    .star {
      animation: pura-starfield-twinkle 4s ease-in-out infinite;
    }
  }

  @keyframes pura-starfield-twinkle {
    0%, 100% { opacity: var(--pura-star-opacity, 0.7); }
    50% { opacity: calc(var(--pura-star-opacity, 0.7) * 0.35); }
  }

  /* once the client projection has painted a frame, the static SSR field
     gets out of the way */
  :host([data-pura-starfield-live]) .field { display: none; }

  ::slotted(*) { position: relative; z-index: 1; }
`;

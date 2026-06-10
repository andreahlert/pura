// Pure render for <pura-particle-network>. No DOM; safe on server (SSR/DSD)
// and client. The server paints a static, deterministic dot field (the network
// at rest) plus an empty canvas; client JS takes over the canvas with the live
// simulation and hides the static field. Without JS the page still shows a
// presentable particle backdrop.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index scatter so server and client paint byte-identically
// (no Math.random, which would diverge between renders).
function dotStyle(i) {
  const left = (i * 53) % 100; // spread horizontally
  const top = ((i * 29) + 7) % 100; // spread vertically
  const size = 2 + ((i * 7) % 3); // 2..4 px
  return `left:${left}%;top:${top}%;width:${size}px;height:${size}px`;
}

export function particleNetworkTemplate(el = EMPTY_SHIM) {
  const raw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 160) : 80;
  let dots = "";
  for (let i = 0; i < count; i++) {
    dots += `<span class="dot" part="dot" style="${dotStyle(i)}"></span>`;
  }
  const html =
    `<span class="field" part="field" aria-hidden="true">${dots}</span>` +
    `<canvas class="canvas" part="canvas" aria-hidden="true"></canvas>` +
    `<slot></slot>`;
  return { html, css: PARTICLE_NETWORK_CSS };
}

export const PARTICLE_NETWORK_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
    background: var(--pura-particle-network-bg, transparent);
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

  .dot {
    position: absolute;
    border-radius: 50%;
    background: var(--pura-particle-network-color, var(--pura-fg, #a1a1aa));
    opacity: var(--pura-particle-network-opacity, 0.55);
  }

  /* once the client simulation has painted a frame, the static SSR field
     gets out of the way */
  :host([data-pura-pn-live]) .field { display: none; }

  ::slotted(*) { position: relative; z-index: 1; }
`;

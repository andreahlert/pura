// Pure render for <pura-flow-field>. No DOM; safe on server (SSR/DSD) and
// client. The server paints a static, deterministic set of streamlines traced
// through the same seeded noise field the client simulation uses (an inline
// SVG, one polyline per stream) plus an empty canvas; client JS takes the
// canvas over with the live particle simulation and hides the static field.
// Without JS the page still shows a presentable topographic backdrop.
import { EMPTY_SHIM } from "../base.js";

// Deterministic sin-hash value noise. Pure math: no Math.random, no clock, so
// the server and the client sample the exact same field for a given seed.
// Exported so the client simulation drives its particle headings from it.
export function flowFieldNoise(x, y, seed) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy, seed);
  const b = hash(ix + 1, iy, seed);
  const c = hash(ix, iy + 1, seed);
  const d = hash(ix + 1, iy + 1, seed);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function hash(x, y, seed) {
  const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return s - Math.floor(s);
}

// Heading of the vector field at (x, y). The flow preset maps noise straight
// to an angle (two full turns of range gives the looping, curl-like streams);
// the vortex preset orbits the center on a perturbed inward spiral. t drifts
// the sampling coordinates so the live field evolves slowly over time (the
// pure template always samples at t = 0).
export function flowFieldAngle(x, y, w, h, scale, seed, vortex, t = 0) {
  const n = flowFieldNoise(x * scale + t * 0.06, y * scale + t * 0.045, seed);
  if (vortex) {
    const dx = x - w / 2;
    const dy = y - h / 2;
    return Math.atan2(dy, dx) + Math.PI / 2 + 0.3 + (n - 0.5) * 1.8;
  }
  return n * Math.PI * 4;
}

export function flowFieldTemplate(el = EMPTY_SHIM) {
  const seedRaw = parseFloat(el.getAttribute("seed"));
  const seed = Number.isFinite(seedRaw) ? seedRaw : 1;
  const vortex = el.getAttribute("preset") === "vortex";
  const countRaw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(countRaw) && countRaw > 0 ? Math.min(countRaw, 1500) : 500;
  // A few dozen streamlines stand in for the full particle field on the server.
  const lines = Math.max(14, Math.min(48, Math.round(count / 16)));

  let paths = "";
  for (let i = 0; i < lines; i++) {
    // Deterministic per-index scatter (same spirit as the client seeding);
    // each stream then integrates the field for a couple dozen steps.
    let x = (i * 53 + 13) % 100;
    let y = (i * 31 + 7) % 100;
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    for (let s = 0; s < 26; s++) {
      const a = flowFieldAngle(x, y, 100, 100, 0.045, seed, vortex);
      x += Math.cos(a) * 2.2;
      y += Math.sin(a) * 2.2;
      if (x < -12 || x > 112 || y < -12 || y > 112) break;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths += `<path class="line" part="line" d="${d}" vector-effect="non-scaling-stroke"></path>`;
  }

  const html =
    `<svg class="field" part="field" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>` +
    `<canvas class="canvas" part="canvas" aria-hidden="true"></canvas>` +
    `<slot></slot>`;
  return { html, css: FLOW_FIELD_CSS };
}

export const FLOW_FIELD_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
    background: var(--pura-flow-field-bg, transparent);
  }

  .field,
  .canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .field,
  .canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .line {
    fill: none;
    stroke: var(--pura-flow-field-color, var(--pura-fg, #a1a1aa));
    stroke-opacity: var(--pura-flow-field-opacity, 0.35);
    stroke-width: 1px;
    stroke-linecap: round;
  }

  /* once the client simulation has painted a frame, the static SSR field
     gets out of the way */
  :host([data-pura-ff-live]) .field { display: none; }

  ::slotted(*) { position: relative; z-index: 1; }
`;

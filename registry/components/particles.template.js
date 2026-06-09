// Pure render for <pura-particles>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index scatter so server and client paint byte-identically
// (no Math.random, which would diverge between renders).
function particleStyle(i) {
  const left = (i * 61) % 100; // spread horizontally
  const top = (i * 37) % 100; // spread vertically
  const size = 1 + ((i * 7) % 3); // 1..3 px
  const delay = ((i * 0.41) % 6).toFixed(2);
  const dur = (6 + ((i * 0.83) % 8)).toFixed(2); // 6..14s
  const drift = (((i * 13) % 40) - 20).toFixed(0); // -20..20 px sideways
  return `left:${left}%;top:${top}%;width:${size}px;height:${size}px;--pura-particle-delay:${delay}s;--pura-particle-duration:${dur}s;--pura-particle-drift:${drift}px`;
}

export function particlesTemplate(el = EMPTY_SHIM) {
  // A field of small dots drifts and twinkles behind slotted content, in the
  // style of Magic UI's Particles. Each dot floats on a pure CSS @keyframes with
  // a deterministic position and timing, so the server paints a static field and
  // the client animates it. No animation runtime.
  const raw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 200) : 60;
  let dots = "";
  for (let i = 0; i < count; i++) {
    dots += `<span class="p" part="particle" style="${particleStyle(i)}"></span>`;
  }
  const html = `<span class="field" part="field" aria-hidden="true">${dots}</span><slot></slot>`;
  return { html, css: PARTICLES_CSS };
}

export const PARTICLES_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .field {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .p {
    position: absolute;
    border-radius: 50%;
    background: var(--pura-particle-color, var(--pura-fg, #a1a1aa));
    opacity: 0;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       field comes to rest with no separate guard. */
    animation: pura-particle-float var(--pura-particle-duration, 10s) ease-in-out infinite;
    animation-delay: var(--pura-particle-delay, 0s);
  }

  ::slotted(*) { position: relative; z-index: 1; }

  @keyframes pura-particle-float {
    0%   { opacity: 0; transform: translate(0, 0) scale(0.6); }
    20%  { opacity: var(--pura-particle-opacity, 0.7); }
    50%  { transform: translate(var(--pura-particle-drift, 0), -22px) scale(1); }
    80%  { opacity: var(--pura-particle-opacity, 0.7); }
    100% { opacity: 0; transform: translate(0, -40px) scale(0.6); }
  }
`;

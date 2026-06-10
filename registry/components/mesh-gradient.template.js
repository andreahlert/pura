// Pure render for <pura-mesh-gradient>. No DOM; safe on server (SSR/DSD) and client.
// An animated mesh-gradient background: large blurred radial-gradient blobs that
// drift and blend slowly behind the slotted content. Motion is pure CSS
// @keyframes with prime-number durations per layer so the composite pattern
// never visibly repeats. SSR / pre-JS paints the same static mesh; reduced
// motion freezes it (explicit gate plus the base.js RESET collapse).
import { EMPTY_SHIM } from "../base.js";

// Five blob color tokens with vivid fallbacks; layers cycle through them.
const COLOR_FALLBACKS = ["#6366f1", "#ec4899", "#06b6d4", "#8b5cf6", "#f59e0b"];

// Prime durations (seconds) so layered drifts never line up into a visible loop.
const DURATIONS = [29, 37, 41, 31, 43, 47, 53, 59];

// Deterministic per-index placement so server and client paint byte-identical
// meshes (no Math.random, which would diverge between renders).
function blobStyle(i, speed) {
  const left = (i * 137 + 7) % 75; // golden-angle-ish spread, percent
  const top = (i * 89 + 11) % 70;
  const size = 48 + ((i * 29) % 32); // percent of field width
  const dur = (DURATIONS[i % DURATIONS.length] / speed).toFixed(2);
  const delay = -((i * 7) % 19); // negative delay desynchronizes the start
  const c = (i % COLOR_FALLBACKS.length) + 1;
  return (
    `left:${left}%;top:${top}%;width:${size}%;` +
    `background:radial-gradient(circle at 35% 35%, var(--pura-mesh-gradient-${c}, ${COLOR_FALLBACKS[c - 1]}) 0%, transparent 70%);` +
    `animation-duration:${dur}s;animation-delay:${delay}s`
  );
}

export function meshGradientTemplate(el = EMPTY_SHIM) {
  const rawBlobs = parseInt(el.getAttribute("blobs"), 10);
  const blobs = Number.isFinite(rawBlobs) ? Math.min(Math.max(rawBlobs, 2), 8) : 5;
  const rawSpeed = parseFloat(el.getAttribute("speed"));
  const speed = Number.isFinite(rawSpeed) && rawSpeed > 0 ? rawSpeed : 1;

  let layers = "";
  for (let i = 0; i < blobs; i++) {
    layers += `<span class="blob drift-${"abc"[i % 3]}" part="blob" style="${blobStyle(i, speed)}"></span>`;
  }
  const html = `<span class="field" part="field" aria-hidden="true">${layers}</span><slot></slot>`;
  return { html, css: MESH_GRADIENT_CSS };
}

export const MESH_GRADIENT_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
    isolation: isolate;
    background: var(--pura-mesh-gradient-bg, transparent);
  }

  .field {
    position: absolute;
    inset: -12%;
    z-index: -1;
    pointer-events: none;
    filter: blur(var(--pura-mesh-gradient-blur, 64px));
    opacity: var(--pura-mesh-gradient-opacity, 0.8);
  }

  .blob {
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    will-change: transform;
  }

  /* Continuous drift only when the user allows motion; otherwise the static
     mesh painted above is the final state. base.js RESET also collapses
     animation-duration under reduced motion as a second guard. */
  @media (prefers-reduced-motion: no-preference) {
    .blob {
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
    .drift-a { animation-name: pura-mesh-drift-a; }
    .drift-b { animation-name: pura-mesh-drift-b; }
    .drift-c { animation-name: pura-mesh-drift-c; }
  }

  :host([static]) .blob { animation: none; }

  @keyframes pura-mesh-drift-a {
    0%   { transform: translate3d(0, 0, 0) scale(1); }
    33%  { transform: translate3d(14%, -18%, 0) scale(1.18); }
    66%  { transform: translate3d(-12%, 10%, 0) scale(0.88); }
    100% { transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes pura-mesh-drift-b {
    0%   { transform: translate3d(0, 0, 0) scale(1); }
    25%  { transform: translate3d(-16%, 12%, 0) scale(0.9); }
    60%  { transform: translate3d(10%, 18%, 0) scale(1.22); }
    100% { transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes pura-mesh-drift-c {
    0%   { transform: translate3d(0, 0, 0) scale(1); }
    40%  { transform: translate3d(12%, 16%, 0) scale(1.12); }
    75%  { transform: translate3d(-14%, -10%, 0) scale(0.94); }
    100% { transform: translate3d(0, 0, 0) scale(1); }
  }
`;

// Pure render for <pura-beams>. No DOM; safe on server (SSR/DSD) and client.
// Background beams: curved SVG paths spanning the host, each with a faint base
// trace plus a glowing gradient dash that travels along the path on a staggered
// infinite loop. Geometry and timing are derived from the index alone (no
// Math.random, no clock), so the server and client paint byte-identical scenes.
//
// SSR / pre-JS: the faint traces render immediately and the dash animation is
// pure CSS, so the effect runs with no client JS at all.
// Reduced motion: the travel animation is gated behind
// (prefers-reduced-motion: no-preference); in reduce the gradient dash rests
// off-path and only the calm static traces remain.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index curve through an 800x400 viewBox: start on the left
// edge, end on the right edge, with an alternating S-bend whose depth and
// vertical drift come from simple index math.
function beamPath(i, n) {
  const t = n > 1 ? i / (n - 1) : 0.5;
  const ys = Math.round(16 + 368 * t);
  const dir = i % 2 === 0 ? 1 : -1;
  const drift = ((i * 53) % 70) - 35;
  const ye = Math.min(384, Math.max(16, ys + dir * drift));
  const bend = 60 + ((i * 37) % 90);
  return `M -20 ${ys} C 240 ${ys + dir * bend}, 560 ${ye - dir * bend}, 820 ${ye}`;
}

// Deterministic stagger: each beam loops at 0.75x..1.25x of the base duration
// and starts phase-shifted via a negative delay, so the field never pulses in
// unison yet stays identical between renders.
function beamTiming(i, base) {
  const dur = (base * (0.75 + ((i * 0.37) % 0.5))).toFixed(2);
  const delay = (-(((i * 0.43) % 1) * base)).toFixed(2);
  return `--pura-beam-duration:${dur}s;--pura-beam-delay:${delay}s`;
}

export function beamsTemplate(el = EMPTY_SHIM) {
  const rawCount = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(rawCount) && rawCount > 0 ? Math.min(rawCount, 32) : 8;
  const rawDur = parseFloat(el.getAttribute("duration"));
  const base = Number.isFinite(rawDur) && rawDur > 0 ? rawDur : 7;

  let paths = "";
  for (let i = 0; i < count; i++) {
    const d = beamPath(i, count);
    paths += `<path class="trace" part="trace" d="${d}" pathLength="1"></path>`;
    paths += `<path class="beam" part="beam" d="${d}" pathLength="1" stroke="url(#pura-beams-gradient)" style="${beamTiming(i, base)}"></path>`;
  }

  const html = `
    <div class="scene" part="scene" aria-hidden="true">
      <svg part="svg" viewBox="0 0 800 400" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="pura-beams-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop class="stop-a" offset="0" stop-opacity="0"></stop>
            <stop class="stop-a" offset="0.25"></stop>
            <stop class="stop-b" offset="0.6"></stop>
            <stop class="stop-c" offset="1" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        ${paths}
      </svg>
    </div>
    <slot></slot>`;

  return { html, css: BEAMS_CSS };
}

export const BEAMS_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .scene {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* Slotted content becomes positioned so it paints above the beam scene. */
  ::slotted(*) {
    position: relative;
  }

  .trace {
    fill: none;
    stroke: var(--pura-beams-trace-color, color-mix(in oklab, var(--pura-fg, #94a3b8) 16%, transparent));
    stroke-width: var(--pura-beams-trace-width, 1);
  }

  /* pathLength="1" normalizes every curve, so dash math is path-agnostic:
     a 0.2-long dash with a gap wide enough that only one dash ever shows.
     At rest (SSR, reduced motion) the dash sits just before the path start. */
  .beam {
    fill: none;
    stroke-width: var(--pura-beams-width, 2);
    stroke-linecap: round;
    stroke-dasharray: 0.2 1.05;
    stroke-dashoffset: 0.2;
    opacity: var(--pura-beams-opacity, 1);
  }

  .stop-a { stop-color: var(--pura-beams-color-a, #18ccfc); }
  .stop-b { stop-color: var(--pura-beams-color-b, #6344f5); }
  .stop-c { stop-color: var(--pura-beams-color-c, #ae48ff); }

  @media (prefers-reduced-motion: no-preference) {
    .beam {
      animation: pura-beam-travel var(--pura-beam-duration, 7s) linear infinite;
      animation-delay: var(--pura-beam-delay, 0s);
    }
  }

  @keyframes pura-beam-travel {
    from { stroke-dashoffset: 0.2; }
    to { stroke-dashoffset: -1.05; }
  }
`;

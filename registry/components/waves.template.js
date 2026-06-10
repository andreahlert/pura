// Pure render for <pura-waves>. No DOM; safe on server (SSR/DSD) and client.
// Layered sine waves drifting along the bottom (or top) of the section. Each
// layer is one SVG path built from quadratic beziers (period 720 in a
// 1440-wide viewBox) spanning two viewBox widths; a CSS keyframe translates it
// by exactly two periods (-1440 user units), so the loop is seamless. Layers
// get deterministic per-index amplitude, baseline, duration, phase (negative
// delay), direction and opacity — no Math.random — so server and client paint
// byte-identical waves.
//
// SSR / pre-JS: the full wave stack is painted at phase 0 and looks finished;
// the drift is plain CSS animation, no JS runtime. Reduced motion: the drift
// is gated behind prefers-reduced-motion: no-preference, so the waves hold
// still as a static decoration.
import { EMPTY_SHIM } from "../base.js";

const VB_W = 1440; // viewBox width: one visible screenful
const VB_H = 320; // viewBox height
const PERIOD = 720; // one full crest + trough
const SPAN = VB_W * 2; // path width: two screenfuls, drifted by 2 periods

function clampNum(raw, fallback, min, max) {
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Periodic sine-like wave: a quadratic crest then T-shorthand reflections.
// The quad control sits at 2*amp so the curve peaks at exactly mid - amp.
function wavePath(mid, amp, filled) {
  let d = `M 0 ${mid} Q ${PERIOD / 4} ${mid - amp * 2} ${PERIOD / 2} ${mid}`;
  for (let x = PERIOD; x <= SPAN; x += PERIOD / 2) d += ` T ${x} ${mid}`;
  if (filled) d += ` L ${SPAN} ${VB_H} L 0 ${VB_H} Z`;
  return d;
}

export function wavesTemplate(el = EMPTY_SHIM) {
  const layers = Math.round(clampNum(el.getAttribute("layers"), 3, 1, 5));
  const amplitude = clampNum(el.getAttribute("amplitude"), 32, 2, 120);
  const speed = clampNum(el.getAttribute("speed"), 16, 1, 120);
  const lines = el.hasAttribute("lines");

  let paths = "";
  for (let i = 0; i < layers; i++) {
    // depth 0..1, back layer smallest / lightest / slowest, front layer = 1.
    const depth = (i + 1) / layers;
    const amp = Math.round(amplitude * (0.55 + 0.45 * depth));
    const mid = layers === 1 ? 190 : Math.round(120 + (i * 130) / (layers - 1));
    const dur = speed * (1 + (layers - 1 - i) * 0.5);
    const delay = -((i * 0.618) % 1) * dur; // golden-ratio phase scatter
    const dir = i % 2 === 1 ? "reverse" : "normal";
    const opacity = (layers === 1 ? 1 : 0.35 + 0.65 * depth).toFixed(2);
    const style =
      `--pura-waves-dur:${dur.toFixed(2)}s;` +
      `--pura-waves-delay:${delay.toFixed(2)}s;` +
      `--pura-waves-dir:${dir};opacity:${opacity};` +
      `--pura-waves-layer-color:var(--pura-waves-color-${i + 1}, var(--pura-waves-color, var(--pura-accent, currentColor)))`;
    paths +=
      `<path class="wave" part="wave" d="${wavePath(mid, amp, !lines)}" ` +
      `vector-effect="non-scaling-stroke" style="${style}"/>`;
  }

  const html =
    `<svg class="canvas" part="canvas" viewBox="0 0 ${VB_W} ${VB_H}" ` +
    `preserveAspectRatio="none" aria-hidden="true">${paths}</svg>` +
    `<div class="content" part="content"><slot></slot></div>`;

  const css = `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
    }
    .canvas {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      width: 100%;
      height: min(var(--pura-waves-height, 11rem), 100%);
      pointer-events: none;
    }
    :host([position="top"]) .canvas {
      bottom: auto;
      top: 0;
      transform: scaleY(-1);
    }
    .wave {
      fill: var(--pura-waves-layer-color, var(--pura-accent, currentColor));
      stroke: none;
    }
    :host([lines]) .wave {
      fill: none;
      stroke: var(--pura-waves-layer-color, var(--pura-accent, currentColor));
      stroke-width: var(--pura-waves-line-width, 2px);
      stroke-linecap: round;
    }
    .content {
      position: relative;
      z-index: 1;
      height: 100%;
    }

    /* Drift one path by exactly two periods of its own geometry: the wave at
       x and x + 1440 is in the same phase, so the loop restart is invisible.
       CSS px on an SVG child resolve in user units, so this scales with the
       stretched viewBox. */
    @keyframes pura-waves-drift {
      from { transform: translateX(0); }
      to { transform: translateX(-${VB_W}px); }
    }

    /* Continuous animation only when the user has not asked for reduced
       motion; in reduce the painted phase-0 stack simply holds still. */
    @media (prefers-reduced-motion: no-preference) {
      .wave {
        animation: pura-waves-drift var(--pura-waves-dur, 16s) linear infinite;
        animation-delay: var(--pura-waves-delay, 0s);
        animation-direction: var(--pura-waves-dir, normal);
      }
    }

    :host([paused]) .wave {
      animation-play-state: paused;
    }
  `;

  return { html, css };
}

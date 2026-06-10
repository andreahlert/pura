// Pure render for <pura-flickering-grid>. No DOM; safe on server (SSR/DSD) and client.
// A grid of small squares behind slotted content where individual cells light up
// and dim back down at staggered times, in the style of Magic UI's Flickering
// Grid. Every cell's delay, duration and resting opacity are derived from a
// deterministic seed + index math (no Math.random), so the server and client
// paint byte-identical fields and the flicker is pure CSS @keyframes with no
// animation runtime. A gradient mask fades the field toward the edges.
//
// SSR / pre-JS: the full grid paints with varied resting opacities (some cells
// pre-lit), so the page looks finished without JS. Reduced motion: the flicker
// animation is gated behind prefers-reduced-motion: no-preference, leaving the
// same static varied grid.
import { EMPTY_SHIM } from "../base.js";

function clampInt(raw, fallback, min, max) {
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Deterministic per-cell scatter. k mixes the cell index with the seed so two
// grids with different seeds flicker in different patterns, yet every render
// of the same grid is identical.
function cellStyle(k) {
  const delay = ((k * 0.733) % 4).toFixed(2);
  const dur = (1.6 + ((k * 0.547) % 2.8)).toFixed(2);
  const base = (0.04 + (((k * 13) % 10) / 10) * 0.12).toFixed(3);
  return `--pura-fg-delay:${delay}s;--pura-fg-dur:${dur}s;--pura-fg-base:${base}`;
}

const MASKS = {
  radial: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 35%, transparent 78%)",
  top: "linear-gradient(to bottom, #000 35%, transparent 92%)",
  bottom: "linear-gradient(to top, #000 35%, transparent 92%)",
  none: "none",
};

const SPEEDS = ["slow", "normal", "fast"];

export function flickeringGridTemplate(el = EMPTY_SHIM) {
  const cols = clampInt(el.getAttribute("columns"), 24, 4, 48);
  const rows = clampInt(el.getAttribute("rows"), 14, 3, 32);
  const seed = clampInt(el.getAttribute("seed"), 1, 0, 9999);
  const maskAttr = el.getAttribute("mask");
  const mask = MASKS[maskAttr] !== undefined ? MASKS[maskAttr] : MASKS.radial;
  const speedAttr = el.getAttribute("speed");
  const speed = SPEEDS.includes(speedAttr) ? speedAttr : "normal";

  let cells = "";
  for (let i = 0; i < cols * rows; i++) {
    const k = i + seed * 7919;
    const double = k % 5 < 2 ? " double" : "";
    const lit = k % 7 === 0 ? " lit" : "";
    cells += `<span class="cell${double}${lit}" part="cell" style="${cellStyle(k)}"></span>`;
  }

  const html =
    `<span class="field ${speed}" part="field" aria-hidden="true">${cells}</span>` +
    `<slot></slot>`;

  const css = `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
    }

    .field {
      position: absolute;
      inset: 0;
      z-index: 0;
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      grid-template-rows: repeat(${rows}, 1fr);
      gap: var(--pura-flickering-grid-gap, 6px);
      padding: var(--pura-flickering-grid-gap, 6px);
      pointer-events: none;
      -webkit-mask-image: var(--pura-flickering-grid-mask, ${mask});
      mask-image: var(--pura-flickering-grid-mask, ${mask});
    }

    .cell {
      background: var(--pura-flickering-grid-color, var(--pura-primary, #6366f1));
      border-radius: var(--pura-flickering-grid-radius, 2px);
      opacity: var(--pura-fg-base, 0.08);
    }

    /* Static pre-lit cells: the SSR / reduced-motion paint still reads as a
       lively grid rather than a flat sheet. */
    .cell.lit { opacity: var(--pura-flickering-grid-max-opacity, 0.9); }

    /* Speed presets scale every cell's duration and delay together. */
    .field.slow { --pura-fg-rate: 1.8; }
    .field.fast { --pura-fg-rate: 0.55; }

    ::slotted(*) {
      position: relative;
      z-index: 1;
    }

    /* Continuous flicker only when the user is fine with motion; otherwise the
       static varied grid above stands. */
    @media (prefers-reduced-motion: no-preference) {
      .cell {
        animation: pura-fg-flicker calc(var(--pura-fg-dur, 3s) * var(--pura-fg-rate, 1)) linear infinite;
        animation-delay: calc(var(--pura-fg-delay, 0s) * var(--pura-fg-rate, 1));
      }
      .cell.double { animation-name: pura-fg-flicker-double; }
    }

    @keyframes pura-fg-flicker {
      0%, 56% { opacity: var(--pura-fg-base, 0.08); }
      60%, 72% { opacity: var(--pura-flickering-grid-max-opacity, 0.9); }
      76%, 100% { opacity: var(--pura-fg-base, 0.08); }
    }

    /* Some cells blink twice per cycle for a less mechanical pattern. */
    @keyframes pura-fg-flicker-double {
      0%, 30% { opacity: var(--pura-fg-base, 0.08); }
      34%, 40% { opacity: var(--pura-flickering-grid-max-opacity, 0.9); }
      44%, 60% { opacity: var(--pura-fg-base, 0.08); }
      64%, 74% { opacity: var(--pura-flickering-grid-max-opacity, 0.9); }
      78%, 100% { opacity: var(--pura-fg-base, 0.08); }
    }
  `;

  return { html, css };
}

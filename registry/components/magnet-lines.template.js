// Pure render for <pura-magnet-lines>. No DOM; safe on server (SSR/DSD) and client.
// A grid of compass-needle ticks. The template paints the whole grid at the
// resting angle (a uniform diagonal field), so the SSR / pre-JS state is a
// presentable static texture. Client JS then rotates each line toward the
// pointer by writing one CSS var per cell; the template never moves anything.
//
// Reduced motion: the pointer listener is never attached (see magnet-lines.js)
// and the smoothing transition below is collapsed by the base.js RESET, so the
// field holds the resting angle.
import { EMPTY_SHIM } from "../base.js";

const MAX_DIM = 30; // hard cap per axis: 30x30 = 900 cells worst case

function dim(el, name, fallback) {
  const n = parseInt(el.getAttribute(name), 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, MAX_DIM) : fallback;
}

export function magnetLinesTemplate(el = EMPTY_SHIM) {
  const rows = dim(el, "rows", 9);
  const columns = dim(el, "columns", 9);
  const rawBase = parseFloat(el.getAttribute("base-angle"));
  const base = Number.isFinite(rawBase) ? rawBase : -10;

  let spans = "";
  for (let i = 0; i < rows * columns; i++) {
    spans += `<span class="line" part="line"></span>`;
  }

  const html =
    `<div class="grid" part="grid" aria-hidden="true" ` +
    `style="--pura-ml-rows:${rows};--pura-ml-cols:${columns};--pura-ml-base:${base}deg">` +
    `${spans}</div>` +
    `<div class="content" part="content"><slot></slot></div>`;

  return { html, css: MAGNET_LINES_CSS };
}

export const MAGNET_LINES_CSS = `
  :host {
    position: relative;
    display: block;
    aspect-ratio: 1;
    overflow: hidden;
  }

  .grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-rows: repeat(var(--pura-ml-rows, 9), 1fr);
    grid-template-columns: repeat(var(--pura-ml-cols, 9), 1fr);
    place-items: center;
    pointer-events: none;
  }

  /* .content is positioned and comes after .grid in tree order, so slotted
     content always paints above the line field. */
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  ::slotted(*) {
    pointer-events: auto;
  }

  .line {
    display: block;
    width: var(--pura-magnet-lines-width, 2px);
    height: var(--pura-magnet-lines-height, 1.5rem);
    border-radius: var(--pura-radius-full, 999px);
    background: var(--pura-magnet-lines-color, var(--pura-fg, #3f3f46));
    transform: rotate(var(--pura-ml-angle, var(--pura-ml-base, -10deg)));
    will-change: transform;
  }

  /* Smooth the per-frame angle updates a touch. Under
     prefers-reduced-motion: reduce the base reset collapses this and the
     client never attaches the pointer listener, so the resting angle holds. */
  @media (prefers-reduced-motion: no-preference) {
    .line {
      transition: transform 60ms linear;
    }
  }
`;

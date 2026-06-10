// Pure render for <pura-pixel-reveal>. No DOM; safe on server (SSR/DSD) and client.
// A shadow-DOM grid of square cells flickers in pseudo-random order to either
// swap between two slotted states (default slot <-> "alt" slot) or dissolve
// away to reveal the content, retro pixel-transition style. Per-cell delays
// are seeded deterministically by index (same SSR-stable pattern as
// <pura-meteors>), so server and client paint byte-identical grids.
//
// SSR / pre-JS: state A renders fully visible and the cells stay transparent;
// covering and swapping only engage once the client class sets data-pura-pr-*
// state attributes. Reduced motion: no pixel pass, state changes jump straight
// to the final state.
import { EMPTY_SHIM } from "../base.js";

const MAX_DIM = 32;

export function pixelRevealGrid(el = EMPTY_SHIM) {
  const c = parseInt(el.getAttribute("cols"), 10);
  const r = parseInt(el.getAttribute("rows"), 10);
  const cols = Number.isFinite(c) && c > 0 ? Math.min(c, MAX_DIM) : 12;
  const rows = Number.isFinite(r) && r > 0 ? Math.min(r, MAX_DIM) : 8;
  return { cols, rows };
}

// Deterministic per-index scatter (no Math.random): a golden-ish stride walks
// the 0..1 delay range in a shuffled-looking but reproducible order, and a
// second stride gives each cell a slight alpha texture.
function cellStyle(i) {
  const d = (((i * 137 + 29) % 100) / 100).toFixed(2);
  const o = ((80 + ((i * 31) % 21)) / 100).toFixed(2);
  return `--pura-pr-d:${d};--pura-pr-o:${o}`;
}

export function pixelRevealTemplate(el = EMPTY_SHIM) {
  const { cols, rows } = pixelRevealGrid(el);
  const count = cols * rows;

  let cells = "";
  for (let i = 0; i < count; i++) {
    cells += `<span class="cell" part="cell" style="${cellStyle(i)}"></span>`;
  }

  const html = `
    <div class="frame" part="frame">
      <div class="layer base" part="base"><slot></slot></div>
      <div class="layer alt" part="alt"><slot name="alt"></slot></div>
      <div class="grid" part="grid" aria-hidden="true">${cells}</div>
    </div>
  `;

  const css = `
    :host {
      display: block;
      --pura-pr-dur: var(--pura-pixel-reveal-duration, 0.6s);
      --pura-pr-stagger: var(--pura-pixel-reveal-stagger, 0.4s);
      /* layer swap lands mid-burst, while the cells cover the content */
      --pura-pr-swap: calc((var(--pura-pr-dur) + var(--pura-pr-stagger)) / 2);
    }

    .frame {
      position: relative;
      display: grid;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    .layer { grid-area: 1 / 1; min-width: 0; }
    .alt { opacity: 0; visibility: hidden; }

    /* zero-duration transitions with a delay: the layers swap instantly, but
       only once the pixel burst has had time to cover the content. */
    .base, .alt {
      transition:
        opacity 0s linear var(--pura-pr-swap),
        visibility 0s linear var(--pura-pr-swap);
    }
    :host([data-pura-pr-active]:not([data-pura-pr-cover])) .base {
      opacity: 0;
      visibility: hidden;
    }
    :host([data-pura-pr-active]) .alt {
      opacity: 1;
      visibility: visible;
    }

    .grid {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      grid-template-rows: repeat(${rows}, 1fr);
      pointer-events: none;
    }

    .cell {
      opacity: 0;
      background: var(--pura-pixel-reveal-color, var(--pura-accent, #6366f1));
    }

    /* swap mode: one-shot scatter pop, re-triggered by JS on every toggle.
       Hard keyframe snaps (no fade) keep the retro pixel look. */
    @keyframes pura-pixel-pop {
      0%, 19% { opacity: 0; }
      20%, 79% { opacity: var(--pura-pr-o, 1); }
      80%, 100% { opacity: 0; }
    }
    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-pr-burst]) .cell {
        animation: pura-pixel-pop var(--pura-pr-dur) linear both;
        animation-delay: calc(var(--pura-pr-d, 0) * var(--pura-pr-stagger));
      }
    }

    /* reveal mode: once JS engages, the cells cover the content; activating
       snaps them off one by one in the seeded order (and back on release). */
    :host([data-pura-pr-cover]) .cell {
      opacity: var(--pura-pr-o, 1);
      transition: opacity 0.12s steps(2, jump-none);
      transition-delay: calc(var(--pura-pr-d, 0) * var(--pura-pr-stagger));
    }
    :host([data-pura-pr-cover][data-pura-pr-active]) .cell {
      opacity: 0;
    }

    /* Reduced motion: no pixel pass. Layers swap instantly and reveal-mode
       cells never cover the content (final state always shown). */
    @media (prefers-reduced-motion: reduce) {
      .base, .alt { transition: none; }
      :host([data-pura-pr-cover]) .cell {
        opacity: 0;
        transition: none;
      }
    }
  `;

  return { html, css };
}

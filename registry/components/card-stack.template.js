// Pure render for <pura-card-stack>. No DOM; safe on server (SSR/DSD) and client.
// A pile of cards in a single grid cell: each depth steps down by a fixed
// offset and loses a fixed slice of scale. transform-origin is bottom center,
// so the peeking edge below the top card is exactly `offset` px per depth no
// matter how tall the cards are. The whole resting layout is static nth-child
// CSS, so the SSR paint is the finished pile; the client JS only reorders the
// DOM children (FLIP re-ranks via these same rules) and drives the drag.
//
// SSR / pre-JS: the resting stack renders fully presentable; no cycle, no drag.
// Reduced motion: the reveal transition is disabled here; autoplay and the
// WAAPI fling/spring are gated in the JS layer.
import { EMPTY_SHIM } from "../base.js";

function safeNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function cardStackTemplate(el = EMPTY_SHIM) {
  const rawVisible = Number(el.getAttribute("visible"));
  const visible = Number.isFinite(rawVisible)
    ? Math.max(1, Math.min(6, Math.round(rawVisible)))
    : 3;
  const offset = safeNum(el.getAttribute("offset"), 14);
  const scale = Math.min(0.2, safeNum(el.getAttribute("scale"), 0.05));

  const html =
    `<div class="stack" part="stack" role="group" aria-roledescription="card stack" tabindex="0">` +
    `<slot></slot>` +
    `</div>`;

  // One rule per visible depth: deterministic index math, no randomness.
  let depths = "";
  for (let i = 0; i < visible; i++) {
    depths += `
    ::slotted(:nth-child(${i + 1})) {
      z-index: ${visible + 1 - i};
      transform: translateY(calc(${i} * var(--pura-card-stack-offset, ${offset}px)))
                 scale(calc(1 - ${i} * var(--pura-card-stack-scale, ${scale})));
    }`;
  }

  const css = `
    :host {
      display: block;
      touch-action: pan-y;
    }
    .stack {
      display: grid;
      position: relative;
      isolation: isolate;
      /* transforms do not affect layout: reserve room for the peeking edges */
      padding-bottom: calc(${visible - 1} * var(--pura-card-stack-offset, ${offset}px));
      outline: none;
    }
    .stack:focus-visible {
      outline: 2px solid var(--pura-ring, var(--pura-fg));
      outline-offset: 4px;
      border-radius: var(--pura-card-stack-radius, 0.9rem);
    }
    slot { display: contents; }
    ::slotted(*) {
      grid-area: 1 / 1;
      min-width: 0;
      transform-origin: 50% 100%;
      opacity: 1;
      transition: opacity 280ms ease;
      user-select: none;
      -webkit-user-drag: none;
    }
    ::slotted(:first-child) { cursor: grab; }
    :host([data-pura-stack-dragging]) ::slotted(:first-child) { cursor: grabbing; }
    ${depths}
    /* depths past the visible window stay tucked behind the last visible card */
    ::slotted(:nth-child(n + ${visible + 1})) {
      z-index: 1;
      opacity: 0;
      pointer-events: none;
      transform: translateY(calc(${visible - 1} * var(--pura-card-stack-offset, ${offset}px)))
                 scale(calc(1 - ${visible - 1} * var(--pura-card-stack-scale, ${scale})));
    }

    @media (prefers-reduced-motion: reduce) {
      ::slotted(*) { transition: none; }
    }
  `;

  return { html, css };
}

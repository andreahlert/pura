// Pure render for <pura-deck>. No DOM; safe on server (SSR/DSD) and client.
// The sticky card deck (awwwards stacking cards): each slotted card sticks
// near the top of the viewport while the next one scrolls up and over it. The
// pile is pure CSS (position: sticky on the slotted children); the JS layer
// only numbers the children (--pura-deck-i, --pura-deck-rev) so each card's
// sticky top steps down by `peek` pixels (earlier cards peek out above the
// pile) and covered cards recede with a small depth scale.
//
// SSR / pre-JS: the index vars default to 0, so every card sticks at the same
// top; the deck still stacks, just without the peek staircase. The component
// generates no motion of its own (scrolling does all the work), so there is
// nothing to gate behind prefers-reduced-motion.
import { EMPTY_SHIM } from "../base.js";

function safeNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function deckTemplate(el = EMPTY_SHIM) {
  const top = safeNum(el.getAttribute("top"), 96);
  const peek = safeNum(el.getAttribute("peek"), 14);
  const gap = safeNum(el.getAttribute("gap"), 24);
  const depth = el.hasAttribute("no-depth") ? 0 : 0.03;

  const html = `<slot></slot>`;

  const css = `
    :host {
      display: block;
    }
    ::slotted(*) {
      position: sticky;
      top: calc(${top}px + var(--pura-deck-i, 0) * ${peek}px);
      margin-bottom: ${gap}px;
      /* Covered cards recede: scale steps down by how many cards sit on top
         (--pura-deck-rev counts from the bottom of the pile). */
      transform: scale(calc(1 - var(--pura-deck-rev, 0) * ${depth}));
      transform-origin: top center;
      transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    ::slotted(*:last-child) {
      margin-bottom: 0;
    }
  `;

  return { html, css };
}

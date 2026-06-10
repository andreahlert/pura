// Pure render for <pura-flip-card>. No DOM; safe on server (SSR/DSD) and
// client. A perspective host wraps a preserve-3d .card holding two stacked
// faces (CSS grid, same cell, so the larger face sizes both). The back face
// is pre-rotated 180 degrees and both faces hide their backface, so a single
// transition on the card's rotate produces the flip. Hover/focus flipping is
// pure CSS keyed on the trigger attribute; the flipped attribute flips in any
// mode. SSR / pre-JS: the front face renders static (back, if flipped is set).
// Reduced motion: the 3D rotation is disabled and the faces crossfade.
import { EMPTY_SHIM } from "../base.js";

function safeNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function flipCardTemplate(el = EMPTY_SHIM) {
  const duration = safeNum(el.getAttribute("duration"), 600);
  const flipped = el.hasAttribute("flipped");

  const html = `
    <div class="card" part="card">
      <div class="face front" part="front" aria-hidden="${flipped ? "true" : "false"}"><slot name="front"></slot></div>
      <div class="face back" part="back" aria-hidden="${flipped ? "false" : "true"}"><slot name="back"></slot></div>
    </div>
  `;

  const css = `
    :host {
      display: inline-block;
      perspective: var(--pura-flip-card-perspective, 1000px);
      --pura-flip-card-duration: ${duration}ms;
      --pura-fc-flip: rotateY(180deg);
      --pura-fc-back: rotateY(180deg);
    }
    :host([direction="left"]) { --pura-fc-flip: rotateY(-180deg); }
    :host([direction="up"]) {
      --pura-fc-flip: rotateX(180deg);
      --pura-fc-back: rotateX(180deg);
    }
    :host([direction="down"]) {
      --pura-fc-flip: rotateX(-180deg);
      --pura-fc-back: rotateX(180deg);
    }

    .card {
      display: grid;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform
        var(--pura-flip-card-duration, 0.6s)
        var(--pura-flip-card-ease, cubic-bezier(0.4, 0.2, 0.2, 1));
      will-change: transform;
      outline: none;
    }
    .face {
      grid-area: 1 / 1;
      overflow: hidden;
      border-radius: var(--pura-flip-card-radius, 0px);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    .back { transform: var(--pura-fc-back); }

    /* flip: the flipped attribute always; hover/focus only in hover mode */
    :host([flipped]) .card,
    :host(:not([trigger]):hover) .card,
    :host([trigger="hover"]:hover) .card,
    :host(:not([trigger]):focus-within) .card,
    :host([trigger="hover"]:focus-within) .card {
      transform: var(--pura-fc-flip);
    }

    /* reduced motion: no 3D turn, the faces crossfade in place instead */
    @media (prefers-reduced-motion: reduce) {
      .card { transform: none !important; transform-style: flat; }
      .face {
        transform: none;
        transition: opacity var(--pura-flip-card-duration, 0.6s) ease;
        transition-duration: var(--pura-flip-card-duration, 0.6s) !important;
      }
      .back { opacity: 0; pointer-events: none; }
      :host([flipped]) .front,
      :host(:not([trigger]):hover) .front,
      :host([trigger="hover"]:hover) .front,
      :host(:not([trigger]):focus-within) .front,
      :host([trigger="hover"]:focus-within) .front {
        opacity: 0;
        pointer-events: none;
      }
      :host([flipped]) .back,
      :host(:not([trigger]):hover) .back,
      :host([trigger="hover"]:hover) .back,
      :host(:not([trigger]):focus-within) .back,
      :host([trigger="hover"]:focus-within) .back {
        opacity: 1;
        pointer-events: auto;
      }
    }
  `;

  return { html, css };
}

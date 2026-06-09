// Pure render for <pura-magic-card>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function magicCardTemplate(el = EMPTY_SHIM) {
  // A radial spotlight tracks the pointer across the card and a subtle gradient
  // border lights up under the cursor, in the style of Magic UI's Magic Card.
  // The glow position is read from --pura-magic-x / --pura-magic-y, which the
  // element updates on pointermove; the resting paint (centre, dimmed) is what
  // the server renders, so this is SSR-safe with progressive enhancement.
  const html = `<span class="border" part="border" aria-hidden="true"></span><span class="glow" part="glow" aria-hidden="true"></span><slot></slot>`;
  return { html, css: MAGIC_CARD_CSS };
}

export const MAGIC_CARD_CSS = `
  :host {
    position: relative;
    display: block;
    border-radius: var(--pura-magic-card-radius, 12px);
    background: var(--pura-magic-card-bg, var(--pura-surface, #18181b));
    overflow: hidden;
    isolation: isolate;
  }

  /* Gradient border that brightens under the cursor. */
  .border {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: radial-gradient(
      var(--pura-magic-card-size, 320px) circle at var(--pura-magic-x, 50%) var(--pura-magic-y, 0%),
      var(--pura-magic-card-border, var(--pura-primary, #6366f1)),
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
  }

  /* Soft spotlight fill that follows the pointer. */
  .glow {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: var(--pura-magic-card-glow-opacity, 0);
    transition: opacity 0.4s ease;
    background: radial-gradient(
      var(--pura-magic-card-size, 320px) circle at var(--pura-magic-x, 50%) var(--pura-magic-y, 50%),
      var(--pura-magic-card-glow, color-mix(in oklab, var(--pura-primary, #6366f1) 24%, transparent)),
      transparent 100%
    );
  }

  :host(:hover) .glow { opacity: 1; }

  ::slotted(*) { position: relative; z-index: 2; }
`;

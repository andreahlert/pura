// Pure render for <pura-focus-hover>. No DOM; safe on server (SSR/DSD) and client.
// Focus-cards container: while one slotted item is hovered (or keyboard-focused)
// its siblings blur, dim and shrink, so the pointed-at card stands out. The
// whole effect is plain CSS on ::slotted() children: zero per-frame JS.
//
// SSR / pre-JS: nothing is hovered, so the grid paints in its neutral resting
// state; the page looks complete without any script.
// Reduced motion: the transition is gated behind prefers-reduced-motion:
// no-preference, so state changes apply instantly (no animated movement).
import { EMPTY_SHIM } from "../base.js";

export function focusHoverTemplate(el = EMPTY_SHIM) {
  const colsAttr = parseInt(el.getAttribute("columns") || "", 10);
  const cols = Number.isFinite(colsAttr) && colsAttr > 0 ? colsAttr : null;

  const html = `<div class="grid" part="grid"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      ${cols ? `--pura-focus-hover-columns: ${cols};` : ""}
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--pura-focus-hover-columns, 3), minmax(0, 1fr));
      gap: var(--pura-focus-hover-gap, var(--pura-space-4, 1rem));
    }

    ::slotted(*) {
      min-width: 0;
      position: relative;
    }

    /* Animate the hand-off between focused and receded states. Gated so that
       reduced-motion users get an instant (non-animated) state change. */
    @media (prefers-reduced-motion: no-preference) {
      ::slotted(*) {
        transition:
          filter var(--pura-focus-hover-duration, 300ms) var(--pura-focus-hover-ease, ease),
          opacity var(--pura-focus-hover-duration, 300ms) var(--pura-focus-hover-ease, ease),
          transform var(--pura-focus-hover-duration, 300ms) var(--pura-focus-hover-ease, ease);
      }
    }

    /* One item is focused (pointer or keyboard): every other sibling recedes.
       :host(:has(:hover)) only matches while an actual light-DOM child is
       hovered, so pointing at the grid gaps does not dim anything. */
    :host(:has(:hover)) ::slotted(:not(:hover)),
    :host(:has(:focus-visible)) ::slotted(:not(:focus-within)) {
      filter: blur(var(--pura-focus-hover-blur, 4px));
      opacity: var(--pura-focus-hover-dim, 0.55);
      transform: scale(var(--pura-focus-hover-shrink, 0.97));
    }

    /* The focused item lifts slightly above its receding siblings. */
    :host(:has(:hover)) ::slotted(:hover),
    :host(:has(:focus-visible)) ::slotted(:focus-within) {
      transform: scale(var(--pura-focus-hover-grow, 1.02));
      z-index: 1;
    }

    /* Fallback for engines without :has(): scope the effect to container
       hover. Slightly coarser (gaps count as hover) but visually equivalent. */
    @supports not selector(:has(*)) {
      :host(:hover) ::slotted(:not(:hover)) {
        filter: blur(var(--pura-focus-hover-blur, 4px));
        opacity: var(--pura-focus-hover-dim, 0.55);
        transform: scale(var(--pura-focus-hover-shrink, 0.97));
      }
      :host(:hover) ::slotted(:hover) {
        transform: scale(var(--pura-focus-hover-grow, 1.02));
        z-index: 1;
      }
    }
  `;

  return { html, css };
}

// Pure render for <pura-hover-underline>. No DOM; safe on server (SSR/DSD)
// and client. The underline is a real shadow element (not text-decoration) so
// it can transition: the grow variant scales it along the x axis from a
// per-attribute transform-origin (left/center/right), the reveal variant
// rises it from the baseline (scaleY from bottom). Hover and :focus-within
// both draw it, so keyboard focus on a slotted link gets the same affordance.
//
// SSR / pre-JS: the text renders normally and the underline stays hidden
// unless the element carries the active attribute (the final static state).
// Reduced motion: no transition; the underline just appears.
import { EMPTY_SHIM } from "../base.js";

// from -> transform-origin for the grow variant
const ORIGINS = {
  left: "left center",
  center: "center center",
  right: "right center",
};

export function underlineFrom(el = EMPTY_SHIM) {
  const v = el.getAttribute("from");
  return Object.prototype.hasOwnProperty.call(ORIGINS, v) ? v : "left";
}

export function underlineVariant(el = EMPTY_SHIM) {
  return el.getAttribute("variant") === "reveal" ? "reveal" : "grow";
}

export function hoverUnderlineTemplate(el = EMPTY_SHIM) {
  const variant = underlineVariant(el);
  const hidden = variant === "reveal" ? "scaleY(0)" : "scaleX(0)";
  const origin = variant === "reveal" ? "center bottom" : ORIGINS[underlineFrom(el)];
  const n = parseFloat(el.getAttribute("duration"));
  const dur = Number.isFinite(n) && n > 0 ? n : 240;

  const html =
    `<span class="wrap" part="wrap">` +
    `<slot></slot>` +
    `<span class="underline" part="underline" aria-hidden="true"></span>` +
    `</span>`;

  const css = `
    :host {
      display: inline-block;
    }
    .wrap {
      position: relative;
      display: inline-block;
      padding-bottom: var(--pura-hover-underline-offset, 0.15em);
    }
    .underline {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--pura-hover-underline-thickness, 2px);
      background: var(--pura-hover-underline-color, currentColor);
      border-radius: var(--pura-hover-underline-radius, 1px);
      transform: ${hidden};
      transform-origin: ${origin};
      transition: transform ${dur}ms var(--pura-hover-underline-ease, cubic-bezier(0.65, 0, 0.35, 1));
      pointer-events: none;
    }
    :host(:hover) .underline,
    :host(:focus-within) .underline,
    :host([active]) .underline,
    :host([data-pura-hu-show]) .underline {
      transform: none;
    }

    /* the component IS the underline; slotted links drop the native one */
    ::slotted(a) {
      color: inherit;
      text-decoration: none;
    }

    /* Reduced motion: no grow/reveal, the underline just appears. */
    @media (prefers-reduced-motion: reduce) {
      .underline { transition: none; }
    }
  `;

  return { html, css };
}

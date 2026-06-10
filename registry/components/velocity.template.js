// Pure render for <pura-velocity>. No DOM; safe on server (SSR/DSD) and client.
// A wrapper whose .content leans (skews) by --pura-velocity-skew, set by the
// JS layer from live scroll velocity and decayed back to 0deg when scrolling
// stops. At rest the var is 0deg, so SSR renders the content unskewed and
// nothing moves without script.
import { EMPTY_SHIM } from "../base.js";

export function velocityTemplate(el = EMPTY_SHIM) {
  const axis = el.getAttribute("axis") === "x" ? "skewX" : "skewY";

  const html = `<div class="content" part="content"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
    }
    .content {
      transform: ${axis}(var(--pura-velocity-skew, 0deg));
      will-change: transform;
    }
    @media (prefers-reduced-motion: reduce) {
      .content { transform: none; }
    }
  `;

  return { html, css };
}

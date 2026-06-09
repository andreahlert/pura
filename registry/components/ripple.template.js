// Pure render for <pura-ripple>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function rippleTemplate(el = EMPTY_SHIM) {
  // The .ripples layer is an overlay that clips the spawned ripple spans to the
  // host's rounded corners; the slot carries the actual interactive content.
  const html = `<span class="ripples" part="ripples" aria-hidden="true"></span><slot></slot>`;
  return { html, css: RIPPLE_CSS };
}

export const RIPPLE_CSS = `
  :host {
    position: relative;
    display: inline-block;
    overflow: hidden;
    border-radius: inherit;
  }

  .ripples {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    background: var(--pura-ripple-color, currentColor);
    opacity: var(--pura-ripple-opacity, 0.25);
    pointer-events: none;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       ripple resolves instantly there with no separate guard. */
    animation: pura-ripple
      var(--pura-ripple-duration, var(--pura-duration-5))
      var(--pura-ease-standard) forwards;
  }

  @keyframes pura-ripple {
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

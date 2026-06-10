// Pure render for <pura-confetti>. No DOM; safe on server (SSR/DSD) and client.
// The shadow markup is a slot wrapper for the trigger plus a hidden
// full-viewport canvas overlay. SSR / pre-JS paints just the slotted content
// (the canvas is empty and display: none); the overlay only shows while a
// burst is in flight (data-pura-confetti-firing, toggled by the client class)
// and only under prefers-reduced-motion: no-preference, so reduced motion
// never shows the overlay at all.
import { EMPTY_SHIM } from "../base.js";

export function confettiTemplate(el = EMPTY_SHIM) {
  const html =
    `<span class="content" part="content"><slot></slot></span>` +
    `<canvas class="burst" part="canvas" aria-hidden="true"></canvas>`;

  const css = `
    :host { display: inline-block; }
    .content { display: inline-block; }
    .burst {
      display: none;
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: var(--pura-confetti-z, 2147483646);
    }
    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-confetti-firing]) .burst { display: block; }
    }
  `;

  return { html, css };
}

// Pure render for <pura-cursor>. No DOM; safe on server (SSR/DSD) and client.
// A fixed full-viewport overlay carrying the two cursor layers: the dot (snaps
// to the pointer) and the ring (lerps behind it, set by the JS rAF loop via
// element transforms). Everything is invisible until the first real pointer
// move (data-pura-cursor-live), so SSR and touch devices never see a stray
// cursor at 0,0. The native cursor is only suppressed when `hide-native` is
// set, and only while the component is connected.
import { EMPTY_SHIM } from "../base.js";

export function cursorTemplate(el = EMPTY_SHIM) {
  const blend = el.hasAttribute("blend");

  const html =
    `<div class="ring" part="ring" aria-hidden="true"><span class="label" part="label"></span></div>` +
    `<div class="dot" part="dot" aria-hidden="true"></div>`;

  const css = `
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483646;
      display: block;
      ${blend ? "mix-blend-mode: difference;" : ""}
    }
    .dot, .ring {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      opacity: 0;
      will-change: transform;
    }
    :host([data-pura-cursor-live]) .dot,
    :host([data-pura-cursor-live]) .ring {
      opacity: 1;
    }
    .dot {
      width: var(--pura-cursor-dot-size, 8px);
      height: var(--pura-cursor-dot-size, 8px);
      margin: calc(var(--pura-cursor-dot-size, 8px) / -2) 0 0 calc(var(--pura-cursor-dot-size, 8px) / -2);
      background: var(--pura-cursor-color, ${blend ? "#fff" : "var(--pura-fg, #09090b)"});
      transition: opacity 0.25s ease;
    }
    .ring {
      width: var(--pura-cursor-ring-size, 36px);
      height: var(--pura-cursor-ring-size, 36px);
      margin: calc(var(--pura-cursor-ring-size, 36px) / -2) 0 0 calc(var(--pura-cursor-ring-size, 36px) / -2);
      border: 1.5px solid var(--pura-cursor-color, ${blend ? "#fff" : "var(--pura-fg, #09090b)"});
      display: grid;
      place-items: center;
      transition: opacity 0.25s ease, width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
        height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), margin 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
        background-color 0.3s ease;
    }
    .label {
      font: 500 0.7rem/1 system-ui, sans-serif;
      color: var(--pura-cursor-label-color, var(--pura-bg, #fff));
      opacity: 0;
      transition: opacity 0.2s ease;
      white-space: nowrap;
    }
    /* Hover over an interactive target: the ring grows. */
    :host([data-pura-cursor-hover]) .ring {
      width: var(--pura-cursor-ring-hover-size, 64px);
      height: var(--pura-cursor-ring-hover-size, 64px);
      margin: calc(var(--pura-cursor-ring-hover-size, 64px) / -2) 0 0 calc(var(--pura-cursor-ring-hover-size, 64px) / -2);
    }
    /* Target carries data-cursor-text: ring fills and shows the text. */
    :host([data-pura-cursor-text]) .ring {
      width: var(--pura-cursor-ring-text-size, 88px);
      height: var(--pura-cursor-ring-text-size, 88px);
      margin: calc(var(--pura-cursor-ring-text-size, 88px) / -2) 0 0 calc(var(--pura-cursor-ring-text-size, 88px) / -2);
      background: var(--pura-cursor-color, ${blend ? "#fff" : "var(--pura-fg, #09090b)"});
    }
    :host([data-pura-cursor-text]) .label {
      opacity: 1;
    }
    :host([data-pura-cursor-text]) .dot {
      opacity: 0;
    }
    /* Touch / no fine pointer: never show. */
    @media (pointer: coarse) {
      :host { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      :host { display: none; }
    }
  `;

  return { html, css };
}

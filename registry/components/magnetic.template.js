// Pure render for <pura-magnetic>. No DOM; safe on server (SSR/DSD) and client.
// Just an inline wrapper around the slotted content; the lean/drag transform is
// applied by JS via --pura-mag-x/--pura-mag-y, eased by the sampled spring. With
// no JS (and on the server) the content sits untransformed, fully usable.
import { EMPTY_SHIM } from "../base.js";

export function magneticTemplate(el = EMPTY_SHIM) {
  const html = `<span class="lean" part="content"><slot></slot></span>`;
  return { html, css: MAGNETIC_CSS };
}

export const MAGNETIC_CSS = `
  :host {
    display: inline-block;
    --pura-mag-x: 0px;
    --pura-mag-y: 0px;
    --pura-mag-dur: 0.6s;
    --pura-mag-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .lean {
    display: inline-block;
    transform: translate(var(--pura-mag-x), var(--pura-mag-y));
    transition: transform var(--pura-mag-dur) var(--pura-mag-ease);
    will-change: transform;
  }
  /* While actively dragging, follow the pointer with no easing lag. */
  :host([data-pura-mag-drag]) .lean { transition: none; }
`;

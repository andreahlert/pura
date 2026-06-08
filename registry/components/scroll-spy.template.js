// Pure render for <pura-scroll-spy>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function scrollSpyTemplate(el = EMPTY_SHIM) {
  const html = `<nav part="nav" role="navigation"><slot></slot></nav>`;
  return { html, css: SCROLL_SPY_CSS };
}

export const SCROLL_SPY_CSS = `
  :host { display: block; }
  [part="nav"] { display: block; }
  /* The component manages aria-current on slotted links; authors style the
     active state via [aria-current] on their own links. We expose a minimal,
     token-based hint so it looks intentional out of the box without forcing it. */
  ::slotted(a) {
    color: var(--pura-muted-fg);
    text-decoration: none;
    border-radius: var(--pura-radius-sm);
    transition: color var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  ::slotted(a:hover) { color: var(--pura-fg); }
  ::slotted(a:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  ::slotted(a[aria-current="location"]) {
    color: var(--pura-fg);
    font-weight: 600;
  }
`;

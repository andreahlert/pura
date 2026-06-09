// Pure render for <pura-typewriter>. No DOM; safe on server (SSR/DSD).
import { EMPTY_SHIM } from "../base.js";

export function readPhrases(el) {
  const raw = el.getAttribute("phrases") || el.getAttribute("text") || "";
  return raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function typewriterTemplate(el = EMPTY_SHIM) {
  const phrases = readPhrases(el);
  const first = phrases[0] || "";
  const caret = el.hasAttribute("caret") ? `<span class="caret" part="caret" aria-hidden="true"></span>` : "";
  // The full first phrase is rendered for no-JS / SSR correctness and read by
  // assistive tech via the host aria-label; the client clears .typed and types
  // into it (aria-hidden) so screen readers are not spammed per character.
  const html = `<span class="typed" part="text" aria-hidden="true">${first}</span>${caret}`;
  return { html, css: TYPEWRITER_CSS };
}

export const TYPEWRITER_CSS = `
  :host { display: inline-block; }

  .caret {
    display: inline-block;
    width: var(--pura-typewriter-caret-width, 0.08em);
    height: 1em;
    margin-left: 0.05em;
    vertical-align: text-bottom;
    background: var(--pura-typewriter-caret-color, currentColor);
    /* base.js RESET collapses animation-duration under reduced motion, so the
       caret holds steady there. */
    animation: pura-typewriter-blink 1s steps(1) infinite;
  }

  @keyframes pura-typewriter-blink {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }
`;

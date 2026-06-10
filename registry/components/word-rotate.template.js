// Pure render for <pura-word-rotate>. No DOM; safe on server (SSR/DSD) and client.
// Renders the full word list into the rotor with only the active word visible, so
// the first paint (and the no-JS page) shows a complete, correctly sized sentence.
// The client swaps words with WAAPI and FLIP-animates the rotor width; nothing in
// this file moves, so SSR output is the final static state.
//
// Accessibility: the animated words are aria-hidden; a visually-hidden .a11y span
// carries the accessible copy (the first word on the server, kept in sync with the
// active word by the client).
import { EMPTY_SHIM } from "../base.js";

export function readWords(el) {
  const raw = el.getAttribute("words") || "";
  return raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function wordRotateTemplate(el = EMPTY_SHIM) {
  const words = readWords(el);
  const spans = words
    .map(
      (w, i) =>
        `<span class="word" part="word" data-index="${i}"${i === 0 ? " data-active" : ""}>${esc(w)}</span>`,
    )
    .join("");
  const html = `<span class="rotor" part="rotor" aria-hidden="true">${spans}</span><span class="a11y">${esc(words[0] || "")}</span>`;
  return { html, css: WORD_ROTATE_CSS };
}

export const WORD_ROTATE_CSS = `
  :host {
    display: inline-block;
    vertical-align: baseline;
  }

  .rotor {
    position: relative;
    display: inline-flex;
    overflow: hidden;
    white-space: nowrap;
    color: var(--pura-word-rotate-color, inherit);
    font-weight: var(--pura-word-rotate-weight, inherit);
    perspective: var(--pura-word-rotate-perspective, 400px);
  }

  /* flip rotates out of the line box and fade never clips, so open overflow up */
  :host([effect="flip"]) .rotor,
  :host([effect="fade"]) .rotor {
    overflow: visible;
  }

  .word {
    display: none;
    white-space: nowrap;
    will-change: transform, opacity;
    backface-visibility: hidden;
    transform-origin: 50% 50%;
  }
  .word[data-active] {
    display: inline-block;
  }
  /* the outgoing word overlays the incoming one while both animate, so the
     incoming word alone defines the rotor's natural (FLIP target) width */
  .word.out {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
  }

  .a11y {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
`;

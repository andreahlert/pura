// Pure render for <pura-letter-shuffle>. No DOM; safe on server (SSR/DSD) and
// client. Renders the text (from the text attribute) split into one
// inline-block span per character, already in the FINAL correct order, so SSR,
// no-JS and reduced motion all show the finished text. The JS layer runs the
// FLIP: it measures each character's slot, offsets every letter to a seeded
// shuffled slot and slides them back home along the X axis with WAAPI. The
// visually-hidden a11y copy carries the readable string; the animated row is
// aria-hidden so screen readers never track the moving letters.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function letterShuffleTemplate(el = EMPTY_SHIM) {
  const text = el.getAttribute("text") || "";

  // One span per non-space character; whitespace flows as plain text and is
  // preserved by white-space: pre on the row (spaces never travel).
  let chars = "";
  for (const ch of text) {
    chars += /\s/.test(ch) ? ch : `<span class="ch" part="char">${esc(ch)}</span>`;
  }

  const html =
    `<span class="a11y">${esc(text)}</span>` +
    `<span class="row" part="text" aria-hidden="true">${chars}</span>`;

  const css = `
    :host {
      display: inline-block;
      --pura-letter-shuffle-easing: cubic-bezier(0.22, 1, 0.36, 1);
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
    .row {
      display: inline-block;
      white-space: pre;
      font: inherit;
      letter-spacing: inherit;
    }
    .ch {
      display: inline-block;
      will-change: transform;
    }

    /* Reduced motion: the row is already in the correct order; pin it there. */
    @media (prefers-reduced-motion: reduce) {
      .ch {
        transform: none !important;
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  return { html, css };
}

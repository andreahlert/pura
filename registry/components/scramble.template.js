// Pure render for <pura-scramble>. No DOM; safe on server (SSR/DSD) and client.
// Renders the FULL final text (from the text attribute) so the content is
// readable before JS, on the server, and under reduced motion. The JS layer
// swaps characters in the .glyphs span during the decode; aria-label on the
// host always carries the real text and the animated span is aria-hidden, so
// screen readers never hear the scramble noise.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function scrambleTemplate(el = EMPTY_SHIM) {
  const text = el.getAttribute("text") || "";

  const html = `<span class="glyphs" part="text" aria-hidden="true">${esc(text)}</span>`;

  const css = `
    :host {
      display: inline-block;
      white-space: pre-wrap;
    }
    .glyphs {
      font: inherit;
      letter-spacing: inherit;
      font-variant-numeric: tabular-nums;
    }
  `;

  return { html, css };
}

// Pure render for <pura-text-pressure>. No DOM; safe on server (SSR/DSD) and client.
// Variable-font pressure: the text is split into per-character spans and each
// glyph carries its own --pura-tp-w / --pura-tp-s custom properties, which the
// client writes per frame from the pointer distance. The axes ride the native
// font-weight (wght) and font-stretch (wdth) properties, not
// font-variation-settings: both are natively animatable and always re-rasterize
// the glyph (Chromium does not re-render a glyph when an *animated* value
// reaches font-variation-settings through var()). A short CSS transition on the
// two properties smooths the rAF writes into a fluid bulge.
//
// SSR: when the `text` attribute is set the spans are rendered right here, at
// the base (from) axes, so the server paint is the settled, readable state.
// Without `text` the slotted light-DOM copy shows until the client splits it.
// Reduced motion: the transition is gated behind no-preference and the client
// never drives the axes, so the text simply sits at its base axes.
import { EMPTY_SHIM } from "../base.js";

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

function escapeHTML(s) {
  return String(s).replace(/[&<>"]/g, (c) => ESC[c]);
}

// Pure: normalize whitespace, then emit one inline-block .word per word (so
// wrapping never breaks mid-word) containing one .char span per character.
// Deterministic string math only; shared by the server template and the
// client's slotted-text fallback.
export function pressureSpans(text) {
  const words = String(text).replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  return words
    .map(
      (w) =>
        `<span class="word" part="word">` +
        [...w].map((ch) => `<span class="char" part="char">${escapeHTML(ch)}</span>`).join("") +
        `</span>`,
    )
    .join(" ");
}

export function textPressureTemplate(el = EMPTY_SHIM) {
  const num = (name, fallback) => {
    const n = Number(el.getAttribute(name));
    return Number.isFinite(n) ? n : fallback;
  };
  const fromWght = num("from-wght", 400);
  const fromWdth = num("from-wdth", 100);
  const text = el.getAttribute("text") || "";
  const spans = text ? pressureSpans(text) : "";
  const a11y = text ? escapeHTML(String(text).replace(/\s+/g, " ").trim()) : "";

  // .src holds the animated per-glyph spans (aria-hidden); .a11y keeps the
  // accessible copy (the text attribute's value and/or the slotted original).
  const html = `<span class="src" part="text" aria-hidden="true">${spans}</span><span class="a11y">${a11y}<slot></slot></span>`;

  const css = `
    :host { display: block; }

    /* The animated copy shows when it has content: rendered by the server for
       text="...", or built by the client from the slot (data-pura-tp-ready). */
    .src { display: none; }
    :host([text]) .src,
    :host([data-pura-tp-ready]) .src { display: inline; }
    :host([text]) .a11y,
    :host([data-pura-tp-ready]) .a11y {
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

    .word { display: inline-block; white-space: nowrap; }
    .char {
      display: inline-block;
      font-weight: var(--pura-tp-w, ${fromWght});
      font-stretch: calc(var(--pura-tp-s, ${fromWdth}) * 1%);
    }

    /* The transition smooths the per-frame pointer writes; under reduced
       motion the client never drives the axes and this block is inert. */
    @media (prefers-reduced-motion: no-preference) {
      .char {
        transition:
          font-weight var(--pura-text-pressure-duration, 0.16s) var(--pura-text-pressure-ease, ease-out),
          font-stretch var(--pura-text-pressure-duration, 0.16s) var(--pura-text-pressure-ease, ease-out);
        will-change: font-weight, font-stretch;
      }
    }
  `;

  return { html, css };
}

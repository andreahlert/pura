// Pure render for <pura-split-flap>. No DOM; safe on server (SSR/DSD) and client.
// Airport-style split-flap board: each character is a cell with a top and a
// bottom half. The template lays out two layers: .board holds the per-character
// cells (aria-hidden, JS drives the 3D flips), and .a11y keeps the original
// text accessible. The slot's fallback content is the `text` attribute, so a
// text-attribute-only usage is still readable by assistive tech.
//
// SSR / pre-JS: when `text` is set, the board renders static cells already
// locked on the final glyphs (presentable with zero JS); otherwise the slotted
// text shows as plain styled text. Reduced motion: JS skips straight to the
// final glyphs; the static paint is already the end state.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// One static cell locked on a glyph: just the two static halves, no flaps.
function staticCell(ch) {
  const g = esc(ch);
  return (
    `<span class="cell" part="cell">` +
    `<span class="half top"><span class="g">${g}</span></span>` +
    `<span class="half bottom"><span class="g">${g}</span></span>` +
    `</span>`
  );
}

export function splitFlapTemplate(el = EMPTY_SHIM) {
  const text = el.getAttribute("text") || "";
  // The default glyph ring is uppercase, so the displayed glyphs are too.
  const display = el.hasAttribute("chars") ? text : text.toUpperCase();
  const cells = [...display].map(staticCell).join("");

  const html =
    `<span class="board" part="board" aria-hidden="true">${cells}</span>` +
    `<span class="a11y"><slot>${esc(text)}</slot></span>`;

  const css = `
    :host {
      display: inline-block;
      font-family: var(--pura-split-flap-font, ui-monospace, "SF Mono", Menlo, Consolas, monospace);
      font-weight: var(--pura-split-flap-weight, 600);
      line-height: 1;
    }
    .board {
      display: inline-flex;
      flex-wrap: wrap;
      gap: var(--pura-split-flap-gap, 0.12em);
      vertical-align: middle;
    }

    /* The accessible copy collapses to screen-reader-only once the board is
       showing the same text: pre-JS when text= prerendered the cells, and
       post-JS once the element flagged itself ready. */
    :host([text]) .a11y,
    :host([data-pura-flap-ready]) .a11y {
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

    .cell {
      position: relative;
      width: var(--pura-split-flap-width, 1.12em);
      height: var(--pura-split-flap-height, 1.5em);
      border-radius: var(--pura-split-flap-radius, 0.14em);
      background: var(--pura-split-flap-bg, #1c1c1f);
      color: var(--pura-split-flap-fg, #f4f4f5);
      perspective: var(--pura-split-flap-perspective, 320px);
    }
    /* hinge seam across the middle */
    .cell::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 1px;
      transform: translateY(-0.5px);
      background: var(--pura-split-flap-divider, rgba(0, 0, 0, 0.55));
      z-index: 4;
      pointer-events: none;
    }

    .half, .flap {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      overflow: hidden;
      background: var(--pura-split-flap-bg, #1c1c1f);
    }
    .top {
      top: 0;
      border-radius: var(--pura-split-flap-radius, 0.14em) var(--pura-split-flap-radius, 0.14em) 0 0;
    }
    .bottom {
      bottom: 0;
      border-radius: 0 0 var(--pura-split-flap-radius, 0.14em) var(--pura-split-flap-radius, 0.14em);
    }

    /* Each half shows its 50% of a full-cell-height glyph box. */
    .g {
      position: absolute;
      left: 0;
      width: 100%;
      height: 200%;
      display: grid;
      place-items: center;
    }
    .top .g { top: 0; }
    .bottom .g { bottom: 0; }

    /* Moving leaves: the top flap folds down over the seam (rotateX 0 to -90),
       then the bottom flap unfolds (rotateX 90 to 0). JS shows them only while
       a step is in flight. */
    .flap {
      visibility: hidden;
      z-index: 3;
      backface-visibility: hidden;
      will-change: transform;
    }
    .flap.top { transform-origin: 50% 100%; }
    .flap.bottom { transform-origin: 50% 0%; transform: rotateX(90deg); }
    /* subtle depth shading on the moving leaves */
    .flap::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--pura-split-flap-sheen, rgba(255, 255, 255, 0.04));
      pointer-events: none;
    }

    /* The flips are WAAPI-driven, so the JS side checks prefers-reduced-motion
       and jumps straight to the final glyphs; here we just make sure no moving
       leaf could linger visible. */
    @media (prefers-reduced-motion: reduce) {
      .flap { visibility: hidden !important; }
    }
  `;

  return { html, css };
}

// Pure render for <pura-line-shadow-text>. No DOM; safe on server (SSR/DSD)
// and client. Display text with a hard offset shadow built from diagonal
// stripes that slide behind the characters in a continuous CSS loop, for an
// editorial / brutalist look. The shadow layer is an aria-hidden duplicate of
// the text painted with a diagonal linear gradient tile clipped to the glyphs
// (background-clip: text); the loop animates background-position only, so no
// per-frame JS runs.
//
// SSR / pre-JS: when the `text` attribute is set, the striped shadow paints
// from the first byte. Without it the slotted text renders alone (still fully
// presentable) and the client fills the shadow copy from the slot.
// Reduced motion: the stripes render as a static hard shadow, no movement.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

// Keep only characters that can appear in a plain CSS <color> value so the
// attribute can be inlined into the stylesheet safely.
function safeColor(s) {
  return String(s).replace(/[^#a-zA-Z0-9(),.%\s-]/g, "").trim();
}

export function lineShadowTextTemplate(el = EMPTY_SHIM) {
  const text = el.getAttribute("text") || "";
  const speedAttr = parseFloat(el.getAttribute("speed"));
  const speed = Number.isFinite(speedAttr) && speedAttr > 0 ? speedAttr : 30;
  const color = safeColor(el.getAttribute("shadow-color") || "");

  const html = `<span class="wrap" part="wrap"><span class="shadow" part="shadow" aria-hidden="true">${esc(text)}</span><span class="text" part="text"><slot></slot></span></span>`;

  const css = `
    :host {
      display: inline-block;
      --pura-line-shadow-text-color: ${color || "currentColor"};
      --pura-line-shadow-text-offset: 0.04em;
      --pura-line-shadow-text-size: 0.06em;
      --pura-line-shadow-text-speed: ${speed}s;
    }
    .wrap {
      position: relative;
      display: inline-block;
    }
    .text {
      position: relative;
      z-index: 1;
    }

    /* The hard shadow: a duplicate of the text offset down-right, painted with
       a diagonal stripe tile and clipped to the glyph shapes. Animating only
       background-position keeps it compositor-cheap. */
    .shadow {
      position: absolute;
      top: var(--pura-line-shadow-text-offset);
      left: var(--pura-line-shadow-text-offset);
      z-index: 0;
      white-space: pre;
      pointer-events: none;
      user-select: none;
      -webkit-user-select: none;
      background-image: linear-gradient(
        45deg,
        transparent 45%,
        var(--pura-line-shadow-text-color) 45%,
        var(--pura-line-shadow-text-color) 55%,
        transparent 55%
      );
      background-size: var(--pura-line-shadow-text-size) var(--pura-line-shadow-text-size);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    @keyframes pura-line-shadow-slide {
      from { background-position: 0% 0%; }
      to   { background-position: 100% -100%; }
    }

    /* Continuous loop only when the user has not asked for reduced motion;
       under reduce the stripes stay as a static hard shadow. */
    @media (prefers-reduced-motion: no-preference) {
      .shadow {
        animation: pura-line-shadow-slide var(--pura-line-shadow-text-speed, 30s) linear infinite;
      }
    }
  `;

  return { html, css };
}

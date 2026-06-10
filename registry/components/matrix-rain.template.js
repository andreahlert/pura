// Pure render for <pura-matrix-rain>. No DOM; safe on server (SSR/DSD) and client.
// Matrix-style digital rain: columns of glyphs falling behind the slotted
// content, with a glowing lead character and a fading trail. The SSR / pre-JS
// paint is a dark backdrop with a deterministic frozen glyph field (index math,
// no Math.random), so the page looks right with zero script. Client JS draws
// the live rain on a canvas and sets data-pura-matrix-ready on the host, which
// swaps the visible layer to the canvas. Under prefers-reduced-motion: reduce
// the swap never happens, so the rain stays frozen on the static field.
import { EMPTY_SHIM } from "../base.js";

// Safe for HTML text nodes: no "&", "<" or ">" in the set.
export const MATRIX_GLYPHS =
  "アィウカキクサシスセタチツテナニヌハヒフマミムヤユヨラリルレワン0123456789Z*+=";

const FIELD_COLUMNS = 16;

// Deterministic per-index column so the server and client paint byte-identical
// static fields (no Math.random, which would diverge between renders).
function columnMarkup(i) {
  const rows = 8 + ((i * 5) % 7); // 8..14 glyphs
  const left = (((i + 0.5) * 100) / FIELD_COLUMNS).toFixed(2);
  const top = (i * 37) % 55; // vertical stagger, %
  const dim = ((55 + ((i * 17) % 40)) / 100).toFixed(2); // 0.55..0.94
  let body = "";
  for (let r = 0; r < rows - 1; r++) {
    body += MATRIX_GLYPHS[(i * 13 + r * 7) % MATRIX_GLYPHS.length] + "\n";
  }
  const lead = MATRIX_GLYPHS[(i * 13 + (rows - 1) * 7) % MATRIX_GLYPHS.length];
  return `<span class="col" style="left:${left}%;top:${top}%;opacity:${dim}">${body}<b class="lead">${lead}</b></span>`;
}

export function matrixRainTemplate(el = EMPTY_SHIM) {
  const raw = parseFloat(el.getAttribute("font-size"));
  const size = Number.isFinite(raw) && raw >= 8 && raw <= 64 ? raw : 16;

  let cols = "";
  for (let i = 0; i < FIELD_COLUMNS; i++) cols += columnMarkup(i);

  const html =
    `<canvas class="canvas" part="canvas" aria-hidden="true"></canvas>` +
    `<span class="field" part="field" aria-hidden="true">${cols}</span>` +
    `<div class="content" part="content"><slot></slot></div>`;

  const css = `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      background: var(--pura-matrix-rain-bg, #050505);
    }

    .canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: none;
    }

    /* Static frozen rain: the entire SSR / pre-JS / reduced-motion paint. */
    .field {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      font: 700 ${size}px/1.2 var(--pura-matrix-rain-font, ui-monospace, "SF Mono", Menlo, monospace);
      color: var(--pura-matrix-rain-color, #00ff66);
    }

    .col {
      position: absolute;
      white-space: pre;
      text-align: center;
      transform: translateX(-50%);
      -webkit-mask-image: linear-gradient(to bottom, transparent, #000 70%);
      mask-image: linear-gradient(to bottom, transparent, #000 70%);
    }

    .lead {
      font-weight: inherit;
      color: var(--pura-matrix-rain-lead-color, #eafff2);
      text-shadow:
        0 0 8px var(--pura-matrix-rain-color, #00ff66),
        0 0 2px var(--pura-matrix-rain-lead-color, #eafff2);
    }

    .content {
      position: relative;
      height: 100%;
    }

    /* The canvas enhancement only ever shows when motion is allowed. Under
       prefers-reduced-motion: reduce this block never applies, so the host
       keeps the frozen static field even if JS already marked it ready. */
    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-matrix-ready]) .canvas { display: block; }
      :host([data-pura-matrix-ready]) .field { display: none; }
    }
  `;

  return { html, css };
}

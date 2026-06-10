// Pure render for <pura-progressive-blur>. No DOM; safe on server (SSR/DSD)
// and client. Progressive blur on the edges of a scrollable container: content
// leaving the reading area dissolves into a gradient blur instead of a hard
// cut. Implemented as N stacked overlay layers per edge, each applying a
// stronger backdrop-filter: blur() and clipped by a linear-gradient mask band,
// so the blur ramps smoothly from zero (inside) to the maximum (at the edge).
// 100% CSS: no listeners, no per-frame JS, nothing animates.
//
// SSR / pre-JS: identical paint (the effect is static CSS over the backdrop).
// Browsers without backdrop-filter: layers hide; an optional solid fade
// (--pura-progressive-blur-fade) covers the edge instead.
// Reduced motion: nothing to gate; the effect is stationary by construction.
import { EMPTY_SHIM } from "../base.js";

const EDGE_SETS = {
  vertical: ["top", "bottom"],
  horizontal: ["left", "right"],
  all: ["top", "bottom", "left", "right"],
  top: ["top"],
  bottom: ["bottom"],
  left: ["left"],
  right: ["right"],
};

// Mask gradient direction per edge: blur is strongest at the outer side.
const EDGE_DIR = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
};

// Absolute placement of each edge band inside the host.
const EDGE_POS = {
  top: "top: 0; left: 0; right: 0; height: var(--pura-progressive-blur-size, 4rem);",
  bottom: "bottom: 0; left: 0; right: 0; height: var(--pura-progressive-blur-size, 4rem);",
  left: "left: 0; top: 0; bottom: 0; width: var(--pura-progressive-blur-size, 4rem);",
  right: "right: 0; top: 0; bottom: 0; width: var(--pura-progressive-blur-size, 4rem);",
};

function clampInt(raw, min, max, fallback) {
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Round to 2 decimals for stable, compact CSS output.
function fmt(n) {
  return String(Math.round(n * 100) / 100);
}

export function progressiveBlurTemplate(el = EMPTY_SHIM) {
  const edges = EDGE_SETS[el.getAttribute("edges")] || EDGE_SETS.vertical;
  const layers = clampInt(el.getAttribute("layers"), 2, 8, 5);

  // Attribute overrides are baked into :host so SSR and client paint match.
  const blurN = parseFloat(el.getAttribute("blur"));
  const blurDecl =
    Number.isFinite(blurN) && blurN > 0
      ? `--pura-progressive-blur-max: ${fmt(blurN)}px;`
      : "";
  const sizeRaw = (el.getAttribute("size") || "").trim();
  const sizeVal = /^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(sizeRaw)
    ? sizeRaw
    : /^\d+(\.\d+)?$/.test(sizeRaw)
      ? `${sizeRaw}px`
      : "";
  const sizeDecl = sizeVal ? `--pura-progressive-blur-size: ${sizeVal};` : "";

  const layerDivs = Array.from(
    { length: layers },
    (_, k) => `<div class="layer layer-${k + 1}" part="layer layer-${k + 1}"></div>`
  ).join("");

  const edgeDivs = edges
    .map(
      (e) =>
        `<div class="edge edge-${e}" part="edge edge-${e}" aria-hidden="true">${layerDivs}</div>`
    )
    .join("");

  const html = `<div class="scroller" part="scroller" tabindex="0"><slot></slot></div>${edgeDivs}`;

  // Per-layer rules. Layer 1 is the innermost (weakest blur); layer N hugs the
  // edge (full blur). Blur halves per step inward (max, max/2, max/4, ...) and
  // each layer is masked to a band so adjacent layers cross-fade, producing a
  // smooth ramp instead of visible blur steps. Deterministic index math only.
  const seg = 100 / (layers + 1);
  let layerCss = "";
  for (let i = 1; i <= layers; i++) {
    const divisor = Math.pow(2, layers - i);
    const blurExpr =
      divisor === 1
        ? "var(--pura-progressive-blur-max, 12px)"
        : `calc(var(--pura-progressive-blur-max, 12px) / ${divisor})`;
    layerCss += `
    .layer-${i} {
      -webkit-backdrop-filter: blur(${blurExpr});
      backdrop-filter: blur(${blurExpr});
    }`;
    for (const e of edges) {
      const grad = `linear-gradient(${EDGE_DIR[e]}, transparent ${fmt((i - 1) * seg)}%, #000 ${fmt(i * seg)}%, #000 ${fmt((i + 1) * seg)}%, transparent ${fmt((i + 2) * seg)}%)`;
      layerCss += `
    .edge-${e} .layer-${i} {
      -webkit-mask-image: ${grad};
      mask-image: ${grad};
    }`;
    }
  }

  const edgeCss = edges
    .map((e) => `.edge-${e} { ${EDGE_POS[e]} }`)
    .join("\n    ");

  // Fallback fade direction per edge for browsers without backdrop-filter.
  const fadeCss = edges
    .map(
      (e) =>
        `.edge-${e} { background: linear-gradient(${EDGE_DIR[e]}, transparent, var(--pura-progressive-blur-fade, transparent)); }`
    )
    .join("\n      ");

  const css = `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      ${blurDecl}
      ${sizeDecl}
    }
    .scroller {
      width: 100%;
      height: 100%;
      overflow: auto;
      overscroll-behavior: contain;
    }
    .scroller:focus-visible {
      outline: 2px solid var(--pura-ring, currentColor);
      outline-offset: -2px;
    }
    .edge {
      position: absolute;
      z-index: 1;
      pointer-events: none;
    }
    ${edgeCss}
    .layer {
      position: absolute;
      inset: 0;
    }
    ${layerCss}

    /* No backdrop-filter: hide the layers and fall back to a plain gradient
       fade (transparent by default; set the token to your surface color). */
    @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
      .layer { display: none; }
      ${fadeCss}
    }
  `;

  return { html, css };
}

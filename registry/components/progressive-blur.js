// <pura-progressive-blur> — gradient blur on the edges of a scrollable
// container: content leaving the reading area dissolves into a progressive
// blur instead of cutting off hard. Premium finish for lists, feeds and
// sidebars. Stacked backdrop-filter layers clipped by gradient masks; 100%
// CSS, SSR-safe, no scroll listeners, no per-frame JS.
//
// Attributes:
//   edges  — "vertical" (default, top + bottom) | "horizontal" | "top" |
//            "bottom" | "left" | "right" | "all".
//   blur   — maximum blur in px at the outer edge (number, default 12).
//   size   — depth of the blur zone; CSS length or bare px number
//            (default 4rem).
//   layers — stacked backdrop-filter layers, 2..8 (default 5). More layers =
//            smoother ramp, slightly more paint work.
//
// Tokens: --pura-progressive-blur-max (max blur), --pura-progressive-blur-size
//   (zone depth), --pura-progressive-blur-fade (fallback fade color used when
//   backdrop-filter is unsupported; default transparent).
//
// Reduced motion: the effect is stationary by construction (no animation, no
// transitions), so there is nothing to gate; reduce renders identically.
// Accessibility: edge overlays are aria-hidden and pointer-events: none; the
// internal scroller has tabindex="0" so keyboard users can scroll it.
//
// Agent-native layer: each instance registers in window.__puraProgressiveBlurs
//   by data-pura-id with { id, edges, blur, size, layers, el }; data-pura-pb-*
//   attributes mirror the live config.
import { PuraElement, define } from "../base.js";
import meta from "./progressive-blur.meta.js";
import { progressiveBlurTemplate } from "./progressive-blur.template.js";

let uid = 0;

const EDGE_VALUES = ["vertical", "horizontal", "all", "top", "bottom", "left", "right"];

// Lazily-created global registry so agents can enumerate every instance.
function registry() {
  return (window.__puraProgressiveBlurs ||= new Map());
}

class PuraProgressiveBlur extends PuraElement {
  static observedAttributes = ["edges", "blur", "size", "layers"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-progressive-blur-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = progressiveBlurTemplate(this);
    this.render(html, css);
    this._rendered = true;

    this._reflect();
  }

  disconnectedCallback() {
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._rendered) return;
    // Config changed: re-render the (config-derived) CSS, preserving the
    // scroll position of the inner scroller.
    const prev = this.$(".scroller");
    const top = prev ? prev.scrollTop : 0;
    const left = prev ? prev.scrollLeft : 0;
    const { html, css } = progressiveBlurTemplate(this);
    this.render(html, css);
    const next = this.$(".scroller");
    if (next) {
      next.scrollTop = top;
      next.scrollLeft = left;
    }
    this._reflect();
  }

  // ---- config ---------------------------------------------------------------
  get edges() {
    const v = this.getAttribute("edges");
    return EDGE_VALUES.includes(v) ? v : "vertical";
  }

  get blur() {
    const n = parseFloat(this.getAttribute("blur"));
    return Number.isFinite(n) && n > 0 ? n : 12;
  }

  get size() {
    const raw = (this.getAttribute("size") || "").trim();
    if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(raw)) return raw;
    if (/^\d+(\.\d+)?$/.test(raw)) return `${raw}px`;
    return "4rem";
  }

  get layers() {
    const n = parseInt(this.getAttribute("layers"), 10);
    if (!Number.isFinite(n)) return 5;
    return Math.min(8, Math.max(2, n));
  }

  // Stable machine-readable mirror of state on the host element + registry.
  _reflect() {
    this.setAttribute("data-pura-pb-edges", this.edges);
    this.setAttribute("data-pura-pb-blur", String(this.blur));
    this.setAttribute("data-pura-pb-size", this.size);
    this.setAttribute("data-pura-pb-layers", String(this.layers));
    registry().set(this._id, {
      id: this._id,
      edges: this.edges,
      blur: this.blur,
      size: this.size,
      layers: this.layers,
      el: this,
    });
  }
}

define("pura-progressive-blur", PuraProgressiveBlur, meta);
export { PuraProgressiveBlur };

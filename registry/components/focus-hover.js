// <pura-focus-hover> — focus-cards container: the item under the cursor (or
// holding keyboard focus) stays sharp while its siblings blur, dim and shrink.
// The classic portfolio / card-grid spotlight, done in pure CSS on ::slotted()
// children: zero per-frame JS, fully SSR-safe (no hover on the server means
// the grid simply paints in its neutral resting state).
//
// Attributes:
//   columns — grid column count (default 3).
//   blur    — blur in px applied to non-focused siblings (default 4).
//   dim     — opacity of non-focused siblings, 0..1 (default 0.55).
//   shrink  — scale of non-focused siblings (default 0.97).
//   grow    — scale of the focused item (default 1.02).
//
// Tokens: --pura-focus-hover-columns, --pura-focus-hover-gap,
//   --pura-focus-hover-blur, --pura-focus-hover-dim, --pura-focus-hover-shrink,
//   --pura-focus-hover-grow, --pura-focus-hover-duration, --pura-focus-hover-ease.
//
// Reduced motion: the transition only runs under prefers-reduced-motion:
// no-preference; with reduce the focused/receded states swap instantly.
// Keyboard: :focus-visible inside a card triggers the same spotlight as hover.
//
// Agent-native layer: each instance registers in window.__puraFocusHovers by
//   data-pura-id with { id, columns, blur, dim, shrink, grow, el };
//   data-pura-fh-* attributes mirror the effective config.
import { PuraElement, define } from "../base.js";
import meta from "./focus-hover.meta.js";
import { focusHoverTemplate } from "./focus-hover.template.js";

let uid = 0;

function registry() {
  return (window.__puraFocusHovers ||= new Map());
}

class PuraFocusHover extends PuraElement {
  static observedAttributes = ["columns", "blur", "dim", "shrink", "grow"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-focus-hover-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = focusHoverTemplate(this);
    this.render(html, css);

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this.shadowRoot?.childNodes.length) this._sync();
  }

  // ---- config ---------------------------------------------------------------
  get columns() {
    const n = parseInt(this.getAttribute("columns") || "", 10);
    return Number.isFinite(n) && n > 0 ? n : 3;
  }
  get blur() {
    const n = parseFloat(this.getAttribute("blur"));
    return Number.isFinite(n) && n >= 0 ? n : 4;
  }
  get dim() {
    const n = parseFloat(this.getAttribute("dim"));
    return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.55;
  }
  get shrink() {
    const n = parseFloat(this.getAttribute("shrink"));
    return Number.isFinite(n) && n > 0 ? n : 0.97;
  }
  get grow() {
    const n = parseFloat(this.getAttribute("grow"));
    return Number.isFinite(n) && n > 0 ? n : 1.02;
  }

  // Drive the CSS via host custom properties; only attribute-provided values
  // are inlined so stylesheet tokens keep working as overrides.
  _sync() {
    const set = (prop, attr, value) => {
      if (this.hasAttribute(attr)) this.style.setProperty(prop, value);
      else this.style.removeProperty(prop);
    };
    set("--pura-focus-hover-columns", "columns", String(this.columns));
    set("--pura-focus-hover-blur", "blur", `${this.blur}px`);
    set("--pura-focus-hover-dim", "dim", String(this.dim));
    set("--pura-focus-hover-shrink", "shrink", String(this.shrink));
    set("--pura-focus-hover-grow", "grow", String(this.grow));
    this._reflectAgentState();
  }

  // Stable machine-readable mirror of the effective config + registry entry.
  _reflectAgentState() {
    this.setAttribute("data-pura-fh-columns", String(this.columns));
    this.setAttribute("data-pura-fh-blur", String(this.blur));
    this.setAttribute("data-pura-fh-dim", String(this.dim));
    this.setAttribute("data-pura-fh-shrink", String(this.shrink));
    this.setAttribute("data-pura-fh-grow", String(this.grow));
    registry().set(this._id, {
      id: this._id,
      columns: this.columns,
      blur: this.blur,
      dim: this.dim,
      shrink: this.shrink,
      grow: this.grow,
      el: this,
    });
  }
}

define("pura-focus-hover", PuraFocusHover, meta);
export { PuraFocusHover };

// <pura-parallax-columns>. A grid of images split into columns that translate
// in opposite directions as you scroll (the Aceternity "Parallax Scroll" /
// "Hero Parallax" moves), done natively: the host carries a named view
// timeline and each column, selected by nth-child math over the slotted
// children, scrubs its own translateY drift on that shared timeline, so the
// multi-track orchestration that <pura-parallax> (one element, one speed
// factor) cannot express runs with zero per-frame JS. The hero variant adds a
// perspective wrapper and tilts the whole grid (rotateX) while fading it in
// over the entry range.
//
// Attributes:
//   columns — number of columns, 2..6 (default 3).
//   shift   — CSS length each column drifts from center (default 120px).
//   range   — animation-range for the column scrub (default "cover 0% cover 100%").
//   hero    — boolean; adds the perspective rotateX tilt + fade on entry.
//
// Tokens: --pura-parallax-columns-shift, --pura-parallax-columns-gap (1rem),
//   --pura-parallax-columns-radius (12px), --pura-parallax-columns-tilt (15deg),
//   --pura-parallax-columns-perspective (1200px),
//   --pura-parallax-columns-fade-from (0.4).
//
// SSR / pre-JS, unsupported browsers and reduced motion: a static grid.
//
// Agent-native layer: each instance registers in window.__puraParallaxColumnss
//   by data-pura-id with { columns, hero, shift, el }; data-pura-plc-* mirror
//   config.
import { PuraElement, define } from "../base.js";
import meta from "./parallax-columns.meta.js";
import { parallaxColumnsTemplate } from "./parallax-columns.template.js";

let uid = 0;

function registry() {
  return (window.__puraParallaxColumnss ||= new Map());
}

class PuraParallaxColumns extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-parallax-columns-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = parallaxColumnsTemplate(this);
    this.render(html, css);

    const columns = this.columns;
    this.style.setProperty("--pura-plc-cols", String(columns));
    const shift = this.getAttribute("shift");
    if (shift) this.style.setProperty("--pura-parallax-columns-shift", shift);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-plc-range", range);

    this.setAttribute("data-pura-plc-scrub", "");
    this.setAttribute("data-pura-plc-columns", String(columns));
    this.setAttribute("data-pura-plc-shift", shift || "120px");
    if (this.hasAttribute("hero")) this.setAttribute("data-pura-plc-hero", "");
    else this.removeAttribute("data-pura-plc-hero");

    registry().set(this._id, {
      id: this._id,
      columns,
      hero: this.hasAttribute("hero"),
      shift: shift || "120px",
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get columns() {
    const n = parseInt(this.getAttribute("columns"), 10);
    return Number.isFinite(n) && n >= 2 && n <= 6 ? n : 3;
  }
}

define("pura-parallax-columns", PuraParallaxColumns, meta);
export { PuraParallaxColumns };

// <pura-lens> — magnifying lens under the cursor: a scaled copy of the slotted
// media, clipped to a circle (clip-path: circle()) that follows the pointer,
// like a physical loupe over a product photo. The classic e-commerce zoom.
// Event-driven (pointermove updates two CSS vars), no rAF loop; the copy is
// cloned from the light DOM into the shadow lens layer, so it works for any
// slotted content, not only <img>.
//
// Attributes:
//   zoom — magnification factor, > 1 (default 2).
//   size — lens diameter in px (default 160).
//
// Tokens: --pura-lens-ring (lens border, default 2px solid rgba(255,255,255,.65)),
//   --pura-lens-shadow (lens drop shadow), --pura-lens-cursor (default crosshair).
//
// Reduced motion: the lens is pointer-driven, not a keyframe loop, so there is
// no continuous animation to collapse; only the opacity fade is gated behind
// prefers-reduced-motion: no-preference in the template.
// SSR / pre-JS: the lens layer is empty and transparent; only the plain media
// paints. Accessibility: the magnified copy and the ring are aria-hidden, the
// original slotted media stays the single accessible source.
//
// Agent-native layer: each instance registers in window.__puraLenss by
//   data-pura-id with { zoom, size, show(x, y), hide, el }; data-pura-lens-zoom
//   and data-pura-lens-size mirror config, data-pura-lens-active mirrors state.
import { PuraElement, define } from "../base.js";
import meta from "./lens.meta.js";
import { lensTemplate } from "./lens.template.js";

let uid = 0;

function registry() {
  return (window.__puraLenss ||= new Map());
}

class PuraLens extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-lens-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = lensTemplate(this);
    this.render(html, css);

    this.setAttribute("data-pura-lens-zoom", String(this.zoom));
    this.setAttribute("data-pura-lens-size", String(this.size));

    this._zoomed = this.$(".zoomed");
    this._slot = this.$("slot");
    this._onSlot = () => this._sync();
    this._slot.addEventListener("slotchange", this._onSlot);
    this._sync();

    this._bind();

    registry().set(this._id, {
      id: this._id,
      zoom: this.zoom,
      size: this.size,
      show: (x, y) => this._show(x, y),
      hide: () => this._hide(),
      el: this,
    });
  }

  disconnectedCallback() {
    this._unbind();
    this._slot?.removeEventListener("slotchange", this._onSlot);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get zoom() {
    const n = parseFloat(this.getAttribute("zoom"));
    return Number.isFinite(n) && n > 1 ? n : 2;
  }
  get size() {
    const n = parseFloat(this.getAttribute("size"));
    return Number.isFinite(n) && n > 0 ? n : 160;
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    this._onMove = (e) => {
      const r = this.getBoundingClientRect();
      if (!r.width || !r.height) return;
      this._show(e.clientX - r.left, e.clientY - r.top);
    };
    this._onLeave = () => this._hide();
    this.addEventListener("pointermove", this._onMove);
    this.addEventListener("pointerleave", this._onLeave);
    this.addEventListener("pointercancel", this._onLeave);
  }
  _unbind() {
    this.removeEventListener("pointermove", this._onMove);
    this.removeEventListener("pointerleave", this._onLeave);
    this.removeEventListener("pointercancel", this._onLeave);
  }

  // ---- internals ------------------------------------------------------------
  // Mirror the slotted light DOM into the shadow lens layer. Clones live in
  // the shadow scope, so duplicated ids cannot collide with the document.
  _sync() {
    if (!this._zoomed || !this._slot) return;
    this._zoomed.innerHTML = "";
    for (const node of this._slot.assignedElements()) {
      this._zoomed.appendChild(node.cloneNode(true));
    }
  }

  _show(x, y) {
    this.style.setProperty("--pura-lens-x", `${x.toFixed(1)}px`);
    this.style.setProperty("--pura-lens-y", `${y.toFixed(1)}px`);
    if (!this.hasAttribute("data-pura-lens-active")) {
      this.setAttribute("data-pura-lens-active", "");
      this.dispatchEvent(new CustomEvent("pura-lens-show", { bubbles: true, detail: { id: this._id } }));
    }
  }

  _hide() {
    if (!this.hasAttribute("data-pura-lens-active")) return;
    this.removeAttribute("data-pura-lens-active");
    this.dispatchEvent(new CustomEvent("pura-lens-hide", { bubbles: true, detail: { id: this._id } }));
  }
}

define("pura-lens", PuraLens, meta);
export { PuraLens };

// <pura-skeleton> — loading placeholder. Attributes: width, height (CSS lengths
// applied to the placeholder part), circle (boolean -> full border-radius).
// Animates a subtle shimmer over var(--pura-subtle); falls back to a pulse and
// honors prefers-reduced-motion (handled by the base reset).
import { PuraElement, define } from "../base.js";
import meta from "./skeleton.meta.js";
import { skeletonTemplate } from "./skeleton.template.js";

class PuraSkeleton extends PuraElement {
  static observedAttributes = ["width", "height", "circle"];

  connectedCallback() {
    const { html, css } = skeletonTemplate(this);
    this.render(html, css);
    this.setAttribute("aria-busy", "true");
    this._el = this.$('[part="skeleton"]');
    this._sync();
  }

  attributeChangedCallback() {
    if (this._el) this._sync();
  }

  _sync() {
    const width = this.getAttribute("width");
    const height = this.getAttribute("height");
    this._el.style.width = width || "";
    this._el.style.height = height || "";
  }
}


define("pura-skeleton", PuraSkeleton, meta);
export { PuraSkeleton };

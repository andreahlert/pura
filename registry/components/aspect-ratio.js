// <pura-aspect-ratio> — maintains a fixed aspect ratio for slotted content.
// Attributes: ratio (e.g. "16/9", "4:3", "1.5", default "1/1"), rounded
// (boolean, applies var(--pura-radius)). Slotted media/content fills 100%
// width & height with object-fit cover; overflow is clipped.
import { PuraElement, define } from "../base.js";
import meta from "./aspect-ratio.meta.js";
import { aspectRatioTemplate } from "./aspect-ratio.template.js";

class PuraAspectRatio extends PuraElement {
  static observedAttributes = ["ratio", "rounded"];

  connectedCallback() {
    const { html, css } = aspectRatioTemplate(this);
    this.render(html, css);
    this._sync();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._sync();
  }

  // Parse the ratio attr into a valid CSS aspect-ratio value. Accepts
  // "16/9", "16:9", "1.78" or a single number; falls back to "1 / 1".
  _ratio() {
    const raw = (this.getAttribute("ratio") || "1/1").trim();
    const m = raw.match(/^(\d*\.?\d+)\s*[\/:]\s*(\d*\.?\d+)$/);
    if (m) {
      const w = parseFloat(m[1]);
      const h = parseFloat(m[2]);
      if (w > 0 && h > 0) return `${w} / ${h}`;
    }
    const single = parseFloat(raw);
    if (single > 0) return `${single} / 1`;
    return "1 / 1";
  }

  _sync() {
    this.$('[part="wrapper"]').style.setProperty("--pura-ar", this._ratio());
  }
}


define("pura-aspect-ratio", PuraAspectRatio, meta);
export { PuraAspectRatio };

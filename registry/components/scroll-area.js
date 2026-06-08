// <pura-scroll-area> — styled scroll container. Attributes: height (CSS length
// for max-height; falls back to a default), horizontal (allow horizontal scroll).
// Default slot = content. Slim themed scrollbar via scrollbar-width/-color tokens
// plus ::-webkit-scrollbar styling (thumb var(--pura-border-strong) rounded,
// track transparent).
import { PuraElement, define } from "../base.js";
import meta from "./scroll-area.meta.js";
import { scrollAreaTemplate } from "./scroll-area.template.js";

class PuraScrollArea extends PuraElement {
  static observedAttributes = ["height"];

  connectedCallback() {
    const { html, css } = scrollAreaTemplate(this);
    this.render(html, css);
    this._viewport = this.$(".viewport");
    this._sync();
  }

  attributeChangedCallback() {
    if (this._viewport) this._sync();
  }

  _sync() {
    const height = this.getAttribute("height");
    if (height) this._viewport.style.maxHeight = height;
    else this._viewport.style.removeProperty("max-height");
  }
}


define("pura-scroll-area", PuraScrollArea, meta);
export { PuraScrollArea };

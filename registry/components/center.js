// <pura-center> — centers slotted content horizontally and vertically.
// Attributes: axis (both default | x | y), min-h (CSS length, e.g. for a hero).
// Slot: default (the content to center). Theming via var(--pura-*) tokens.
import { PuraElement, define } from "../base.js";
import meta from "./center.meta.js";
import { centerTemplate } from "./center.template.js";

class PuraCenter extends PuraElement {
  static get observedAttributes() {
    return ["min-h"];
  }

  connectedCallback() {
    const { html, css } = centerTemplate(this);
    this.render(html, css);
    this._sync();
  }

  attributeChangedCallback() {
    // Reflect live edits (and the inspector) onto the host custom prop.
    if (this.isConnected) this._sync();
  }

  // Map attributes to CSS custom properties on the host. Keep it light.
  _sync() {
    const minH = this.getAttribute("min-h");
    if (minH) this.style.setProperty("--pura-center-min-h", minH);
    else this.style.removeProperty("--pura-center-min-h");
  }
}


define("pura-center", PuraCenter, meta);
export { PuraCenter };

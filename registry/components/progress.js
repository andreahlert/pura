// <pura-progress value="0..100"> — determinate bar. Add `indeterminate` for
// an animated unknown-progress state.
import { PuraElement, define } from "../base.js";
import meta from "./progress.meta.js";
import { progressTemplate } from "./progress.template.js";

class PuraProgress extends PuraElement {
  static observedAttributes = ["value", "indeterminate"];

  connectedCallback() {
    const { html, css } = progressTemplate(this);
    this.render(html, css);
    this._fill = this.$(".fill");
    this._track = this.$('[part="track"]');
    // role=progressbar needs an accessible name. The host can't carry the role
    // (it's on the inner track), so forward the host's aria-label/labelledby
    // down to the element that actually has the role.
    const label = this.getAttribute("aria-label");
    const labelledby = this.getAttribute("aria-labelledby");
    if (label) this._track.setAttribute("aria-label", label);
    else if (labelledby) this._track.setAttribute("aria-labelledby", labelledby);
    this._sync();
  }

  attributeChangedCallback() { if (this._fill) this._sync(); }

  _sync() {
    const v = Math.max(0, Math.min(100, Number(this.getAttribute("value") || 0)));
    if (this.hasAttribute("indeterminate")) {
      this._track.removeAttribute("aria-valuenow");
    } else {
      this._fill.style.width = v + "%";
      this._track.setAttribute("aria-valuenow", v);
    }
  }
}


define("pura-progress", PuraProgress, meta);
export { PuraProgress };

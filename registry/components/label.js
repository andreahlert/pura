// <pura-label> — form label. Attribute: for (id of the control it labels).
// Default slot = label text. Clicking the label focuses (and, where applicable,
// activates) the associated control found by id in the surrounding document.
import { PuraElement, define } from "../base.js";
import meta from "./label.meta.js";
import { labelTemplate } from "./label.template.js";

class PuraLabel extends PuraElement {
  static observedAttributes = ["for"];

  connectedCallback() {
    const { html, css } = labelTemplate(this);
    this.render(html, css);
    this._label = this.$("label");
    this._onClick = (e) => this._activate(e);
    this._label.addEventListener("click", this._onClick);
  }

  disconnectedCallback() {
    if (this._label) this._label.removeEventListener("click", this._onClick);
  }

  // Resolve the control referenced by the `for` attribute, searching the
  // containing root (document or enclosing shadow root) for that id.
  _control() {
    const id = this.getAttribute("for");
    if (!id) return null;
    const root = this.getRootNode();
    return (root.getElementById ? root.getElementById(id) : null)
      || document.getElementById(id);
  }

  _activate(e) {
    const el = this._control();
    if (!el) return;
    // Avoid double-toggling when the click already landed on the control.
    if (e.target === el || (el.contains && el.contains(e.target))) return;
    if (typeof el.focus === "function") el.focus();
    // Native form controls toggle/activate on label click; mirror that for
    // checkable inputs so the label feels native.
    const tag = el.tagName ? el.tagName.toLowerCase() : "";
    const type = (el.getAttribute && el.getAttribute("type") || "").toLowerCase();
    if (tag === "input" && (type === "checkbox" || type === "radio")) {
      el.click();
    } else if (typeof el.click === "function" && el.matches && el.matches("[role='checkbox'], [role='switch'], [role='radio']")) {
      el.click();
    }
  }
}


define("pura-label", PuraLabel, meta);
export { PuraLabel };

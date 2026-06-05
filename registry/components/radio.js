// <pura-radio> — single radio. Group by shared `name`. Label via slot.
// Attributes: checked, disabled, name, value.
import { PuraElement, define } from "../base.js";

class PuraRadio extends PuraElement {
  static observedAttributes = ["checked", "disabled"];

  connectedCallback() {
    this.render(
      `<label part="root">
         <span class="dot" part="dot" role="radio"
           tabindex="${this.hasAttribute("disabled") ? -1 : 0}"
           aria-checked="${this.hasAttribute("checked")}"></span>
         <span class="txt"><slot></slot></span>
       </label>`,
      CSS
    );
    this._dot = this.$(".dot");
    const select = () => {
      if (this.hasAttribute("disabled") || this.hasAttribute("checked")) return;
      const name = this.getAttribute("name");
      if (name) {
        document.querySelectorAll(`pura-radio[name="${name}"]`).forEach((r) => r.removeAttribute("checked"));
      }
      this.setAttribute("checked", "");
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.getAttribute("value") }, bubbles: true }));
    };
    this._dot.addEventListener("click", select);
    this._dot.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); select(); }
    });
  }

  attributeChangedCallback() {
    if (this._dot) this._dot.setAttribute("aria-checked", this.hasAttribute("checked"));
  }

  get checked() { return this.hasAttribute("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }
}

const CSS = `
  :host { display: inline-block; }
  label { display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font-size: var(--pura-text-sm); color: var(--pura-fg); cursor: pointer; user-select: none; }
  .dot {
    position: relative; display: inline-block; width: 1.15rem; height: 1.15rem;
    border: 1.5px solid var(--pura-border-strong); border-radius: 50%;
    background: var(--pura-bg); flex: none;
    transition: border-color var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  .dot::after {
    content: ""; position: absolute; inset: 0; margin: auto;
    width: 0.55rem; height: 0.55rem; border-radius: 50%;
    background: var(--pura-primary); transform: scale(0);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .dot:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  :host([checked]) .dot { border-color: var(--pura-primary); }
  :host([checked]) .dot::after { transform: scale(1); }
  :host([disabled]) label { opacity: 0.55; cursor: not-allowed; }
`;

define("pura-radio", PuraRadio);
export { PuraRadio };

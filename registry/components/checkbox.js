// <pura-checkbox> — label via slot. Attributes: checked, disabled.
import { PuraElement, define } from "../base.js";

class PuraCheckbox extends PuraElement {
  static observedAttributes = ["checked", "disabled"];

  connectedCallback() {
    this.render(
      `<label part="root">
         <span class="box" part="box" role="checkbox"
           tabindex="${this.hasAttribute("disabled") ? -1 : 0}"
           aria-checked="${this.hasAttribute("checked")}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </span>
         <span class="txt"><slot></slot></span>
       </label>`,
      CSS
    );
    this._box = this.$(".box");
    const toggle = () => {
      if (this.hasAttribute("disabled")) return;
      this.toggleAttribute("checked");
      this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.hasAttribute("checked") }, bubbles: true }));
    };
    this._box.addEventListener("click", toggle);
    this._box.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
    });
  }

  attributeChangedCallback() {
    if (this._box) this._box.setAttribute("aria-checked", this.hasAttribute("checked"));
  }

  get checked() { return this.hasAttribute("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }
}

const CSS = `
  :host { display: inline-block; }
  label { display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font-size: var(--pura-text-sm); color: var(--pura-fg); cursor: pointer; user-select: none; }
  .box {
    display: inline-grid; place-items: center; width: 1.15rem; height: 1.15rem;
    border: 1.5px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: transparent; flex: none;
    transition: background var(--pura-dur) var(--pura-ease), border-color var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  .box svg { width: 0.85rem; height: 0.85rem; transform: scale(0.6); transition: transform var(--pura-dur) var(--pura-ease); }
  .box:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  :host([checked]) .box { background: var(--pura-primary); border-color: var(--pura-primary); color: var(--pura-primary-fg); }
  :host([checked]) .box svg { transform: scale(1); }
  :host([disabled]) label { opacity: 0.55; cursor: not-allowed; }
`;

define("pura-checkbox", PuraCheckbox);
export { PuraCheckbox };

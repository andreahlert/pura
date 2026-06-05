// <pura-switch> — toggle. Label via slot. Attributes: checked, disabled.
import { PuraElement, define } from "../base.js";

class PuraSwitch extends PuraElement {
  static observedAttributes = ["checked", "disabled"];

  connectedCallback() {
    this.render(
      `<label part="root">
         <span class="track" part="track" role="switch"
           tabindex="${this.hasAttribute("disabled") ? -1 : 0}"
           aria-checked="${this.hasAttribute("checked")}">
           <span class="thumb" part="thumb"></span>
         </span>
         <span class="txt"><slot></slot></span>
       </label>`,
      CSS
    );
    this._track = this.$(".track");
    const toggle = () => {
      if (this.hasAttribute("disabled")) return;
      this.toggleAttribute("checked");
      this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.hasAttribute("checked") }, bubbles: true }));
    };
    this._track.addEventListener("click", toggle);
    this._track.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
    });
  }

  attributeChangedCallback() {
    if (this._track) this._track.setAttribute("aria-checked", this.hasAttribute("checked"));
  }

  get checked() { return this.hasAttribute("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }
}

const CSS = `
  :host { display: inline-block; }
  label { display: inline-flex; align-items: center; gap: var(--pura-space-3);
    font-size: var(--pura-text-sm); color: var(--pura-fg); cursor: pointer; user-select: none; }
  .track {
    position: relative; display: inline-flex; align-items: center; flex: none;
    width: 2.5rem; height: 1.4rem; border-radius: var(--pura-radius-full);
    background: var(--pura-border-strong); padding: 2px;
    transition: background var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  .thumb {
    width: 1rem; height: 1rem; border-radius: 50%; background: #fff;
    box-shadow: var(--pura-shadow-sm);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .track:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  :host([checked]) .track { background: var(--pura-primary); }
  :host([checked]) .thumb { transform: translateX(1.1rem); }
  :host([disabled]) label { opacity: 0.55; cursor: not-allowed; }
`;

define("pura-switch", PuraSwitch);
export { PuraSwitch };

// <pura-select> — styled native select (reliable + accessible + agent-readable).
// Options are passed as light-DOM <option> children; we read and re-emit them.
// Attributes: label, hint, value, disabled, invalid.
import { PuraElement, define } from "../base.js";
import meta from "./select.meta.js";

class PuraSelect extends PuraElement {
  static observedAttributes = ["label", "hint", "value", "disabled", "invalid"];

  connectedCallback() {
    const opts = [...this.querySelectorAll("option")]
      .map((o) => `<option value="${o.value}" ${o.selected ? "selected" : ""}>${o.textContent}</option>`)
      .join("");
    this.render(
      `${this.getAttribute("label") ? `<label part="label" for="s">${this.getAttribute("label")}</label>` : ""}
       <div class="wrap">
         <select id="s" part="select" ${this.hasAttribute("disabled") ? "disabled" : ""}
           ${this.hasAttribute("invalid") ? 'aria-invalid="true"' : ""}>${opts}</select>
         <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
       </div>
       ${this.getAttribute("hint") ? `<small part="hint">${this.getAttribute("hint")}</small>` : ""}`,
      CSS
    );
    this._sel = this.$("select");
    if (this.hasAttribute("value")) this._sel.value = this.getAttribute("value");
    this._sel.addEventListener("change", () => {
      this.setAttribute("value", this._sel.value);
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this._sel.value }, bubbles: true }));
    });
  }

  get value() { return this._sel?.value ?? ""; }
  set value(v) { if (this._sel) this._sel.value = v; this.setAttribute("value", v); }
}

const CSS = `
  :host { display: block; }
  label { display: block; font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg); margin-bottom: var(--pura-space-2); }
  .wrap { position: relative; }
  select {
    appearance: none; -webkit-appearance: none;
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-6) 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm); cursor: pointer;
    transition: border-color var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  select:hover { border-color: var(--pura-fg); }
  select:focus { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }
  select:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  .chev {
    position: absolute; right: var(--pura-space-3); top: 50%; transform: translateY(-50%);
    width: 1rem; height: 1rem; color: var(--pura-muted); pointer-events: none;
  }
  :host([invalid]) select { border-color: var(--pura-danger); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent); }
  small { display: block; margin-top: var(--pura-space-2); font-size: var(--pura-text-xs); color: var(--pura-muted); }
`;

define("pura-select", PuraSelect, meta);
export { PuraSelect };

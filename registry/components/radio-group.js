// <pura-radio-group> — groups slotted <pura-radio> children (which select by a
// shared `name`). Renders a role=radiogroup wrapper with an optional legend-like
// heading. Implements roving arrow-key navigation (Up/Left = previous,
// Down/Right = next, wrapping) that selects on move. Reflects the selected value
// in the `value` attribute and emits change events.
// Attributes: label (legend heading + aria-label), orientation
// (vertical default | horizontal), value, disabled.
import { PuraElement, define } from "../base.js";

class PuraRadioGroup extends PuraElement {
  static observedAttributes = ["label", "orientation", "value", "disabled"];

  connectedCallback() {
    this.render(
      `${this.getAttribute("label") ? `<div class="legend" part="label">${this.getAttribute("label")}</div>` : ""}
       <div class="group" part="group" role="radiogroup"
         aria-label="${this.getAttribute("label") || ""}"
         aria-orientation="${this.getAttribute("orientation") === "horizontal" ? "horizontal" : "vertical"}">
         <slot></slot>
       </div>`,
      CSS
    );
    this._slot = this.$("slot");

    // Re-sync roving state whenever the set of slotted radios changes.
    this._slot.addEventListener("slotchange", () => this._sync());

    // A child radio selecting itself bubbles a change; reflect it and keep the
    // roving tabindex pointed at the now-selected radio.
    this.addEventListener("change", (e) => {
      const target = e.target?.closest?.("pura-radio");
      if (!target || target === this) return;
      e.stopPropagation();
      const value = target.getAttribute("value");
      if (value != null) this.setAttribute("value", value);
      this._sync();
      this.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true }));
    });

    // Roving arrow-key navigation, scoped to the group.
    this.addEventListener("keydown", (e) => this._onKeydown(e));

    this._sync();
  }

  attributeChangedCallback(name) {
    if (!this._slot) return;
    if (name === "orientation") {
      this.$(".group")?.setAttribute(
        "aria-orientation",
        this.getAttribute("orientation") === "horizontal" ? "horizontal" : "vertical"
      );
    }
    this._sync();
  }

  // All slotted, non-disabled radios in document order.
  _radios() {
    return this._slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === "PURA-RADIO");
  }

  _enabled() {
    return this._radios().filter(
      (r) => !r.hasAttribute("disabled") && !this.hasAttribute("disabled")
    );
  }

  // Set the inner focus target (.dot) tabindex for each radio so exactly one is
  // in the tab order (the checked one, else the first enabled one).
  _sync() {
    const radios = this._radios();
    const enabled = this._enabled();
    const checked = enabled.find((r) => r.hasAttribute("checked"));
    const value = this.getAttribute("value");

    // If a value is set but nothing is checked yet, reflect it onto a child.
    if (value != null && !checked) {
      const match = enabled.find((r) => r.getAttribute("value") === value);
      if (match) match.setAttribute("checked", "");
    }

    const active = enabled.find((r) => r.hasAttribute("checked")) || enabled[0];
    for (const r of radios) {
      const dot = r.shadowRoot?.querySelector(".dot");
      if (!dot) continue;
      const focusable = r === active && !r.hasAttribute("disabled") && !this.hasAttribute("disabled");
      dot.setAttribute("tabindex", focusable ? "0" : "-1");
    }

    // Keep the host value attribute in sync with the actually-checked radio.
    const current = enabled.find((r) => r.hasAttribute("checked"));
    if (current && current.getAttribute("value") != null) {
      const v = current.getAttribute("value");
      if (this.getAttribute("value") !== v) this.setAttribute("value", v);
    }
  }

  _onKeydown(e) {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!keys.includes(e.key)) return;
    const enabled = this._enabled();
    if (enabled.length === 0) return;

    e.preventDefault();
    const current = enabled.find((r) => r.hasAttribute("checked")) || enabled[0];
    let i = enabled.indexOf(current);
    const prev = e.key === "ArrowUp" || e.key === "ArrowLeft";
    i = prev ? (i - 1 + enabled.length) % enabled.length : (i + 1) % enabled.length;
    this._select(enabled[i]);
  }

  // Select a radio on move: check it, uncheck siblings, focus it, and emit.
  _select(radio) {
    if (!radio || radio.hasAttribute("disabled")) return;
    for (const r of this._radios()) r.removeAttribute("checked");
    radio.setAttribute("checked", "");
    const value = radio.getAttribute("value");
    if (value != null) this.setAttribute("value", value);
    this._sync();
    radio.shadowRoot?.querySelector(".dot")?.focus();
    this.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true }));
  }

  get value() { return this.getAttribute("value"); }
  set value(v) {
    if (v == null) this.removeAttribute("value");
    else this.setAttribute("value", v);
    this._sync();
  }
}

const CSS = `
  :host { display: block; }
  .legend {
    font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-3);
  }
  .group { display: flex; flex-direction: column; gap: var(--pura-space-3); }
  :host([orientation="horizontal"]) .group {
    flex-direction: row; flex-wrap: wrap; gap: var(--pura-space-4);
  }
  :host([disabled]) { opacity: 0.55; pointer-events: none; }
`;

define("pura-radio-group", PuraRadioGroup);
export { PuraRadioGroup };

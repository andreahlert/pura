// <pura-toggle> — two-state toggle button (shadcn/ui Toggle).
// Variants: default (subtle) | outline. Sizes: sm | md (default) | lg.
// Attributes: pressed (reflects on/off state), variant, size, disabled.
// Default slot = content (icon and/or text). Toggles on click + Space/Enter.
// Emits CustomEvent("change", { detail: { pressed } }).
import { PuraElement, define } from "../base.js";
import meta from "./toggle.meta.js";

class PuraToggle extends PuraElement {
  static observedAttributes = ["pressed", "disabled"];

  connectedCallback() {
    this.render(
      `<button part="button toggle" type="button">
         <slot></slot>
       </button>`,
      CSS
    );
    this._btn = this.$("button");
    this._sync();
    this._btn.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      this.toggle();
    });
  }

  attributeChangedCallback() {
    if (this._btn) this._sync();
  }

  // Reflect current state to the rendered button's ARIA + disabled.
  _sync() {
    const pressed = this.hasAttribute("pressed");
    this._btn.setAttribute("aria-pressed", pressed ? "true" : "false");
    this._btn.disabled = this.hasAttribute("disabled");
  }

  get pressed() {
    return this.hasAttribute("pressed");
  }

  set pressed(v) {
    if (v) this.setAttribute("pressed", "");
    else this.removeAttribute("pressed");
  }

  get value() {
    return this.getAttribute("value") ?? this.textContent.trim();
  }
  set value(v) {
    this.setAttribute("value", v);
  }

  // Roving-focus helpers used by <pura-toggle-group>.
  setTabbable(on) {
    if (this._btn) this._btn.tabIndex = on ? 0 : -1;
  }
  focus() {
    if (this._btn) this._btn.focus();
  }

  // Flip state and notify; ignored while disabled.
  toggle() {
    if (this.hasAttribute("disabled")) return;
    this.pressed = !this.pressed;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { pressed: this.pressed, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

const CSS = `
  :host { display: inline-block; }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem; min-width: 2.25rem;
    background: transparent; color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  button:active { transform: translateY(0.5px) scale(0.99); }
  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* pressed (on) state — accentuated subtle background */
  :host([pressed]) button {
    background: var(--pura-subtle);
    color: var(--pura-fg);
  }
  :host([pressed]) button:hover { background: var(--pura-subtle-hover); }

  /* sizes */
  :host([size="sm"]) button {
    height: 1.875rem; min-width: 1.875rem;
    font-size: var(--pura-text-xs); padding: 0 var(--pura-space-2);
  }
  :host([size="lg"]) button {
    height: 2.75rem; min-width: 2.75rem;
    font-size: var(--pura-text-base); padding: 0 var(--pura-space-4);
  }

  /* outline variant */
  :host([variant="outline"]) button {
    border-color: var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
  }
  :host([variant="outline"]) button:hover { background: var(--pura-subtle); }
  :host([variant="outline"][pressed]) button { background: var(--pura-subtle); }
  :host([variant="outline"][pressed]) button:hover { background: var(--pura-subtle-hover); }
`;

define("pura-toggle", PuraToggle, meta);
export { PuraToggle };

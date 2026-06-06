// <pura-button> — variants: primary (default) | secondary | ghost | danger
// Sizes: sm | md (default) | lg. Attributes: disabled, loading, full.
import { PuraElement, define } from "../base.js";
import meta from "./button.meta.js";

class PuraButton extends PuraElement {
  static observedAttributes = ["variant", "size", "disabled", "loading", "full"];

  connectedCallback() {
    this.render(
      `<button part="button" type="button">
         <span class="spin" part="spinner" aria-hidden="true"></span>
         <span class="label"><slot></slot></span>
       </button>`,
      CSS
    );
    this._btn = this.$("button");
    this._sync();
    // forward host clicks; block when disabled/loading
    this._btn.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled") || this.hasAttribute("loading")) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    });
  }

  attributeChangedCallback() {
    if (this._btn) this._sync();
  }

  _sync() {
    const disabled = this.hasAttribute("disabled") || this.hasAttribute("loading");
    this._btn.disabled = disabled;
    this._btn.setAttribute("aria-busy", this.hasAttribute("loading") ? "true" : "false");
  }
}

const CSS = `
  :host { display: inline-block; }
  :host([full]) { display: block; }
  :host([full]) button { width: 100%; }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-4); height: 2.25rem;
    background: var(--pura-primary); color: var(--pura-primary-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-primary-hover); }
  button:active { transform: translateY(0.5px) scale(0.99); }
  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* sizes */
  :host([size="sm"]) button { height: 1.875rem; font-size: var(--pura-text-xs); padding: 0 var(--pura-space-3); }
  :host([size="lg"]) button { height: 2.75rem; font-size: var(--pura-text-base); padding: 0 var(--pura-space-5); }

  /* variants */
  :host([variant="secondary"]) button {
    background: var(--pura-bg); color: var(--pura-fg);
    border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow-sm);
  }
  :host([variant="secondary"]) button:hover { background: var(--pura-subtle); }

  :host([variant="ghost"]) button {
    background: transparent; color: var(--pura-fg);
  }
  :host([variant="ghost"]) button:hover { background: var(--pura-subtle); }

  :host([variant="danger"]) button {
    background: var(--pura-danger-solid); color: #fff;
  }
  :host([variant="danger"]) button:hover { filter: brightness(0.94); }

  /* loading spinner */
  .spin { display: none; width: 0.9em; height: 0.9em; border-radius: 50%;
    border: 2px solid currentColor; border-right-color: transparent;
    animation: pura-spin 0.6s linear infinite; }
  :host([loading]) .spin { display: inline-block; }
  @keyframes pura-spin { to { transform: rotate(360deg); } }
`;

define("pura-button", PuraButton, meta);
export { PuraButton };

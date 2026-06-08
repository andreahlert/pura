import { PuraElement, define } from "../base.js";

class PuraButton extends PuraElement {
  static observedAttributes = ["variant", "size", "disabled", "loading"];

  connectedCallback() {
    this.renderLight(
      `<button part="button" class="pura-button__button" type="button">
         <span part="spinner" class="pura-button__spinner" aria-hidden="true"></span>
         <span part="label" class="pura-button__label"><slot></slot></span>
       </button>`,
      CSS
    );
  }
}

const CSS = `
  .pura-button { display: inline-block; }
  .pura-button[full] { display: block; }
  .pura-button[size="sm"] button { height: 1.875rem; }
  .pura-button[variant="secondary"] button { background: var(--pura-bg); }
`;

define("pura-button", PuraButton);

import { PuraElement, define } from "../base.js";

class PuraButton extends PuraElement {
  static observedAttributes = ["variant", "size", "disabled", "loading"];

  connectedCallback() {
    this.render(
      `<button part="button" type="button">
         <span part="spinner" aria-hidden="true"></span>
         <span part="label"><slot></slot></span>
       </button>`,
      CSS
    );
  }
}

const CSS = `
  :host { display: inline-block; }
  :host([full]) { display: block; }
  :host([size="sm"]) button { height: 1.875rem; }
  :host([variant="secondary"]) button { background: var(--pura-bg); }
`;

define("pura-button", PuraButton);

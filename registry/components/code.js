// <pura-code> — inline code chip. Renders a <code> element.
// Attribute: variant ("subtle" default chip | "plain" bare mono text).
// Slot: default = code text.
// Theming via var(--pura-*) tokens. part="code".
import { PuraElement, define } from "../base.js";

class PuraCode extends PuraElement {
  static get observedAttributes() {
    return ["variant"];
  }

  connectedCallback() {
    this.render(`<code part="code"><slot></slot></code>`, CSS);
  }

  // Re-render on live attribute edits (inspector / dynamic changes).
  attributeChangedCallback() {
    if (this.isConnected) this.connectedCallback();
  }
}

const CSS = `
  :host { display: inline; }
  code {
    font-family: var(--pura-font-mono);
    font-size: 0.875em;
    color: var(--pura-fg);
  }
  /* default subtle chip */
  :host(:not([variant="plain"])) code {
    background: var(--pura-subtle);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-sm);
    padding: 0.15em 0.4em;
  }
`;

define("pura-code", PuraCode);
export { PuraCode };

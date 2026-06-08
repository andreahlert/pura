// <pura-code> — inline code chip. Renders a <code> element.
// Attribute: variant ("subtle" default chip | "plain" bare mono text).
// Slot: default = code text.
// Theming via var(--pura-*) tokens. part="code".
import { PuraElement, define } from "../base.js";
import meta from "./code.meta.js";
import { codeTemplate } from "./code.template.js";

class PuraCode extends PuraElement {
  static get observedAttributes() {
    return ["variant"];
  }

  connectedCallback() {
    const { html, css } = codeTemplate(this);
    this.render(html, css);
  }

  // Re-render on live attribute edits (inspector / dynamic changes).
  attributeChangedCallback() {
    if (this.isConnected) this.connectedCallback();
  }
}


define("pura-code", PuraCode, meta);
export { PuraCode };

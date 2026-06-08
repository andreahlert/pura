// <pura-separator> — divider rule. Attributes: orientation (horizontal default
// | vertical), label (optional centered text).
import { PuraElement, define } from "../base.js";
import meta from "./separator.meta.js";
import { separatorTemplate } from "./separator.template.js";

class PuraSeparator extends PuraElement {
  connectedCallback() {
    const { html, css } = separatorTemplate(this);
    this.render(html, css);
  }
}

define("pura-separator", PuraSeparator, meta);
export { PuraSeparator };

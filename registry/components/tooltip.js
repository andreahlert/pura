// <pura-tooltip text="..."> wraps a trigger (default slot). Shows on hover/focus.
// Attribute: text, placement (top default | bottom | left | right).
import { PuraElement, define } from "../base.js";
import meta from "./tooltip.meta.js";
import { tooltipTemplate } from "./tooltip.template.js";

class PuraTooltip extends PuraElement {
  connectedCallback() {
    const { html, css } = tooltipTemplate(this);
    this.render(html, css);
  }
}


define("pura-tooltip", PuraTooltip, meta);
export { PuraTooltip };

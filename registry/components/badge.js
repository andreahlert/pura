// <pura-badge> — small status label. variant: neutral (default) | primary |
// success | warning | danger | info. Attribute: dot (leading dot).
import { PuraElement, define } from "../base.js";
import meta from "./badge.meta.js";
import { badgeTemplate } from "./badge.template.js";

class PuraBadge extends PuraElement {
  connectedCallback() {
    const { html, css } = badgeTemplate(this);
    this.render(html, css);
  }
}


define("pura-badge", PuraBadge, meta);
export { PuraBadge };

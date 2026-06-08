// <pura-visually-hidden> a11y utility that visually hides slotted content while
// keeping it available to screen readers (standard sr-only clip pattern).
// Attribute: focusable when set, the content becomes visible while it (or
//   anything inside it) has focus, the skip-link style reveal.
// Slot: default. Part: content.
import { PuraElement, define } from "../base.js";
import meta from "./visually-hidden.meta.js";
import { visuallyHiddenTemplate } from "./visually-hidden.template.js";

class PuraVisuallyHidden extends PuraElement {
  connectedCallback() {
    const { html, css } = visuallyHiddenTemplate(this);
    this.render(html, css);
  }
}


define("pura-visually-hidden", PuraVisuallyHidden, meta);
export { PuraVisuallyHidden };

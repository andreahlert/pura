// <pura-visually-hidden> a11y utility that visually hides slotted content while
// keeping it available to screen readers (standard sr-only clip pattern).
// Attribute: focusable when set, the content becomes visible while it (or
//   anything inside it) has focus, the skip-link style reveal.
// Slot: default. Part: content.
import { PuraElement, define } from "../base.js";
import meta from "./visually-hidden.meta.js";

class PuraVisuallyHidden extends PuraElement {
  connectedCallback() {
    this.render(`<span part="content" class="sr"><slot></slot></span>`, CSS);
  }
}

const CSS = `
  :host { display: contents; }

  .sr {
    position: absolute !important;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /* focusable: reveal when focus lands inside (skip-link reveal) */
  :host([focusable]) .sr:focus-within {
    position: static !important;
    width: auto; height: auto;
    padding: revert; margin: 0;
    overflow: visible;
    clip: auto;
    clip-path: none;
    white-space: normal;
  }
`;

define("pura-visually-hidden", PuraVisuallyHidden, meta);
export { PuraVisuallyHidden };

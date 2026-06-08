// <pura-text> — typographic text primitive. Renders <p> by default, <span> when
// [inline], or the tag named by [as] (p|span|div). Attributes:
//   size    xs|sm|base|lg|xl                     (default base)
//   weight  normal|medium|semibold|bold          (400/500/600/700, default normal)
//   color   fg|muted|primary|accent|success|danger (default fg)
//   align   left|center|right                    (default left)
//   leading tight|normal|relaxed                  (line-height, default normal)
//   truncate (boolean)  ellipsis on a single line
//   inline   (boolean)  render <span> instead of <p>
//   as       p|span|div   explicit tag override
// Slot: default (text content). Part: text. Theming via var(--pura-*) tokens.
import { PuraElement, define } from "../base.js";
import meta from "./text.meta.js";
import { textTemplate } from "./text.template.js";

class PuraText extends PuraElement {
  static get observedAttributes() {
    return ["inline", "as"];
  }

  connectedCallback() {
    const { html, css } = textTemplate(this);
    this.render(html, css);
  }

  attributeChangedCallback() {
    // Re-render only after first mount; the element tag itself may change.
    if (this.isConnected) this.connectedCallback();
  }
}

define("pura-text", PuraText, meta);
export { PuraText };

// <pura-flex> — flexbox layout container. Renders <div part="flex"><slot></slot></div>.
// Attributes:
//   direction  row (default) | col | row-reverse | col-reverse
//   gap        space scale 0–6 | any CSS length (e.g. "2rem", "12px")
//   align      start | center | end | stretch | baseline   (align-items)
//   justify    start | center | end | between | around | evenly  (justify-content)
//   wrap       boolean — enable flex-wrap
//   inline     boolean — render as inline-flex
// Slots: default — flex children.
import { PuraElement, define } from "../base.js";
import meta from "./flex.meta.js";
import { flexTemplate } from "./flex.template.js";

class PuraFlex extends PuraElement {
  static get observedAttributes() {
    return ["gap"];
  }

  connectedCallback() {
    const { html, css } = flexTemplate(this);
    this.render(html, css);
    this._sync();
  }

  attributeChangedCallback() {
    // Only fires for `gap` (see observedAttributes). Enum attrs reflect via CSS.
    if (this.isConnected) this._sync();
  }

  // Resolve `gap` to a length and expose it as a host custom property so the
  // inner flex container can consume it. Scale 1–6 → token; "0" → 0; else raw.
  _sync() {
    const gap = this.getAttribute("gap");
    let value = "0";
    if (gap != null && gap !== "" && gap !== "0") {
      value = /^[1-6]$/.test(gap) ? `var(--pura-space-${gap})` : gap;
    }
    this.style.setProperty("--_gap", value);
  }
}


define("pura-flex", PuraFlex, meta);
export { PuraFlex };

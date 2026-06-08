// <pura-stack> — vertical flex column with consistent spacing.
// Attributes:
//   gap     — space scale 0–6 (default 4); maps to --pura-space-N (0 → 0).
//   align   — cross-axis: start | center | end | stretch (flex align-items).
//   justify — main-axis: start | center | end | between | around (justify-content).
//   divide  — boolean; draws 1px borders between children using the gap as padding.
// Slots: default — stacked children.
// Renders <div part="stack"><slot></slot></div>.
import { PuraElement, define } from "../base.js";
import meta from "./stack.meta.js";
import { stackTemplate } from "./stack.template.js";

const ALIGN = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch" };
const JUSTIFY = {
  start: "flex-start", center: "center", end: "flex-end",
  between: "space-between", around: "space-around",
};

class PuraStack extends PuraElement {
  static get observedAttributes() {
    return ["gap", "align", "justify", "divide"];
  }

  connectedCallback() {
    const { html, css } = stackTemplate(this);
    this.render(html, css);
    this._sync();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._sync();
  }

  // Read attributes → host custom properties. Defaults keep it safe with none set.
  _sync() {
    const gap = this.getAttribute("gap") ?? "4";
    const space = gap === "0" ? "0" : `var(--pura-space-${gap}, var(--pura-space-4))`;
    this.style.setProperty("--_gap", space);
    this.style.setProperty("--_align", ALIGN[this.getAttribute("align")] || "stretch");
    this.style.setProperty("--_justify", JUSTIFY[this.getAttribute("justify")] || "flex-start");
  }
}


define("pura-stack", PuraStack, meta);
export { PuraStack };

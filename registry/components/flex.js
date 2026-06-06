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

class PuraFlex extends PuraElement {
  static get observedAttributes() {
    return ["gap"];
  }

  connectedCallback() {
    this.render(`<div part="flex"><slot></slot></div>`, CSS);
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

const CSS = `
  :host { display: block; }
  :host([inline]) { display: inline-block; }

  [part="flex"] {
    display: flex;
    flex-direction: row;
    gap: var(--_gap, 0);
  }
  :host([inline]) [part="flex"] { display: inline-flex; }

  /* direction */
  :host([direction="col"]) [part="flex"] { flex-direction: column; }
  :host([direction="row-reverse"]) [part="flex"] { flex-direction: row-reverse; }
  :host([direction="col-reverse"]) [part="flex"] { flex-direction: column-reverse; }

  /* wrap */
  :host([wrap]) [part="flex"] { flex-wrap: wrap; }

  /* align-items */
  :host([align="start"]) [part="flex"] { align-items: flex-start; }
  :host([align="center"]) [part="flex"] { align-items: center; }
  :host([align="end"]) [part="flex"] { align-items: flex-end; }
  :host([align="stretch"]) [part="flex"] { align-items: stretch; }
  :host([align="baseline"]) [part="flex"] { align-items: baseline; }

  /* justify-content */
  :host([justify="start"]) [part="flex"] { justify-content: flex-start; }
  :host([justify="center"]) [part="flex"] { justify-content: center; }
  :host([justify="end"]) [part="flex"] { justify-content: flex-end; }
  :host([justify="between"]) [part="flex"] { justify-content: space-between; }
  :host([justify="around"]) [part="flex"] { justify-content: space-around; }
  :host([justify="evenly"]) [part="flex"] { justify-content: space-evenly; }
`;

define("pura-flex", PuraFlex, meta);
export { PuraFlex };

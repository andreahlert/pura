// <pura-center> — centers slotted content horizontally and vertically.
// Attributes: axis (both default | x | y), min-h (CSS length, e.g. for a hero).
// Slot: default (the content to center). Theming via var(--pura-*) tokens.
import { PuraElement, define } from "../base.js";

class PuraCenter extends PuraElement {
  static get observedAttributes() {
    return ["min-h"];
  }

  connectedCallback() {
    this.render(`<div part="center"><slot></slot></div>`, CSS);
    this._sync();
  }

  attributeChangedCallback() {
    // Reflect live edits (and the inspector) onto the host custom prop.
    if (this.isConnected) this._sync();
  }

  // Map attributes to CSS custom properties on the host. Keep it light.
  _sync() {
    const minH = this.getAttribute("min-h");
    if (minH) this.style.setProperty("--pura-center-min-h", minH);
    else this.style.removeProperty("--pura-center-min-h");
  }
}

const CSS = `
  :host {
    display: grid;
    --pura-center-min-h: auto;
  }
  [part="center"] {
    display: grid;
    place-items: center;
    place-content: center;
    min-height: var(--pura-center-min-h);
  }
  /* axis="x" — center horizontally only, keep content top-aligned */
  :host([axis="x"]) [part="center"] {
    place-items: start center;
    place-content: start center;
  }
  /* axis="y" — center vertically only, keep content left-aligned */
  :host([axis="y"]) [part="center"] {
    place-items: center start;
    place-content: center start;
  }
`;

define("pura-center", PuraCenter);
export { PuraCenter };

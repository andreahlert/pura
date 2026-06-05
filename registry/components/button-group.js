// <pura-button-group> — segmented group of pura-button elements. Collapses
// adjacent borders/radii so slotted buttons read as one control.
// Attributes: orientation (horizontal default | vertical).
import { PuraElement, define } from "../base.js";

// pura-button exposes its rounded box as ::part(button). A part is only
// reachable from the tree where the host physically lives — pura-button is a
// light-DOM child here, so the radius collapse must come from document scope,
// not the group's shadow stylesheet. Inject it once (module-level guard, same
// spirit as the popover counter); shadow CSS keeps layout/margins/z-index.
let SHEET_INJECTED = false;
function injectDocumentSheet() {
  if (SHEET_INJECTED) return;
  SHEET_INJECTED = true;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`
    pura-button-group:not([orientation="vertical"]) > pura-button:not(:first-child)::part(button) {
      border-top-left-radius: 0; border-bottom-left-radius: 0;
    }
    pura-button-group:not([orientation="vertical"]) > pura-button:not(:last-child)::part(button) {
      border-top-right-radius: 0; border-bottom-right-radius: 0;
    }
    pura-button-group[orientation="vertical"] > pura-button:not(:first-child)::part(button) {
      border-top-left-radius: 0; border-top-right-radius: 0;
    }
    pura-button-group[orientation="vertical"] > pura-button:not(:last-child)::part(button) {
      border-bottom-left-radius: 0; border-bottom-right-radius: 0;
    }
  `);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

class PuraButtonGroup extends PuraElement {
  static observedAttributes = ["orientation"];

  connectedCallback() {
    injectDocumentSheet();
    this.render(
      `<div part="group" role="group"><slot></slot></div>`,
      CSS
    );
    this._sync();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._sync();
  }

  _sync() {
    const vertical = this.getAttribute("orientation") === "vertical";
    const group = this.$("[part=group]");
    if (group) group.setAttribute("aria-orientation", vertical ? "vertical" : "horizontal");
  }
}

const CSS = `
  :host { display: inline-flex; vertical-align: middle; }

  [part="group"] {
    display: inline-flex;
    flex-direction: row;
    isolation: isolate;
  }
  :host([orientation="vertical"]) [part="group"] {
    flex-direction: column;
  }

  ::slotted(pura-button) { position: relative; }

  /* HORIZONTAL: pull each button onto its neighbor so borders overlap (1px). */
  :host(:not([orientation="vertical"])) ::slotted(pura-button:not(:first-child)) {
    margin-left: -1px;
  }
  /* VERTICAL: collapse the seam top-to-bottom. */
  :host([orientation="vertical"]) ::slotted(pura-button:not(:first-child)) {
    margin-top: -1px;
  }

  /* Lift the hovered/focused button so its full border wins over the neighbor.
     The radius corners themselves are reset from document scope (see above). */
  ::slotted(pura-button:hover),
  ::slotted(pura-button:focus-within) {
    z-index: 1;
  }
`;

define("pura-button-group", PuraButtonGroup);
export { PuraButtonGroup };

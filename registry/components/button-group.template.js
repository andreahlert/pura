// Pure render for <pura-button-group>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function buttonGroupTemplate(el = EMPTY_SHIM) {
  const html = `<div part="group" role="group"><slot></slot></div>`;
  return { html, css: BUTTON_GROUP_CSS };
}

export const BUTTON_GROUP_CSS = `
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

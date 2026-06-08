// Pure render(s) for <toggle-group> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function toggleTemplate(el = EMPTY_SHIM) {
  const html = `<button part="toggle" type="button"
         aria-pressed="${el.hasAttribute("pressed")}"
         ${el.hasAttribute("disabled") ? "disabled" : ""}>
         <slot></slot>
       </button>`;
  return { html, css: TOGGLE_CSS };
}

export function toggleGroupTemplate(el = EMPTY_SHIM) {
  const html = `<div part="group" role="group">
         <slot></slot>
       </div>`;
  return { html, css: TOGGLE_GROUP_CSS };
}

export const TOGGLE_CSS = `
  :host { display: inline-flex; }
  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem; min-width: 2.25rem;
    background: var(--pura-bg); color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-subtle); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  button[aria-pressed="true"] {
    background: var(--pura-primary); color: var(--pura-primary-fg);
    border-color: var(--pura-primary);
  }
  button[aria-pressed="true"]:hover { background: var(--pura-primary-hover); }
  button:disabled { opacity: 0.55; cursor: not-allowed; }
`;

export const TOGGLE_GROUP_CSS = `
  :host { display: inline-flex; vertical-align: middle; }

  [part="group"] {
    display: inline-flex;
    flex-direction: row;
    isolation: isolate;
  }
  :host([orientation="vertical"]) [part="group"] { flex-direction: column; }

  ::slotted(pura-toggle) { position: relative; }

  /* HORIZONTAL: collapse the seam so the toggles read as one segmented control. */
  :host(:not([orientation="vertical"])) ::slotted(pura-toggle:not(:first-child)) {
    margin-left: -1px;
  }
  :host(:not([orientation="vertical"])) ::slotted(pura-toggle:not(:first-child))::part(toggle) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  :host(:not([orientation="vertical"])) ::slotted(pura-toggle:not(:last-child))::part(toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* VERTICAL: collapse the seam top-to-bottom. */
  :host([orientation="vertical"]) ::slotted(pura-toggle:not(:first-child)) {
    margin-top: -1px;
  }
  :host([orientation="vertical"]) ::slotted(pura-toggle:not(:first-child))::part(toggle) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  :host([orientation="vertical"]) ::slotted(pura-toggle:not(:last-child))::part(toggle) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* Lift the pressed/hovered/focused toggle so its border wins over neighbors. */
  ::slotted(pura-toggle:hover),
  ::slotted(pura-toggle:focus-within),
  ::slotted(pura-toggle[pressed]) { z-index: 1; }
`;

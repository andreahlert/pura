// Pure render for <pura-burger>. No DOM; SSR/DSD + client safe.
// open/size/label derive from attributes; under EMPTY_SHIM size is "1.5rem",
// the control is collapsed (aria-expanded="false"), and the label resolves to
// the default-locale i18n string.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Quote-safe escaping for label/size attributes (burger order: & < > ").
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: inline-block; }

  button {
    display: inline-grid; place-items: center;
    width: calc(var(--burger-size) + var(--pura-space-3));
    height: calc(var(--burger-size) + var(--pura-space-3));
    padding: 0; margin: 0;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius-sm);
    color: var(--pura-fg);
    cursor: pointer;
  }
  button:hover { background: var(--pura-subtle); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  .lines {
    position: relative;
    width: var(--burger-size);
    height: var(--burger-size);
  }
  .line {
    position: absolute;
    left: 12%;
    width: 76%;
    height: 2px;
    border-radius: var(--pura-radius-full);
    background: currentColor;
    transition: transform var(--pura-dur) var(--pura-ease),
      opacity var(--pura-dur) var(--pura-ease),
      top var(--pura-dur) var(--pura-ease);
  }
  .line:nth-child(1) { top: 30%; }
  .line:nth-child(2) { top: 50%; }
  .line:nth-child(3) { top: 70%; }

  /* Morph to an X when open. */
  :host([open]) .line:nth-child(1) { top: 50%; transform: rotate(45deg); }
  :host([open]) .line:nth-child(2) { opacity: 0; }
  :host([open]) .line:nth-child(3) { top: 50%; transform: rotate(-45deg); }
`;

export function burgerTemplate(el = EMPTY_SHIM) {
  const size = el.getAttribute("size") || "1.5rem";
  const html = `<button part="button" type="button"
         aria-expanded="${el.hasAttribute("open") ? "true" : "false"}"
         aria-label="${esc(el.getAttribute("label") || t("burger.label"))}"
         style="--burger-size: ${esc(size)}">
         <span class="lines" aria-hidden="true">
           <span part="line" class="line"></span>
           <span part="line" class="line"></span>
           <span part="line" class="line"></span>
         </span>
       </button>`;
  return { html, css: CSS };
}

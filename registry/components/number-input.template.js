// Pure render(s) for <number-input> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function numberInputTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("aria-label") || t("number-input.label");
  const html = `<div class="wrap" part="root" role="group" aria-label="${esc(label)}">
         <button class="step dec" part="decrement" type="button"
           tabindex="-1" aria-label="${esc(t("number-input.decrease"))}" data-pura-action="decrement">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
         </button>
         <input class="field" part="input" type="text" inputmode="decimal"
           role="spinbutton" autocomplete="off"
           ${el.hasAttribute("disabled") ? "disabled" : ""} />
         <button class="step inc" part="increment" type="button"
           tabindex="-1" aria-label="${esc(t("number-input.increase"))}" data-pura-action="increment">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
         </button>
       </div>`;
  return { html, css: NUMBER_INPUT_CSS };
}

export const NUMBER_INPUT_CSS = `
  :host { display: inline-block; }
  :host([disabled]) { opacity: 0.55; cursor: not-allowed; }

  .wrap {
    display: inline-flex; align-items: stretch;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    background: var(--pura-bg); box-shadow: var(--pura-shadow-sm);
    overflow: hidden; height: 2.25rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .wrap:hover { border-color: var(--pura-fg); }
  .wrap:focus-within {
    border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .step {
    display: inline-flex; align-items: center; justify-content: center;
    flex: none; width: 2.25rem; padding: 0; font: inherit;
    border: none; background: var(--pura-subtle); color: var(--pura-fg);
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .step:hover { background: var(--pura-subtle-hover); }
  .step:active { background: var(--pura-border); }
  .step:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--pura-accent); }
  .step:disabled { opacity: 0.4; cursor: not-allowed; background: var(--pura-subtle); }
  .step svg { width: 1rem; height: 1rem; }

  .field {
    width: 4rem; min-width: 0; flex: 1 1 auto; text-align: center;
    font: inherit; font-size: var(--pura-text-sm); font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: var(--pura-bg);
    border: none; border-left: 1px solid var(--pura-border);
    border-right: 1px solid var(--pura-border);
    padding: 0 var(--pura-space-2);
  }
  .field:focus { outline: none; }
  .field:disabled { cursor: not-allowed; background: var(--pura-subtle); }
`;

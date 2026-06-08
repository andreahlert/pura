// Pure render(s) for <search-field> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const MAGNIFIER = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

export function searchFieldTemplate(el = EMPTY_SHIM) {
  const ph = el.getAttribute("placeholder") || t("search.placeholder");
  const html = `<div class="wrap">
         <span class="icon" part="icon" aria-hidden="true">${MAGNIFIER}</span>
         <input part="input" type="search" autocomplete="off"
           placeholder="${ph}"
           ${el.hasAttribute("disabled") ? "disabled" : ""}
           value="${el.getAttribute("value") || ""}" />
         <button class="clear" part="clear" type="button" tabindex="0"
           aria-label="${t("search.clear")}" hidden>
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </button>
       </div>`;
  return { html, css: SEARCH_FIELD_CSS };
}

export const SEARCH_FIELD_CSS = `
  :host { display: block; }
  .wrap { position: relative; display: block; }
  .icon {
    position: absolute; top: 50%; left: var(--pura-space-3); transform: translateY(-50%);
    display: grid; place-items: center; width: 1.1rem; height: 1.1rem;
    color: var(--pura-muted); pointer-events: none;
  }
  .icon svg { width: 1.1rem; height: 1.1rem; }
  .icon.spin {
    width: 0.95rem; height: 0.95rem; border-radius: 50%; box-sizing: border-box;
    border: 2px solid currentColor; border-right-color: transparent;
    color: var(--pura-muted); pointer-events: none;
    animation: pura-spin 0.6s linear infinite;
  }
  @keyframes pura-spin {
    from { transform: translateY(-50%) rotate(0); }
    to { transform: translateY(-50%) rotate(360deg); }
  }
  input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 2.25rem 0 2.25rem; height: 2.25rem;
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
    -webkit-appearance: none; appearance: none;
  }
  input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
  input::placeholder { color: var(--pura-muted); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  .clear {
    position: absolute; top: 50%; right: var(--pura-space-2); transform: translateY(-50%);
    display: grid; place-items: center; width: 1.6rem; height: 1.6rem;
    border: none; background: transparent; color: var(--pura-muted);
    cursor: pointer; border-radius: var(--pura-radius-full); padding: 0;
    transition: color var(--pura-dur) var(--pura-ease), background var(--pura-dur) var(--pura-ease);
  }
  .clear[hidden] { display: none; }
  .clear:hover { color: var(--pura-fg); background: var(--pura-subtle); }
  .clear:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .clear svg { width: 0.85rem; height: 0.85rem; }
`;

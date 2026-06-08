// Pure render for <pura-combobox>. No DOM; SSR/DSD + client safe.
// Renders the input + an EMPTY listbox container; the option set is filtered in
// from light-DOM <option> children at runtime by _renderOptions(). Under
// EMPTY_SHIM the placeholder is "", disabled is absent, and the per-instance
// id/anchor-name resolve to "undefined" (corrected on hydration).
import { EMPTY_SHIM } from "../base.js";

// Quote-safe escaping for the placeholder attribute (combobox order: & " < >).
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; }

  .anchor { anchor-name: ANCHOR; position: relative; display: block; }

  .input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-6) 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm); cursor: text;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .input::placeholder { color: var(--pura-muted); }
  .input:hover { border-color: var(--pura-fg); }
  .input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  :host([disabled]) { cursor: not-allowed; }

  .chev {
    position: absolute; right: var(--pura-space-3); top: 50%; transform: translateY(-50%);
    width: 1rem; height: 1rem; color: var(--pura-muted); pointer-events: none;
  }

  .listbox {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: anchor-size(width); width: max-content; max-width: min(24rem, 92vw);
    max-height: 16rem; overflow-y: auto;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .listbox:popover-open { opacity: 1; transform: none; }

  .option {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-2);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    color: var(--pura-fg); user-select: none;
  }
  .option.active { background: var(--pura-subtle); }
  .option[aria-selected="true"] { font-weight: 550; }
  .opt-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .check {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none; color: var(--pura-fg);
  }

  .empty {
    padding: var(--pura-space-3) var(--pura-space-2);
    color: var(--pura-muted); text-align: center; font-size: var(--pura-text-sm);
  }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .listbox { position: absolute; top: 100%; left: 0; inset: auto; margin-top: var(--pura-space-2); }
  }
`;

export function comboboxTemplate(el = EMPTY_SHIM) {
  const listId = el._listId;
  const html = `<div class="anchor" part="anchor">
         <input part="input" class="input" type="text" role="combobox" autocomplete="off"
           spellcheck="false" aria-autocomplete="list" aria-expanded="false"
           aria-controls="${listId}"
           placeholder="${esc(el.getAttribute("placeholder") || "")}"
           ${el.hasAttribute("disabled") ? "disabled" : ""} />
         <svg class="chev" part="chevron" viewBox="0 0 24 24" aria-hidden="true">
           <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       </div>
       <div part="listbox" class="listbox" id="${listId}" role="listbox"
         popover="manual" tabindex="-1"></div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}

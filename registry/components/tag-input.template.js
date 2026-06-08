// Pure render for <pura-tag-input>. No DOM; SSR/DSD + client safe.
// Renders the field + an EMPTY chip list; chips are filled from the parsed
// [value] at runtime by _renderChips(). Under EMPTY_SHIM the input aria-label
// resolves to the default-locale "Add a tag" and the placeholder is "".
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Quote-safe escaping for the input attributes (tag-input order: & " < >).
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; }
  :host([disabled]) { opacity: 0.55; cursor: not-allowed; }

  .field {
    display: flex; flex-wrap: wrap; align-items: center; gap: var(--pura-space-2);
    width: 100%; min-height: 2.25rem;
    padding: var(--pura-space-1) var(--pura-space-2);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm); cursor: text;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .field:hover { border-color: var(--pura-fg); }
  .field:focus-within {
    border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  :host([disabled]) .field { cursor: not-allowed; background: var(--pura-subtle); }

  .chips {
    display: contents; list-style: none; margin: 0; padding: 0;
  }

  .chip {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    max-width: 100%; padding: 0 var(--pura-space-1) 0 var(--pura-space-2);
    height: 1.625rem; font-size: var(--pura-text-xs); font-weight: 550;
    color: var(--pura-fg); background: var(--pura-subtle);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .chip:hover { background: var(--pura-subtle-hover); }

  .chip-label {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    line-height: 1;
  }

  .remove {
    display: inline-grid; place-items: center; flex: none;
    width: 1.125rem; height: 1.125rem; padding: 0; cursor: pointer;
    color: var(--pura-muted); background: transparent;
    border: none; border-radius: var(--pura-radius-full);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .remove svg { width: 0.75rem; height: 0.75rem; }
  .remove:hover { color: var(--pura-fg); background: var(--pura-border); }
  .remove:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  :host([disabled]) .remove { cursor: not-allowed; }

  .entry {
    flex: 1 1 6rem; min-width: 5rem; width: auto;
    font: inherit; font-size: var(--pura-text-sm); line-height: 1;
    color: var(--pura-fg); background: transparent;
    border: none; outline: none; padding: var(--pura-space-1) 0;
  }
  .entry::placeholder { color: var(--pura-muted); }
  .entry:disabled { cursor: not-allowed; }
`;

export function tagInputTemplate(el = EMPTY_SHIM) {
  const html = `<div class="field" part="field">
         <ul class="chips" part="list" role="list"></ul>
         <input class="entry" part="input" type="text" role="textbox"
           autocomplete="off" autocapitalize="off" spellcheck="false"
           aria-label="${esc(el.getAttribute("placeholder") || t("tag-input.add"))}"
           placeholder="${esc(el.getAttribute("placeholder") || "")}"
           ${el.hasAttribute("disabled") ? "disabled" : ""} />
       </div>`;
  return { html, css: CSS };
}

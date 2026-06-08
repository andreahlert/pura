// Pure render for <pura-inline-edit>. No DOM; SSR/DSD + client safe.
// Two branches: a read-only "view" button (the default) and an inline edit form
// (when el._editing is set on the client and the host is not disabled). The edit
// field's current value is applied post-render by the component, so the template
// renders an empty field. Under EMPTY_SHIM el._editing is absent → the view
// branch renders, derived purely from [value]/[placeholder]/[multiline]/[disabled].
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
const XICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
const PENCIL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;

// Escape text for safe insertion into markup.
function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const CSS = `
  :host { display: inline-block; max-width: 100%; }
  :host([disabled]) { opacity: 0.55; }

  .view {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: transparent; cursor: text; text-align: left;
    border: 1px solid transparent; border-radius: var(--pura-radius);
    padding: var(--pura-space-1) var(--pura-space-2); max-width: 100%;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .view:hover { background: var(--pura-subtle); border-color: var(--pura-border); }
  .view:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .view:disabled { cursor: not-allowed; }
  .view.is-empty .text { color: var(--pura-muted); font-style: italic; }
  .text { overflow: hidden; text-overflow: ellipsis; white-space: pre-wrap; }

  .pencil {
    display: inline-flex; flex: none; opacity: 0;
    transition: opacity var(--pura-dur) var(--pura-ease);
  }
  .pencil svg { width: 0.9rem; height: 0.9rem; }
  .view:hover .pencil, .view:focus-visible .pencil { opacity: 0.6; }

  .edit { display: inline-flex; align-items: flex-start; gap: var(--pura-space-2); max-width: 100%; }
  .field {
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: var(--pura-bg); resize: vertical;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-1) var(--pura-space-2); min-height: 2.25rem;
  }
  textarea.field { min-width: 14rem; }
  .field::placeholder { color: var(--pura-muted); }
  .field:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .actions { display: inline-flex; gap: var(--pura-space-1); }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.875rem; height: 1.875rem; padding: 0; cursor: pointer;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .btn svg { width: 1rem; height: 1rem; }
  .btn:hover { background: var(--pura-subtle); }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .confirm { color: var(--pura-success-fg); }
  .cancel { color: var(--pura-muted-fg); }
`;

export function inlineEditTemplate(el = EMPTY_SHIM) {
  const value = el._value != null ? el._value : (el.getAttribute("value") || "");
  const multiline = el.bool("multiline");
  const ph = el.getAttribute("placeholder") || "";
  const disabled = el.bool("disabled");
  const editing = !!el._editing && !disabled;

  if (editing) {
    const tag = multiline ? "textarea" : "input";
    const html = `<div class="edit">
           <${tag} class="field" part="input" placeholder="${esc(ph)}"
             ${multiline ? "rows=\"2\"" : "type=\"text\""}></${tag}>
           <div class="actions">
             <button type="button" class="btn confirm" part="confirm" aria-label="${t("inline-edit.confirm")}">${CHECK}</button>
             <button type="button" class="btn cancel" part="cancel" aria-label="${t("inline-edit.cancel")}">${XICON}</button>
           </div>
         </div>`;
    return { html, css: CSS };
  }

  const empty = !value;
  const display = value || ph || t("inline-edit.empty");
  const html = `<button type="button" class="view ${empty ? "is-empty" : ""}" part="value"
           ${disabled ? "disabled" : ""} aria-label="${t("inline-edit.edit")}">
           <span class="text">${esc(display)}</span>
           <span class="pencil" aria-hidden="true">${PENCIL}</span>
         </button>`;
  return { html, css: CSS };
}

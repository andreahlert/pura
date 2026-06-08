// Pure render for <pura-json-input>. No DOM; SSR/DSD + client safe.
// Renders the optional label + textarea + Format button + error region from
// attributes; the textarea's value is applied at runtime from [value]. Under
// EMPTY_SHIM label/placeholder resolve to "", rows to 6, and the Format button
// label resolves to the default-locale string.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Quote-safe escaping for label/placeholder text (json-input order: & < > ").
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: block; }

  label {
    display: block; font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-2);
  }

  .field { position: relative; }

  textarea {
    width: 100%; font-family: var(--pura-font-mono); font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg); resize: vertical;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-3); min-height: 6rem; line-height: 1.55;
    box-shadow: var(--pura-shadow-sm); tab-size: 2;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  textarea::placeholder { color: var(--pura-muted); }
  textarea:hover { border-color: var(--pura-fg); }
  textarea:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  textarea:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }

  :host([invalid]) textarea {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }

  .format {
    position: absolute; top: var(--pura-space-2); right: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-xs); font-weight: 550;
    line-height: 1; cursor: pointer;
    color: var(--pura-muted-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: 0.3rem var(--pura-space-2);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .format:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .format:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .format:disabled { opacity: 0.55; cursor: not-allowed; }

  .error {
    display: none; margin-top: var(--pura-space-2);
    font-size: var(--pura-text-xs); color: var(--pura-danger);
    font-family: var(--pura-font-mono);
  }
  :host([invalid]) .error { display: block; }
`;

export function jsonInputTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label");
  const disabled = el.hasAttribute("disabled") ? "disabled" : "";
  const html = `${label ? `<label part="label" for="t">${esc(label)}</label>` : ""}
       <div class="field">
         <textarea id="t" part="textarea" rows="${el.getAttribute("rows") || 6}"
           placeholder="${esc(el.getAttribute("placeholder") || "")}"
           ${disabled}
           aria-invalid="false"
           aria-describedby="err"></textarea>
         <button class="format" part="format" type="button"
           ${disabled}>${esc(t("json-input.format"))}</button>
       </div>
       <small id="err" part="error" class="error" role="alert"></small>`;
  return { html, css: CSS };
}

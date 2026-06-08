// Pure render for <pura-textarea>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function textareaTemplate(el = EMPTY_SHIM) {
  const html = `${el.getAttribute("label") ? `<label part="label" for="t">${el.getAttribute("label")}</label>` : ""}
       <textarea id="t" part="textarea" rows="${el.getAttribute("rows") || 4}"
         placeholder="${el.getAttribute("placeholder") || ""}"
         ${el.hasAttribute("disabled") ? "disabled" : ""}
         ${el.hasAttribute("invalid") ? 'aria-invalid="true"' : ""}>${el.getAttribute("value") || ""}</textarea>
       ${el.getAttribute("hint") ? `<small part="hint">${el.getAttribute("hint")}</small>` : ""}`;
  return { html, css: TEXTAREA_CSS };
}

export const TEXTAREA_CSS = `
  :host { display: block; }
  label {
    display: block; font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-2);
  }
  textarea {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg); resize: vertical;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-3); min-height: 4.5rem; line-height: 1.55;
    box-shadow: var(--pura-shadow-sm);
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
  small { display: block; margin-top: var(--pura-space-2); font-size: var(--pura-text-xs); color: var(--pura-muted); }
  :host([invalid]) small { color: var(--pura-danger); }
`;

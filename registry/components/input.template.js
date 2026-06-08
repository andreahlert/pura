// Pure render for <pura-input>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function inputTemplate(el = EMPTY_SHIM) {
  const id = "i";
  const html = `${el.getAttribute("label") ? `<label part="label" for="${id}">${el.getAttribute("label")}</label>` : ""}
       <input id="${id}" part="input"
         type="${el.getAttribute("type") || "text"}"
         placeholder="${el.getAttribute("placeholder") || ""}"
         ${el.hasAttribute("disabled") ? "disabled" : ""}
         ${el.hasAttribute("invalid") ? 'aria-invalid="true"' : ""}
         value="${el.getAttribute("value") || ""}" />
       ${el.getAttribute("hint") ? `<small part="hint">${el.getAttribute("hint")}</small>` : ""}`;
  return { html, css: INPUT_CSS };
}

export const INPUT_CSS = `
  :host { display: block; }
  label {
    display: block; font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-2);
  }
  input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  input::placeholder { color: var(--pura-muted); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  :host([invalid]) input {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
  small {
    display: block; margin-top: var(--pura-space-2);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
  }
  :host([invalid]) small { color: var(--pura-danger); }
`;

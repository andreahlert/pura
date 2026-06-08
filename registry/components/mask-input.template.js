// Pure render for <pura-mask-input>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function maskInputTemplate(el = EMPTY_SHIM) {
  const html = `<input part="input" type="text"
         placeholder="${el.getAttribute("placeholder") || ""}"
         ${el.hasAttribute("disabled") ? "disabled" : ""} />`;
  return { html, css: MASK_INPUT_CSS };
}

export const MASK_INPUT_CSS = `
  :host { display: block; }
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
`;

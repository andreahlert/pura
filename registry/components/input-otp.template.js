// Pure render for <pura-input-otp>. No DOM; SSR/DSD + client safe.
// Renders `length` single-char boxes (the value is applied at runtime by
// _setValue, so boxes start empty). All slot attributes derive from the host
// (length/alphanumeric/disabled/invalid) plus i18n digit labels. Under
// EMPTY_SHIM length resolves to 6.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function lengthOf(el) {
  const n = parseInt(el.getAttribute("length"), 10);
  return Number.isFinite(n) && n > 0 ? n : 6;
}

const CSS = `
  :host { display: inline-block; }
  [part="root"] {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
  }
  input {
    width: 2.5rem; height: 2.75rem; padding: 0;
    font: inherit; font-size: var(--pura-text-lg); font-weight: 550;
    text-align: center; color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  :host([mono]) input { font-family: var(--pura-font-mono); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
    z-index: 1;
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  :host([invalid]) input {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
`;

export function inputOtpTemplate(el = EMPTY_SHIM) {
  const len = lengthOf(el);
  const slot = (i) =>
    `<input part="slot" type="text" inputmode="${el.hasAttribute("alphanumeric") ? "text" : "numeric"}"
      autocomplete="${i === 0 ? "one-time-code" : "off"}" maxlength="1"
      aria-label="${t("input-otp.digit", { n: i + 1, total: len })}"
      ${el.hasAttribute("disabled") ? "disabled" : ""}
      ${el.hasAttribute("invalid") ? 'aria-invalid="true"' : ""} />`;
  const html = `<div part="root" role="group" aria-label="${t("input-otp.group")}">
         ${Array.from({ length: len }, (_, i) => slot(i)).join("")}
       </div>`;
  return { html, css: CSS };
}

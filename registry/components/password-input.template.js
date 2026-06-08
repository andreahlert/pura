// Pure render(s) for <password-input> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const EYE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;

export function passwordInputTemplate(el = EMPTY_SHIM) {
  const meter = el.hasAttribute("meter");
  const html = `<div class="wrap">
         <input part="input" type="password"
           placeholder="${el.getAttribute("placeholder") || ""}"
           ${el.hasAttribute("disabled") ? "disabled" : ""}
           value="${el.getAttribute("value") || ""}" />
         <button class="toggle" part="toggle" type="button" tabindex="0"
           aria-label="${t("password.show")}" aria-pressed="false">${EYE}</button>
       </div>
       <div class="meter" part="meter" ${meter ? "" : "hidden"} aria-hidden="${meter ? "false" : "true"}>
         <span class="seg"></span><span class="seg"></span><span class="seg"></span><span class="seg"></span>
       </div>
       <small class="label" part="label" ${meter ? "" : "hidden"}></small>`;
  return { html, css: PASSWORD_INPUT_CSS };
}

export const PASSWORD_INPUT_CSS = `
  :host { display: block; }
  .wrap { position: relative; display: block; }
  input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 2.5rem 0 var(--pura-space-3); height: 2.25rem;
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
  .toggle {
    position: absolute; top: 50%; right: var(--pura-space-2); transform: translateY(-50%);
    display: grid; place-items: center; width: 1.75rem; height: 1.75rem;
    border: none; background: transparent; color: var(--pura-muted);
    cursor: pointer; border-radius: var(--pura-radius-sm); padding: 0;
    transition: color var(--pura-dur) var(--pura-ease), background var(--pura-dur) var(--pura-ease);
  }
  .toggle:hover { color: var(--pura-fg); background: var(--pura-subtle); }
  .toggle:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .toggle svg { width: 1.1rem; height: 1.1rem; }
  .meter { display: flex; gap: var(--pura-space-1); margin-top: var(--pura-space-2); }
  .meter[hidden] { display: none; }
  .seg {
    flex: 1; height: 0.3rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .label {
    display: block; margin-top: var(--pura-space-1);
    font-size: var(--pura-text-xs); color: var(--pura-muted); font-weight: 550;
  }
  .label[hidden] { display: none; }
`;

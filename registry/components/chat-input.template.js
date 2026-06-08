// Pure render for <pura-chat-input>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function chatInputTemplate(el = EMPTY_SHIM) {
  const disabled = el.hasAttribute("disabled");
  const sendLabel = el.getAttribute("send-label") || t("chat-input.send");
  const html = `<div class="root" part="root" data-pura-disabled="${disabled ? "true" : "false"}">
         <span class="actions" part="actions"><slot name="actions"></slot></span>
         <textarea class="field" part="field" rows="1"
           aria-label="${t("chat-input.message")}"
           ${el.getAttribute("placeholder") ? `placeholder="${el.getAttribute("placeholder")}"` : ""}
           ${el.hasAttribute("maxlength") ? `maxlength="${el.getAttribute("maxlength")}"` : ""}
           ${disabled ? "disabled" : ""}></textarea>
         <button class="send" part="send" type="button"
           aria-label="${sendLabel}"
           ${disabled ? "disabled" : ""}>
           <svg part="send-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l14-7-7 14-2-5-5-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>
       </div>`;
  return { html, css: CHAT_INPUT_CSS };
}

export const CHAT_INPUT_CSS = `
  :host { display: block; }
  :host([disabled]) { opacity: 0.6; }

  .root {
    display: flex; align-items: flex-end; gap: var(--pura-space-2);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-lg);
    padding: var(--pura-space-2);
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .root:focus-within {
    border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* actions slot collapses when empty (no assigned nodes) */
  .actions { display: inline-flex; align-items: center; gap: var(--pura-space-1); flex: none; }
  .actions:not(:has(*)) { display: none; }

  .field {
    flex: 1 1 auto; min-width: 0;
    font: inherit; font-size: var(--pura-text-sm); line-height: 1.45;
    color: var(--pura-fg); background: transparent;
    border: none; outline: none; resize: none;
    padding: var(--pura-space-2) var(--pura-space-1);
    max-height: 12rem; overflow-y: auto;
  }
  .field::placeholder { color: var(--pura-muted); }
  .field:disabled { cursor: not-allowed; }

  .send {
    flex: none; display: inline-grid; place-items: center;
    width: 2.25rem; height: 2.25rem;
    font: inherit; cursor: pointer;
    color: var(--pura-primary-fg); background: var(--pura-primary);
    border: 1px solid transparent; border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .send svg { width: 1.05rem; height: 1.05rem; }
  .send:hover { background: var(--pura-primary-hover); }
  .send:active { transform: translateY(0.5px) scale(0.99); }
  .send:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .send:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
`;

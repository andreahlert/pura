// Pure render for <pura-terminal>. No DOM; SSR/DSD + client safe.
// Renders the prompt line + an EMPTY output log; rows are appended at runtime by
// write()/writeLine(). Under EMPTY_SHIM the prompt is "$ " and the input
// aria-label resolves to the default-locale "Terminal".
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Quote-safe escaping for the prompt/label (terminal order: & < > ").
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CSS = `
  :host {
    display: block;
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    background: var(--pura-fg);
    color: var(--pura-bg);
    overflow: hidden;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-sm);
    cursor: text;
  }

  .output {
    padding: var(--pura-space-3);
    max-height: 20rem;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.5;
  }
  .row { min-height: 1.2em; }

  .line {
    display: flex; align-items: baseline; gap: var(--pura-space-1);
    padding: 0 var(--pura-space-3) var(--pura-space-3);
  }
  .prompt {
    flex: none;
    color: var(--pura-success-fg);
    white-space: pre;
    user-select: none;
    -webkit-user-select: none;
  }
  .input {
    flex: 1 1 auto; min-width: 0;
    font: inherit; color: inherit;
    background: transparent; border: none; outline: none;
    padding: 0;
  }
`;

export function terminalTemplate(el = EMPTY_SHIM) {
  const prompt = el.getAttribute("prompt") ?? "$ ";
  const html = `<div class="output" part="output" role="log" aria-live="polite"></div>
       <div class="line" part="line">
         <span class="prompt" part="prompt">${esc(prompt)}</span>
         <input class="input" part="input" type="text" autocomplete="off"
           autocapitalize="off" spellcheck="false" aria-label="${esc(t("terminal.label"))}" />
       </div>`;
  return { html, css: CSS };
}

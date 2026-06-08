// Pure render for <pura-agent-hint>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function agentHintTemplate(el = EMPTY_SHIM) {
  const html = `<span part="hint"><slot></slot></span>`;
  return { html, css: AGENT_HINT_CSS };
}

export const AGENT_HINT_CSS = `
  /* sr-only: visually hidden but present in the DOM + accessibility tree.
     The host stays in the a11y tree; slotted text is announced by AT/agents. */
  :host {
    position: absolute !important;
    width: 1px; height: 1px;
    padding: 0; margin: -1px; border: 0;
    overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Opt-in visible escape hatch for authoring / debugging. */
  :host([visible]) {
    position: static !important;
    width: auto; height: auto;
    padding: var(--pura-space-1) var(--pura-space-2); margin: 0;
    overflow: visible; clip: auto; clip-path: none;
    white-space: normal;
    display: inline-block;
    font-size: var(--pura-text-xs); line-height: 1.5;
    color: var(--pura-muted-fg);
    background: var(--pura-subtle);
    border: 1px dashed var(--pura-border-strong);
    border-radius: var(--pura-radius-sm);
  }
  :host([visible][data-level="warning"]) {
    color: var(--pura-warning);
    border-color: color-mix(in srgb, var(--pura-warning) 45%, transparent);
  }
  :host([visible][data-level="tip"]) {
    color: var(--pura-accent);
    border-color: color-mix(in srgb, var(--pura-accent) 45%, transparent);
  }

  [part="hint"] { display: contents; }
`;

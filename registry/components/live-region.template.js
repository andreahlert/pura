// Pure render for <pura-live-region>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function liveRegionTemplate(el = EMPTY_SHIM) {
  const html = `<span part="region"><slot></slot><span part="output"></span></span>`;
  return { html, css: LIVE_REGION_CSS };
}

export const LIVE_REGION_CSS = `
  /* sr-only by default: visually hidden but present in the DOM + accessibility
     tree, so AT and agents observe announcements without visible chrome. */
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
    padding: var(--pura-space-2) var(--pura-space-3); margin: 0;
    overflow: visible; clip: auto; clip-path: none;
    white-space: normal;
    display: block;
    font-size: var(--pura-text-sm); line-height: 1.5;
    color: var(--pura-muted-fg);
    background: var(--pura-subtle);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius);
  }
  :host([visible][data-live="assertive"]) {
    color: var(--pura-fg);
    border-color: color-mix(in srgb, var(--pura-danger) 35%, transparent);
  }

  [part="region"], [part="output"] { display: contents; }
`;

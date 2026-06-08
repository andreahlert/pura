// Pure render for <pura-redact>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function redactTemplate(el = EMPTY_SHIM) {
  const html = `<span part="control" class="control" role="button" tabindex="0"
             aria-pressed="false">
         <span part="content" class="content"><slot></slot></span>
         <span part="overlay" class="overlay" aria-hidden="true"></span>
       </span>`;
  return { html, css: REDACT_CSS };
}

export const REDACT_CSS = `
  :host { display: inline-block; max-width: 100%; vertical-align: bottom; }

  .control {
    position: relative;
    display: inline-flex; align-items: center;
    max-width: 100%;
    font: inherit; font-family: var(--pura-font-mono);
    border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2);
    background: var(--pura-subtle);
    color: var(--pura-fg);
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  /* non-interactive (reveal-on=none or disabled): no pointer affordance */
  :host([data-reveal-on="none"]) .control { cursor: default; }
  :host([disabled]) .control { cursor: not-allowed; opacity: 0.6; }

  .control:hover { background: var(--pura-subtle-hover); }
  .control:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .content {
    display: inline-block;
    max-width: 100%;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    line-height: 1.4;
    user-select: none;
    filter: blur(6px);
    transition: filter var(--pura-dur) var(--pura-ease);
  }
  :host([data-blur="sm"]) .content { filter: blur(4px); }
  :host([data-blur="lg"]) .content { filter: blur(9px); }

  /* revealed: clear the blur, allow selecting / copying the real value */
  :host([revealed]) .content {
    filter: none;
    user-select: text;
  }

  /* Overlay sits above the blurred content while hidden so neither pixels nor
     a partially-legible glyph leak through. Hidden once revealed. */
  .overlay {
    position: absolute; inset: 0;
    border-radius: inherit;
    background: var(--pura-subtle);
    opacity: 1;
    transition: opacity var(--pura-dur) var(--pura-ease);
  }
  :host([revealed]) .overlay { opacity: 0; pointer-events: none; }

  /* When revealed via hover, keep the obscuring layer non-interactive so the
     pointer reaches the content for selection. */
  :host([revealed]) .content { pointer-events: auto; }
`;

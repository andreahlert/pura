// Pure render for <pura-resizable>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function resizableTemplate(el = EMPTY_SHIM) {
  const html = `<div part="container" class="container">
         <div part="panel start" class="panel start"><slot name="start"></slot></div>
         <div part="handle" class="handle" role="separator" tabindex="0"
              aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
           <span part="grip" class="grip" aria-hidden="true"></span>
         </div>
         <div part="panel end" class="panel end"><slot name="end"></slot></div>
       </div>`;
  return { html, css: RESIZABLE_CSS };
}

export const RESIZABLE_CSS = `
  :host { display: block; width: 100%; height: 100%; }

  .container {
    display: flex; flex-direction: row;
    width: 100%; height: 100%;
    overflow: hidden;
    border-radius: var(--pura-radius);
  }
  :host([orientation="vertical"]) .container { flex-direction: column; }

  .panel {
    flex-grow: 0; flex-shrink: 0;
    overflow: auto;
    min-width: 0; min-height: 0;
    background: var(--pura-bg); color: var(--pura-fg);
  }

  .handle {
    position: relative;
    flex: 0 0 auto;
    display: flex; align-items: center; justify-content: center;
    background: var(--pura-border);
    cursor: col-resize;
    touch-action: none;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  :host(:not([orientation="vertical"])) .handle { width: 1px; height: auto; }
  :host([orientation="vertical"]) .handle { height: 1px; width: auto; cursor: row-resize; }

  /* widen the interactive hit area without disturbing the visual 1px rule */
  .handle::before {
    content: ""; position: absolute; z-index: 1;
  }
  :host(:not([orientation="vertical"])) .handle::before {
    inset: 0 -4px;
  }
  :host([orientation="vertical"]) .handle::before {
    inset: -4px 0;
  }

  .handle:hover { background: var(--pura-border-strong); }
  :host([data-active]) .handle { background: var(--pura-accent); }
  .handle:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* grip nub */
  .grip {
    position: relative; z-index: 2;
    display: block;
    background: var(--pura-border-strong);
    border-radius: var(--pura-radius-full);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  :host(:not([orientation="vertical"])) .grip { width: 4px; height: 1.75rem; }
  :host([orientation="vertical"]) .grip { height: 4px; width: 1.75rem; }
  .handle:hover .grip { background: var(--pura-muted); }
  :host([data-active]) .grip { background: var(--pura-accent); }
`;

// Pure render for <pura-optimistic>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function optimisticTemplate(el = EMPTY_SHIM) {
  const html = `<div part="wrap">
         <div part="view" class="view">
           <div part="original" class="pane original"><slot></slot></div>
           <div part="optimistic" class="pane optimistic"><slot name="optimistic"></slot></div>
         </div>
         <div part="control" class="control">
           <slot name="trigger"><button part="trigger" type="button" class="fallback"></button></slot>
         </div>
       </div>
       <div part="status" class="status" role="status" aria-live="polite" aria-atomic="true"></div>`;
  return { html, css: OPTIMISTIC_CSS };
}

export const OPTIMISTIC_CSS = `
  :host { display: inline-block; }

  [part="wrap"] {
    display: inline-flex; flex-direction: column; gap: var(--pura-space-3);
    align-items: stretch;
  }

  .view {
    position: relative;
    border-radius: var(--pura-radius);
  }

  /* Cross-fade between original and optimistic panes by stacking them. */
  .pane {
    transition: opacity var(--pura-dur) var(--pura-ease);
  }
  .optimistic {
    position: absolute; inset: 0;
    opacity: 0; pointer-events: none;
  }
  .original { opacity: 1; }

  /* pending + committed reveal the optimistic pane and hide the original */
  :host([state="pending"]) .original,
  :host([state="committed"]) .original { opacity: 0; pointer-events: none; }
  :host([state="pending"]) .optimistic,
  :host([state="committed"]) .optimistic { opacity: 1; pointer-events: auto; position: static; inset: auto; }

  /* a faint busy treatment while the action is in flight */
  :host([state="pending"]) .view { opacity: 0.92; }

  .control { display: flex; }

  /* built-in fallback trigger, styled like a secondary pura-button */
  button.fallback {
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-4); height: 2.25rem;
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  button.fallback:hover { background: var(--pura-subtle); }
  button.fallback:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  button.fallback[aria-busy="true"] { opacity: 0.7; }

  :host([disabled]) button.fallback { opacity: 0.55; cursor: not-allowed; pointer-events: none; }
  :host([disabled]) .control { opacity: 0.55; }

  /* failed state: subtle danger outline on the reverted view */
  :host([state="failed"]) .view {
    outline: 1px solid color-mix(in srgb, var(--pura-danger) 35%, transparent);
    outline-offset: 2px;
    border-radius: var(--pura-radius);
  }

  /* sr-only live region: present in the a11y tree, hidden from sighted users */
  .status {
    position: absolute !important;
    width: 1px; height: 1px;
    padding: 0; margin: -1px; border: 0;
    overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%);
    white-space: nowrap;
  }
`;

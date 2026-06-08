// Pure render(s) for <speed-dial> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function speedDialActionTemplate(el = EMPTY_SHIM) {
  const html = `<span class="label" part="label"><slot></slot></span>
       <span class="btn" part="button" aria-hidden="true">
         <slot name="icon"></slot>
       </span>`;
  return { html, css: SPEED_DIAL_ACTION_CSS };
}

export const SPEED_DIAL_ACTION_CSS = `
  :host {
    display: inline-flex; align-items: center; justify-content: flex-end;
    gap: var(--pura-space-3); cursor: pointer; outline: none;
    user-select: none; color: var(--pura-fg);
    opacity: 0; transform: translateY(6px) scale(0.9);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  /* Reverse content order when the dial sits in a *-start corner so the label
     follows the button rather than preceding it. The parent sets [data-start]. */
  :host([data-start]) { flex-direction: row-reverse; justify-content: flex-start; }

  .label {
    font-size: var(--pura-text-sm); font-weight: 500; line-height: 1;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    box-shadow: var(--pura-shadow-sm);
    padding: var(--pura-space-1) var(--pura-space-2); white-space: nowrap;
  }
  .label:empty { display: none; }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.5rem; height: 2.5rem; flex: none;
    border-radius: var(--pura-radius-full);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); box-shadow: var(--pura-shadow);
    transition: background var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .btn ::slotted(svg) { width: 1.25rem; height: 1.25rem; }
  :host(:hover) .btn { background: var(--pura-subtle); }
  :host(:active) .btn { transform: scale(0.94); }
  :host(:focus-visible) .btn { outline: none; box-shadow: var(--pura-shadow), 0 0 0 3px var(--pura-ring); }

  :host([disabled]) { cursor: not-allowed; pointer-events: none; opacity: 0.5; }

  /* Fan-out reveal: the parent sets [data-open] on each action when the dial
     opens, with a per-item --pura-speed-dial-index for a staggered cascade.
     The base reset neutralizes the transition under prefers-reduced-motion. */
  :host { transition-delay: 0ms; }
  :host([data-open]) {
    opacity: 1; transform: none;
    transition-delay: calc(var(--pura-speed-dial-index, 0) * 35ms);
  }
`;

// Pure render(s) for <reactions> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function reactionTemplate(el = EMPTY_SHIM) {
  const html = `<button class="pill" part="button" type="button">
         <span class="emoji" part="emoji" aria-hidden="true"></span>
         <span class="count" part="count" aria-hidden="true"></span>
         <span class="sr"></span>
       </button>`;
  return { html, css: REACTION_CSS };
}

export const REACTION_CSS = `
  :host { display: inline-block; }
  :host([disabled]) { cursor: not-allowed; }

  .pill {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; cursor: pointer; white-space: nowrap;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-full);
    padding: 0.3rem var(--pura-space-3); min-height: 1.875rem;
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .pill:hover { background: var(--pura-subtle-hover); }
  .pill:active { transform: scale(0.97); }
  .pill:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .pill:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* active (the viewer reacted): accent-tinted highlighted pill */
  .pill[aria-pressed="true"] {
    background: var(--pura-info-bg);
    color: var(--pura-accent);
    border-color: color-mix(in srgb, var(--pura-accent) 40%, transparent);
  }
  .pill[aria-pressed="true"]:hover {
    background: color-mix(in srgb, var(--pura-accent) 14%, var(--pura-info-bg));
  }

  .emoji { font-size: 1.05em; line-height: 1; }
  .count { font-variant-numeric: tabular-nums; }

  /* visually-hidden running text for assistive tech */
  .sr {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }
`;

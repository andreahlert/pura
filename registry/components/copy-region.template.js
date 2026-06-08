// Pure render(s) for <copy-region> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const COPY =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<rect x="9" y="9" width="11" height="11" rx="2"/>` +
  `<path d="M5 15V5a2 2 0 0 1 2-2h10"/>` +
  `</svg>`;
const CHECK =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M20 6L9 17l-5-5"/>` +
  `</svg>`;
const CSS = `
  :host { display: block; }
  :host([hidden]) { display: none !important; }

  .region {
    position: relative;
    anchor-name: ANCHOR;
    border-radius: var(--pura-radius);
  }

  .content { display: block; }

  /* hover-revealed copy affordance, anchored to the region corner */
  .trigger {
    position: absolute; top: var(--pura-space-2); right: var(--pura-space-2);
    z-index: 1;
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.875rem; height: 1.875rem; padding: 0;
    font: inherit; line-height: 1; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    /* Dimmed by default but kept in the tab order so keyboard users can reach
       it even when the slotted region has no focusable content. opacity:0 stays
       focusable; pointer-events:none only suppresses mouse, not Tab/focus.
       Under reduced motion the base reset makes the opacity flip instant, so the
       affordance is never motion-only. */
    opacity: 0; pointer-events: none;
    transition: opacity var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  /* Reveal on hover, or whenever focus enters the region (keyboard users). */
  :host(:hover) .trigger,
  :host(:focus-within) .trigger,
  .region:hover .trigger,
  .trigger:focus-visible { opacity: 1; pointer-events: auto; }

  .trigger:hover { background: var(--pura-subtle); }
  .trigger:active { transform: translateY(0.5px) scale(0.98); }
  .trigger:focus-visible {
    outline: none; box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* disabled: genuinely remove the affordance from view + tab order */
  .trigger:disabled,
  :host([disabled]) .trigger {
    opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;
  }

  .icon {
    display: inline-flex; align-items: center; justify-content: center;
    font-size: var(--pura-text-base);
  }
  .icon svg { display: block; }

  /* swap copy <-> check while in the copied state */
  .check { display: none; color: var(--pura-success-fg); }
  :host([data-copied]) .copy-icon { display: none; }
  :host([data-copied]) .trigger .check { display: inline-flex; }

  /* floating confirmation — native Popover API + CSS anchor positioning */
  .confirm {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; padding: var(--pura-space-2) var(--pura-space-3);
    bottom: anchor(top); right: anchor(right); margin-bottom: var(--pura-space-2);
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    width: max-content; max-width: min(16rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg);
    font-size: var(--pura-text-xs); font-weight: 550;
    opacity: 0; transform: translateY(4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .confirm:popover-open { opacity: 1; transform: none; }
  .confirm .check { display: inline-flex; color: var(--pura-success-fg); }
  .confirm .check svg { width: 0.9em; height: 0.9em; }

  /* placement variants for the confirmation */
  :host([placement="bottom"]) .confirm {
    top: anchor(bottom); bottom: auto; right: anchor(right);
    margin: var(--pura-space-2) 0 0; transform: translateY(-4px);
  }
  :host([placement="left"]) .confirm {
    top: anchor(top); bottom: auto; right: anchor(left); left: auto;
    margin: 0 var(--pura-space-2) 0 0; transform: translateX(4px);
  }
  :host([placement="right"]) .confirm {
    top: anchor(top); bottom: auto; left: anchor(right); right: auto;
    margin: 0 0 0 var(--pura-space-2); transform: translateX(-4px);
  }
  :host([placement="bottom"]) .confirm:popover-open,
  :host([placement="left"]) .confirm:popover-open,
  :host([placement="right"]) .confirm:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .confirm {
      position: absolute; inset: auto; top: 0; right: 0;
      bottom: auto; left: auto; margin: 0;
    }
  }

  /* visually-hidden polite live region for screen readers */
  .sr {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
  }
`;

export function copyRegionTemplate(el = EMPTY_SHIM) {
  const html = `<div part="region" class="region">
         <div class="content"><slot></slot></div>
         <button part="trigger" class="trigger" type="button">
           <span class="icon copy-icon" part="icon copy-icon" aria-hidden="true">${COPY}</span>
           <span class="icon check" part="icon check-icon" aria-hidden="true">${CHECK}</span>
         </button>
       </div>
       <div part="confirm" class="confirm" popover="manual" aria-hidden="true">
         <span class="check">${CHECK}</span><span class="confirm-text">${t("copy-region.copied")}</span>
       </div>
       <span part="live" class="sr" role="status" aria-live="polite"></span>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}

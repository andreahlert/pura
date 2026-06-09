// Pure render for <pura-disclosure>. No DOM; safe on server (SSR/DSD) and client.
// The open/close animation uses the modern CSS recipe `interpolate-size:
// allow-keywords` + `transition: height` to tween between 0 and the content's
// natural `auto` height, with no JS measuring and no grid-row hack. Browsers
// without interpolate-size still open and close correctly, they just snap.
import { EMPTY_SHIM } from "../base.js";

export function disclosureTemplate(el = EMPTY_SHIM) {
  const html =
    `<button part="trigger" type="button" class="trigger" aria-expanded="false">` +
      `<slot name="trigger">Details</slot>` +
      `<span class="chevron" part="chevron" aria-hidden="true">` +
        `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>` +
      `</span>` +
    `</button>` +
    `<div part="content" class="content" role="region">` +
      `<div class="inner" part="inner"><slot></slot></div>` +
    `</div>`;
  return { html, css: DISCLOSURE_CSS };
}

export const DISCLOSURE_CSS = `
  :host {
    display: block;
    /* Enables keyword (auto / max-content) interpolation for descendants, the
       crux of animating height to auto without measuring in JS. */
    interpolate-size: allow-keywords;
  }

  .trigger {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; gap: var(--pura-space-2, 0.5rem);
    font: inherit; font-weight: 550; text-align: left;
    color: var(--pura-fg, #18181b); cursor: pointer;
    background: transparent; border: none;
    border-radius: var(--pura-radius-sm, 6px);
    padding: var(--pura-space-1, 0.25rem) 0;
  }
  .trigger:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring, #6366f1); }
  .trigger:disabled { opacity: 0.55; cursor: not-allowed; }

  .chevron {
    display: inline-flex; flex: none;
    transition: transform var(--pura-disclosure-duration, 0.3s) var(--pura-ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }
  :host([open]) .chevron { transform: rotate(180deg); }

  .content {
    height: 0;
    overflow: clip;
    opacity: 0;
    /* base.js RESET collapses these durations under reduced motion, so the panel
       opens/closes instantly with no separate guard. */
    transition:
      height var(--pura-disclosure-duration, 0.3s) var(--pura-ease, cubic-bezier(0.2, 0.8, 0.2, 1)),
      opacity var(--pura-disclosure-duration, 0.3s) ease;
  }
  :host([open]) .content {
    height: auto;
    opacity: 1;
  }

  .inner {
    padding-top: var(--pura-space-2, 0.5rem);
    color: var(--pura-fg, #18181b);
  }
`;

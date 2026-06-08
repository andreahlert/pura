// Pure render(s) for <range-slider> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function esc(s) {
  return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function rangeSliderTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("aria-label") || t("range-slider.label");
  const html = `<div class="wrap" part="root" data-pura="range-slider">
         <div class="track" part="track" data-pura-part="track">
           <div class="fill" part="fill" data-pura-part="fill"></div>
           <div class="thumb" part="thumb thumb-min" data-pura-part="thumb-min"
             role="slider" tabindex="0"
             aria-label="${esc(label)} ${esc(t("range-slider.minimum"))}"
             aria-orientation="horizontal"></div>
           <div class="thumb" part="thumb thumb-max" data-pura-part="thumb-max"
             role="slider" tabindex="0"
             aria-label="${esc(label)} ${esc(t("range-slider.maximum"))}"
             aria-orientation="horizontal"></div>
         </div>
       </div>`;
  return { html, css: RANGE_SLIDER_CSS };
}

export const RANGE_SLIDER_CSS = `
  :host { display: block; padding: var(--pura-space-3) 0; }
  :host([disabled]) { opacity: 0.55; cursor: not-allowed; }

  .wrap { position: relative; padding: 0 0.5625rem; }

  .track {
    position: relative; height: 0.375rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); touch-action: none;
  }

  .fill {
    position: absolute; top: 0; bottom: 0;
    background: var(--pura-primary); border-radius: var(--pura-radius-full);
  }

  .thumb {
    position: absolute; top: 50%; width: 1.125rem; height: 1.125rem;
    transform: translate(-50%, -50%);
    border-radius: var(--pura-radius-full);
    background: #fff; border: 1px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm); cursor: grab; touch-action: none;
    transition: box-shadow var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .thumb:active { cursor: grabbing; }
  .thumb:hover { border-color: var(--pura-fg); }
  .thumb:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  /* keep the max thumb above the min thumb when they overlap at the extremes */
  [data-pura-part="thumb-max"] { z-index: 1; }

  :host([disabled]) .thumb { cursor: not-allowed; }
  :host([disabled]) .fill { background: var(--pura-muted); }
`;

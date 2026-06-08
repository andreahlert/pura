// Pure render for <pura-scroll-progress>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function scrollProgressTemplate(el = EMPTY_SHIM) {
  const html = `<div class="bar" part="bar" role="progressbar"
            aria-label="${t("scroll-progress.aria")}"
            aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
         <div class="fill" part="fill"></div>
       </div>`;
  return { html, css: SCROLL_PROGRESS_CSS };
}

export const SCROLL_PROGRESS_CSS = `
  :host { display: contents; }

  .bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    width: 100%;
    height: var(--_sp-height, 3px);
    background: transparent;
    z-index: 2147483646;
    pointer-events: none;
  }

  .fill {
    height: 100%;
    width: 0%;
    background: var(--_sp-color, var(--pura-primary));
    transition: width var(--pura-dur) var(--pura-ease);
  }
`;

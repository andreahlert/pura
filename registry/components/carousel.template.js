// Pure render for <pura-carousel>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function carouselTemplate(el = EMPTY_SHIM) {
  const html = `<div part="root" role="region" aria-roledescription="carousel" aria-label="${el.getAttribute("label") || t("carousel.label")}">
         <button part="control prev" class="ctl prev" type="button" aria-label="${t("carousel.prev")}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>
         <div part="viewport" class="viewport" tabindex="0" role="group" aria-roledescription="slides" aria-label="${t("carousel.slides")}">
           <slot></slot>
         </div>
         <button part="control next" class="ctl next" type="button" aria-label="${t("carousel.next")}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>
         <div part="dots" class="dots" role="tablist" aria-label="${t("carousel.choose")}"></div>
       </div>`;
  return { html, css: CAROUSEL_CSS };
}

export const CAROUSEL_CSS = `
  :host { display: block; position: relative; --pura-carousel-per: 1; }

  [part="root"] {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr auto;
    align-items: center;
    gap: var(--pura-space-2);
  }

  .viewport {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    gap: var(--pura-space-4);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    border-radius: var(--pura-radius);
    scrollbar-width: none;
  }
  .viewport::-webkit-scrollbar { display: none; }
  .viewport:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* Slotted slides: equal width based on per-view, snap to center. */
  ::slotted(*) {
    flex: 0 0 calc((100% - (var(--pura-carousel-per) - 1) * var(--pura-space-4)) / var(--pura-carousel-per));
    min-width: 0;
    scroll-snap-align: center;
  }

  .ctl {
    grid-row: 1;
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; flex: none;
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-full);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .ctl.prev { grid-column: 1; }
  .ctl.next { grid-column: 3; }
  .ctl svg { width: 1.125rem; height: 1.125rem; }
  .ctl:hover { background: var(--pura-subtle); }
  .ctl:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .ctl:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

  :host([hide-controls]) .ctl { display: none; }

  .dots {
    grid-row: 2;
    grid-column: 1 / -1;
    display: flex; justify-content: center; align-items: center;
    gap: var(--pura-space-2);
    margin-top: var(--pura-space-3);
  }
  .dot {
    width: 0.5rem; height: 0.5rem; padding: 0; flex: none;
    border: none; border-radius: var(--pura-radius-full);
    background: var(--pura-border-strong); cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      width var(--pura-dur) var(--pura-ease);
  }
  .dot:hover { background: var(--pura-muted); }
  .dot.active { background: var(--pura-primary); width: 1.25rem; }
  .dot:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  :host([hide-dots]) .dots { display: none; }
`;

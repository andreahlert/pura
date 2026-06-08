// Pure render for <pura-lightbox>. No DOM; SSR/DSD + client safe.
// Renders the gallery shell (with the default <slot> for thumbnails) plus the
// closed <dialog> viewer with EMPTY .image/.caption/.counter; those are filled
// at runtime by _sync() once an item opens. Under EMPTY_SHIM the label resolves
// to getAttribute("label") (null) || the default-locale "Image gallery".
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Escapes the full set incl. single-quote (lightbox order: & < > " ' via map).
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

const CSS = `
  :host { display: block; }

  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: var(--pura-space-3);
  }

  /* Slotted thumbnails / triggers: clickable, focusable affordance. */
  ::slotted(img),
  ::slotted(a),
  ::slotted(figure) {
    cursor: zoom-in;
    border-radius: var(--pura-radius);
    transition: transform var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  ::slotted(img) { display: block; max-width: 100%; height: auto; }
  ::slotted(img:hover),
  ::slotted(a:hover),
  ::slotted(figure:hover) {
    transform: scale(1.02);
    box-shadow: var(--pura-shadow);
  }
  ::slotted(:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* ---- viewer (native dialog) ---- */
  .viewer {
    padding: 0;
    border: none;
    background: transparent;
    color: #fff;
    max-width: 100vw;
    max-height: 100dvh;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
  }
  .viewer::backdrop {
    background: rgb(0 0 0 / 0.9);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity var(--pura-dur) var(--pura-ease);
  }
  .viewer[open]::backdrop { opacity: 1; }

  .stage {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--pura-space-3);
    width: 100%;
    height: 100%;
    padding: var(--pura-space-6);
  }

  .figure {
    grid-column: 2;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--pura-space-3);
    min-width: 0;
    min-height: 0;
    height: 100%;
    opacity: 0;
    transform: scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .viewer[open] .figure { opacity: 1; transform: none; }

  .image {
    display: block;
    max-width: 100%;
    max-height: calc(100dvh - var(--pura-space-6) * 2 - 3rem);
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg);
  }

  .caption {
    font-size: var(--pura-text-sm);
    color: #fff;
    text-align: center;
    max-width: 60ch;
    text-shadow: 0 1px 3px rgb(0 0 0 / 0.6);
  }

  .ctl {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    flex: none;
    border: 1px solid rgb(255 255 255 / 0.25);
    border-radius: var(--pura-radius-full);
    background: rgb(0 0 0 / 0.4);
    color: #fff;
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .ctl.prev { grid-column: 1; }
  .ctl.next { grid-column: 3; }
  .ctl svg { width: 1.5rem; height: 1.5rem; }
  .ctl:hover { background: rgb(0 0 0 / 0.65); border-color: rgb(255 255 255 / 0.5); }
  .ctl:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .ctl:disabled { opacity: 0.3; cursor: not-allowed; }

  .counter {
    position: absolute;
    bottom: var(--pura-space-5);
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--pura-text-sm);
    font-variant-numeric: tabular-nums;
    color: #fff;
    background: rgb(0 0 0 / 0.5);
    padding: var(--pura-space-1) var(--pura-space-3);
    border-radius: var(--pura-radius-full);
    text-shadow: 0 1px 2px rgb(0 0 0 / 0.6);
  }

  .x {
    position: absolute;
    top: var(--pura-space-5);
    right: var(--pura-space-5);
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid rgb(255 255 255 / 0.25);
    border-radius: var(--pura-radius-full);
    background: rgb(0 0 0 / 0.4);
    color: #fff;
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .x:hover { background: rgb(0 0 0 / 0.65); }
  .x svg { width: 1.25rem; height: 1.25rem; }
  .x:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
`;

export function lightboxTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label") || t("lightbox.gallery");
  const html = `<div part="gallery" class="gallery" role="group" aria-label="${esc(label)}">
         <slot></slot>
       </div>
       <dialog part="viewer" class="viewer" role="dialog" aria-modal="true" aria-label="${esc(label)}">
         <div part="stage" class="stage">
           <button part="control prev" class="ctl prev" type="button" aria-label="${esc(t("lightbox.prev"))}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>
           <figure part="figure" class="figure">
             <img part="image" class="image" alt="" />
             <figcaption part="caption" class="caption"></figcaption>
           </figure>
           <button part="control next" class="ctl next" type="button" aria-label="${esc(t("lightbox.next"))}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>
         </div>
         <div part="counter" class="counter" aria-live="polite"></div>
         <button part="close" class="x" type="button" aria-label="${esc(t("lightbox.close"))}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </button>
       </dialog>`;
  return { html, css: CSS };
}

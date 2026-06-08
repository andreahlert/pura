// Pure render(s) for <image-compare> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

export function imageCompareTemplate(el = EMPTY_SHIM) {
  const html = `<div class="root" part="root">
         <div class="layer before" part="before"><slot name="before"></slot></div>
         <div class="layer after" part="after"><slot name="after"></slot></div>
         <div class="divider" part="divider" aria-hidden="true">
           <button class="handle" part="handle" type="button"
             role="slider" tabindex="0"
             aria-label="${esc(el.getAttribute("label") || "Before/after comparison")}"
             aria-valuemin="0" aria-valuemax="100">
             <svg viewBox="0 0 24 24" aria-hidden="true">
               <path d="M10 7l-4 5 4 5M14 7l4 5-4 5" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </button>
         </div>
       </div>`;
  return { html, css: IMAGE_COMPARE_CSS };
}

export const IMAGE_COMPARE_CSS = `
  :host {
    display: block; position: relative;
    --pura-ic-pos: 50%;
    border-radius: var(--pura-radius);
    overflow: hidden;
    touch-action: none;
    user-select: none;
  }

  .root {
    position: relative; display: block; width: 100%;
    line-height: 0; cursor: ew-resize;
  }

  /* before layer in normal flow establishes intrinsic height */
  .layer.before { position: relative; }
  .layer.after {
    position: absolute; inset: 0;
    /* reveal from the left up to the handle position */
    clip-path: inset(0 calc(100% - var(--pura-ic-pos)) 0 0);
  }

  /* slotted images fill width, block layout, and never hijack the drag */
  ::slotted(img), ::slotted([slot]) {
    display: block; width: 100%; height: 100%; object-fit: cover;
    pointer-events: none; user-select: none; -webkit-user-drag: none;
  }

  .divider {
    position: absolute; top: 0; bottom: 0;
    left: var(--pura-ic-pos);
    width: 2px; margin-left: -1px;
    background: var(--pura-bg); box-shadow: var(--pura-shadow);
    pointer-events: none;
  }

  .handle {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    display: grid; place-items: center;
    width: 2.25rem; height: 2.25rem;
    padding: 0; border-radius: var(--pura-radius-full);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow);
    cursor: ew-resize; pointer-events: auto;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .handle svg { width: 1.1rem; height: 1.1rem; }
  .handle:hover { border-color: var(--pura-fg); }
  .handle:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
`;

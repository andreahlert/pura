// Pure render(s) for <rating> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function ratingTemplate(el = EMPTY_SHIM) {
  const html = `<div class="rating" part="rating" role="slider"
            aria-label="${esc(el.getAttribute("label") || "Rating")}"
            tabindex="0">
         <div class="stars" part="stars"></div>
         <span class="sr" part="value-text" aria-hidden="true"></span>
       </div>`;
  return { html, css: RATING_CSS };
}

export const RATING_CSS = `
  :host { display: inline-block; }
  :host([readonly]) { cursor: default; }

  .rating {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    border-radius: var(--pura-radius); outline: none;
  }
  .rating:focus-visible {
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .stars {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font-size: var(--pura-text-xl); line-height: 1;
  }

  .star {
    position: relative; display: inline-flex;
    width: 1em; height: 1em; cursor: pointer;
    color: var(--pura-border-strong);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  :host([readonly]) .star { cursor: default; }

  .glyph {
    position: absolute; inset: 0;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .glyph.empty { color: var(--pura-border-strong); }
  .glyph.full {
    color: var(--pura-warning);
    width: var(--fill, 0%);
    overflow: hidden;
  }

  /* subtle pop on the actively-filled stars when interactive */
  .rating:not([aria-readonly="true"]) .star.on { transform: scale(1.04); }

  .sr {
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg);
    font-variant-numeric: tabular-nums;
  }
`;

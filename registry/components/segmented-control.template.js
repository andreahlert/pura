// Pure render for <pura-segmented-control>. No DOM; SSR/DSD + client safe.
// Builds the radiogroup + sliding indicator + one button per parsed option,
// with the active segment resolved from [value] (else the first option). Under
// EMPTY_SHIM there are no options, so an empty group renders (--pura-seg-count:1,
// default aria-label) and segments are filled when [options] is present.
import { EMPTY_SHIM } from "../base.js";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: inline-block; vertical-align: middle; }
  :host([disabled]) { opacity: 0.55; pointer-events: none; }

  .group {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    isolation: isolate;
    gap: 0;
    padding: var(--pura-space-1);
    background: var(--pura-subtle);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-full);
  }

  /* Sliding active indicator: equal-width, positioned by transform — no JS
     measurement, so it lands correctly on first paint and snaps under
     prefers-reduced-motion (base reset neutralizes the transition). */
  .indicator {
    position: absolute;
    z-index: 0;
    top: var(--pura-space-1);
    bottom: var(--pura-space-1);
    left: var(--pura-space-1);
    width: calc((100% - 2 * var(--pura-space-1)) / var(--pura-seg-count, 1));
    background: var(--pura-bg);
    border-radius: var(--pura-radius-full);
    box-shadow: var(--pura-shadow-sm);
    transform: translateX(calc(var(--pura-seg-index, 0) * 100%));
    transition: transform var(--pura-dur) var(--pura-ease),
      opacity var(--pura-dur) var(--pura-ease);
  }

  .segment {
    position: relative;
    z-index: 1;
    appearance: none;
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: none; background: transparent;
    color: var(--pura-muted-fg);
    padding: 0 var(--pura-space-4); height: 1.875rem;
    border-radius: var(--pura-radius-full);
    transition: color var(--pura-dur) var(--pura-ease);
    -webkit-tap-highlight-color: transparent;
  }
  .segment:hover { color: var(--pura-fg); }
  .segment[aria-checked="true"] { color: var(--pura-fg); font-weight: 600; }
  .segment:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .segment:disabled { cursor: not-allowed; }

  /* sizes */
  :host([size="sm"]) .segment { height: 1.625rem; font-size: var(--pura-text-xs); padding: 0 var(--pura-space-3); }
  :host([size="lg"]) .segment { height: 2.25rem; font-size: var(--pura-text-base); padding: 0 var(--pura-space-5); }
`;

export function segmentedControlTemplate(el = EMPTY_SHIM) {
  const raw = el.getAttribute("options");
  const opts = raw ? raw.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : [];
  const count = opts.length;

  // Resolve the active index: requested value if valid, else first option.
  let active = opts.indexOf(el.getAttribute("value"));
  if (active < 0) active = count > 0 ? 0 : -1;

  const segments = opts
    .map((label, i) => {
      const checked = i === active;
      return `<button part="segment" class="segment" type="button" role="radio"
          data-index="${i}" data-value="${escapeAttr(label)}"
          data-active="${checked}"
          aria-checked="${checked}" tabindex="${checked ? 0 : -1}"
        >${escapeHtml(label)}</button>`;
    })
    .join("");

  const html = `<div part="group" class="group" role="radiogroup"
         aria-label="${escapeAttr(el.getAttribute("label") || "Segmented control")}"
         style="--pura-seg-count: ${count || 1};">
         <span part="indicator" class="indicator" aria-hidden="true"></span>
         ${segments}
       </div>`;
  return { html, css: CSS };
}

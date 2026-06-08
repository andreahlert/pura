// Pure render(s) for <date-range-picker> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const CSS = `
  :host { display: inline-block; }

  .anchor {
    anchor-name: ANCHOR;
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    min-width: 16rem; width: 100%; text-align: left;
    font: inherit; font-size: var(--pura-text-sm); line-height: 1;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm); cursor: pointer;
    padding: 0 var(--pura-space-3); height: 2.25rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  .anchor:hover { border-color: var(--pura-fg); }
  .anchor:focus-visible { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }
  .anchor:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }

  .icon { width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
    fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    font-variant-numeric: tabular-nums; }
  .anchor.placeholder .label { color: var(--pura-muted); }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(42rem, 96vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-3);
    font-size: var(--pura-text-sm); user-select: none;
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .grids { display: flex; gap: var(--pura-space-4); }

  .header {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-2); padding: 0 var(--pura-space-1) var(--pura-space-2);
  }
  .mlabel { font-weight: 550; font-size: var(--pura-text-sm); text-align: center; flex: 1; }

  .nav {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.875rem; height: 1.875rem; flex: none;
    background: transparent; color: var(--pura-fg); cursor: pointer;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .nav:hover { background: var(--pura-subtle); }
  .nav:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .nav svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  .weekdays, .cells { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--pura-space-1); }

  .weekday {
    display: flex; align-items: center; justify-content: center;
    height: 2rem; font-size: var(--pura-text-xs); font-weight: 550; color: var(--pura-muted);
  }

  .day {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; padding: 0; margin: 0; font: inherit;
    font-size: var(--pura-text-sm); font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: transparent; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .day:hover { background: var(--pura-subtle); }
  .day:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .day.adjacent { color: var(--pura-muted); opacity: 0.4; cursor: default; }
  .day.adjacent:hover { background: transparent; }

  /* mid-range fill: squared so adjacent days read as a continuous band */
  .day.in-range {
    background: var(--pura-subtle); border-radius: 0;
  }
  /* range edges: filled with primary */
  .day.start, .day.end {
    background: var(--pura-primary); color: var(--pura-primary-fg); font-weight: 550;
  }
  .day.start:hover, .day.end:hover { background: var(--pura-primary-hover); }
  .day.start { border-top-right-radius: 0; border-bottom-right-radius: 0; }
  .day.end { border-top-left-radius: 0; border-bottom-left-radius: 0; }

  .foot {
    display: flex; justify-content: flex-end;
    margin-top: var(--pura-space-3); padding-top: var(--pura-space-3);
    border-top: 1px solid var(--pura-border);
  }
  .clear {
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: transparent; cursor: pointer;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-3); height: 2rem;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .clear:hover { background: var(--pura-subtle); }
  .clear:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  @media (max-width: 34rem) {
    .grids { flex-direction: column; }
  }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

export function dateRangePickerTemplate(el = EMPTY_SHIM) {
  const html = `<button class="anchor" part="trigger" type="button"
         aria-haspopup="dialog" aria-expanded="false"
         ${el.hasAttribute("disabled") ? "disabled" : ""}>
         <svg class="icon" viewBox="0 0 24 24" part="icon" aria-hidden="true">
           <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
         </svg>
         <span class="label" part="label"></span>
       </button>
       <div class="panel" part="panel" popover="auto" role="dialog"
         aria-label="${t("date-range.dialog")}"></div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}

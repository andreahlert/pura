// Pure render(s) for <time-picker> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const CSS = `
  :host { display: inline-block; }

  .anchor {
    anchor-name: ANCHOR;
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    min-width: 10rem; width: 100%; text-align: left;
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
    min-width: anchor-size(width); width: max-content; max-width: min(16rem, 92vw);
    max-height: 16rem; overflow-y: auto;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .option {
    display: block; width: 100%; text-align: left; font: inherit;
    font-size: var(--pura-text-sm); font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: transparent; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-3); height: 2rem; line-height: 2rem;
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .option:hover { background: var(--pura-subtle); }
  .option:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .option.selected {
    background: var(--pura-primary); color: var(--pura-primary-fg); font-weight: 550;
  }
  .option.selected:hover { background: var(--pura-primary-hover); }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

export function timePickerTemplate(el = EMPTY_SHIM) {
  const html = `<button class="anchor" part="trigger" type="button"
         aria-haspopup="listbox" aria-expanded="false"
         ${el.hasAttribute("disabled") ? "disabled" : ""}>
         <svg class="icon" viewBox="0 0 24 24" part="icon" aria-hidden="true">
           <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
         </svg>
         <span class="label" part="label"></span>
       </button>
       <div class="panel" part="panel" popover="auto" role="listbox"
         aria-label="${t("time-picker.dialog")}"></div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}

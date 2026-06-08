// Pure render(s) for <datetime-picker> custom element(s). No DOM; SSR/DSD + client safe.
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
    width: max-content; max-width: min(22rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-3);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  /* the inner calendar is borderless here; the panel provides the surface */
  pura-calendar::part(calendar) { border: 0; box-shadow: none; padding: 0; }

  .time {
    display: flex; align-items: flex-end; gap: var(--pura-space-2);
    margin-top: var(--pura-space-3); padding-top: var(--pura-space-3);
    border-top: 1px solid var(--pura-border);
  }
  .field { display: flex; flex-direction: column; gap: var(--pura-space-1); flex: 1; }
  .flabel { font-size: var(--pura-text-xs); font-weight: 550; color: var(--pura-muted); }
  .sep { padding-bottom: 0.55rem; color: var(--pura-muted); font-weight: 600; }

  select {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-2); height: 2.25rem; cursor: pointer;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  select:hover { border-color: var(--pura-fg); }
  select:focus-visible { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

export function datetimePickerTemplate(el = EMPTY_SHIM) {
  const html = `<button class="anchor" part="trigger" type="button"
         aria-haspopup="dialog" aria-expanded="false"
         ${el.hasAttribute("disabled") ? "disabled" : ""}>
         <svg class="icon" viewBox="0 0 24 24" part="icon" aria-hidden="true">
           <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
         </svg>
         <span class="label" part="label"></span>
       </button>
       <div class="panel" part="panel" popover="auto" role="dialog"
         aria-label="${t("datetime-picker.dialog")}">
         <pura-calendar part="calendar"></pura-calendar>
         <div class="time" part="time">
           <label class="field">
             <span class="flabel hour-label">${t("datetime-picker.hour")}</span>
             <select class="hour" part="hour"></select>
           </label>
           <span class="sep">:</span>
           <label class="field">
             <span class="flabel min-label">${t("datetime-picker.minute")}</span>
             <select class="minute" part="minute"></select>
           </label>
         </div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}

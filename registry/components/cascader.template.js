// Pure render(s) for <cascader> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }
  .anchor { anchor-name: ANCHOR; position: relative; display: block; }

  .trigger {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    display: flex; align-items: center; gap: var(--pura-space-2);
    color: var(--pura-fg); background: var(--pura-bg); text-align: left;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-2) 0 var(--pura-space-3); min-height: 2.25rem;
    box-shadow: var(--pura-shadow-sm); cursor: pointer;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .trigger:hover { border-color: var(--pura-fg); }
  .trigger:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .trigger:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }

  .value { flex: 1 1 auto; min-width: 0; overflow: hidden; }
  .path, .placeholder { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; }
  .placeholder { color: var(--pura-muted); }

  .chev {
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .trigger[aria-expanded="true"] .chev { transform: rotate(180deg); }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: anchor-size(width); width: max-content; max-width: min(48rem, 96vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .columns { display: flex; align-items: stretch; }

  .column {
    display: flex; flex-direction: column; gap: 1px;
    min-width: 10rem; max-height: 16rem; overflow-y: auto;
    padding: var(--pura-space-1);
  }
  .column + .column { border-left: 1px solid var(--pura-border); }

  .option {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2);
    border-radius: var(--pura-radius-sm); cursor: pointer; user-select: none;
    color: var(--pura-fg); line-height: 1.4;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .option:hover { background: var(--pura-subtle); }
  .option[data-active="true"] { background: var(--pura-subtle-hover); font-weight: 550; }
  .option[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }

  .opt-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .arrow { width: 0.85rem; height: 0.85rem; flex: none; color: var(--pura-muted); }

  .empty {
    padding: var(--pura-space-3) var(--pura-space-2);
    color: var(--pura-muted); text-align: center;
  }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .panel { position: absolute; top: 100%; left: 0; inset: auto; margin-top: var(--pura-space-2); }
  }
`;

export function cascaderTemplate(el = EMPTY_SHIM) {
  const html = `<div class="anchor" part="anchor">
         <button type="button" class="trigger" part="trigger" aria-haspopup="menu"
           aria-expanded="false" aria-controls="${el._panelId}"
           ${el.bool("disabled") ? "disabled" : ""}>
           <span class="value" part="value"></span>
           <svg class="chev" part="chevron" viewBox="0 0 24 24" aria-hidden="true">
             <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </button>
         <div class="panel" part="panel" id="${el._panelId}" popover="manual" tabindex="-1">
           <div class="columns"></div>
         </div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}

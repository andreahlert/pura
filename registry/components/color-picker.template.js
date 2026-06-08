// Pure render for <pura-color-picker>. No DOM; SSR/DSD + client safe.
// Renders the swatch trigger + popover panel (preset grid, native color input,
// hex field). The initial markup is entirely static + i18n + the preset palette;
// the live value (dot color, .val text, selected swatch, input values) is filled
// at runtime by _sync, so the template needs only the anchor name. Under
// EMPTY_SHIM el._name falls back to a literal so the CSS anchor and the
// popovertarget/id pair stay valid (name is always a string → .slice can't throw).
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Preset palette. DATA, not styling — applied via inline style so the
// CSS-in-shadow string stays 100% var(--pura-*) tokens.
export const PRESETS = [
  "#000000", "#3f3f46", "#71717a", "#a1a1aa", "#d4d4d8", "#ffffff",
  "#dc2626", "#ea580c", "#d97706", "#16a34a", "#0d9488", "#2563eb",
  "#4f46e5", "#7c3aed", "#c026d3", "#db2777", "#e11d48", "#0891b2",
];

const CSS = `
  :host { display: inline-block; }
  :host([disabled]) { opacity: 0.55; pointer-events: none; }

  .trigger {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: var(--pura-bg); cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .trigger:hover { background: var(--pura-subtle); }
  .trigger:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .trigger:disabled { cursor: not-allowed; }

  .dot {
    width: 1.1rem; height: 1.1rem; flex: none;
    border-radius: var(--pura-radius-sm);
    border: 1px solid var(--pura-border);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
  }
  .val {
    font-family: var(--pura-font-mono); font-size: var(--pura-text-xs);
    text-transform: uppercase; letter-spacing: 0.03em; color: var(--pura-muted-fg);
  }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(18rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-3);
    display: flex; flex-direction: column; gap: var(--pura-space-3);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .trigger { anchor-name: ANCHOR; }

  .grid {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--pura-space-2);
  }
  .opt {
    width: 1.5rem; height: 1.5rem; padding: 0; cursor: pointer;
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-sm);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
    transition: transform var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .opt:hover { transform: scale(1.08); }
  .opt:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-bg), 0 0 0 4px var(--pura-ring); }
  .opt[aria-selected="true"] { box-shadow: 0 0 0 2px var(--pura-bg), 0 0 0 4px var(--pura-fg); }

  .row { display: flex; }
  .native-wrap {
    display: flex; align-items: center; gap: var(--pura-space-2);
    flex: 1; cursor: pointer;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2);
  }
  .native-wrap:hover { background: var(--pura-subtle); }
  .native {
    width: 1.75rem; height: 1.75rem; padding: 0; border: none; background: none;
    cursor: pointer; flex: none;
  }
  .native::-webkit-color-swatch-wrapper { padding: 0; }
  .native::-webkit-color-swatch { border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm); }
  .native::-moz-color-swatch { border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm); }
  .native-text { font-size: var(--pura-text-sm); color: var(--pura-fg); }

  .hex-field {
    display: flex; align-items: center; gap: var(--pura-space-1);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-2); height: 2rem;
    background: var(--pura-bg);
  }
  .hex-field:focus-within { box-shadow: 0 0 0 3px var(--pura-ring); border-color: var(--pura-border-strong); }
  .hash { color: var(--pura-muted); font-family: var(--pura-font-mono); font-size: var(--pura-text-sm); }
  .hex {
    flex: 1; min-width: 0; border: none; outline: none; background: none;
    font-family: var(--pura-font-mono); font-size: var(--pura-text-sm);
    color: var(--pura-fg); text-transform: lowercase; letter-spacing: 0.03em;
  }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

export function colorPickerTemplate(el = EMPTY_SHIM) {
  const name = el._name || "--pura-color";
  const id = `panel-${name.slice(2)}`;

  const options = PRESETS.map(
    (hex) =>
      `<button type="button" class="opt" part="swatch-option" role="option"
         data-color="${hex}" tabindex="-1" aria-label="${hex}"
         style="background:${hex}"></button>`
  ).join("");

  const html = `<button type="button" class="trigger" part="swatch" popovertarget="${id}" aria-haspopup="dialog" aria-expanded="false">
         <span class="dot" part="dot" aria-hidden="true"></span>
         <span class="val" part="value-text"></span>
       </button>
       <div id="${id}" class="panel" part="panel" popover="auto" role="dialog" aria-label="${t("color-picker.dialog")}">
         <div class="grid" part="grid" role="listbox" aria-label="${t("color-picker.presets")}">${options}</div>
         <div class="row">
           <label class="native-wrap" part="native-field">
             <input type="color" class="native" part="native" aria-label="${t("color-picker.custom-color")}" />
             <span class="native-text">${t("color-picker.custom")}</span>
           </label>
         </div>
         <label class="hex-field" part="hex-field">
           <span class="hash" aria-hidden="true">#</span>
           <input type="text" class="hex" part="hex" inputmode="text" spellcheck="false"
             autocomplete="off" maxlength="7" aria-label="${t("color-picker.hex")}" />
         </label>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", name) };
}

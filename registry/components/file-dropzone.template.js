// Pure render(s) for <file-dropzone> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function fileChipTemplate(el = EMPTY_SHIM) {
  const html = `<span class="chip" part="chip">
         <svg class="doc" viewBox="0 0 24 24" aria-hidden="true" part="chip-icon"><path d="M14 3v5h5M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
         <span class="name" part="chip-name"></span>
         <span class="size" part="chip-size"></span>
         <button class="rm" part="chip-remove" type="button" aria-label="${t("file-dropzone.remove")}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </button>
       </span>`;
  return { html, css: FILE_CHIP_CSS };
}

export function fileDropzoneTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label") || t("file-dropzone.label");
  const multiple = el.hasAttribute("multiple");
  const disabled = el.hasAttribute("disabled");
  const html = `<div class="zone" part="root"
         role="button"
         tabindex="${disabled ? -1 : 0}"
         aria-disabled="${disabled ? "true" : "false"}"
         aria-label="${label}">
         <svg class="icon" part="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0l-4 4m4-4l4 4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
         <span class="label" part="label">${label}</span>
         <span class="hint" part="hint"></span>
         <input class="native" type="file" tabindex="-1" aria-hidden="true"
           ${multiple ? "multiple" : ""}
           ${disabled ? "disabled" : ""}
           ${el.getAttribute("accept") ? `accept="${el.getAttribute("accept")}"` : ""} />
       </div>
       <ul class="list" part="list" role="list" aria-label="${t("file-dropzone.selected")}"></ul>`;
  return { html, css: FILE_DROPZONE_CSS };
}

export const FILE_CHIP_CSS = `
  :host { display: inline-flex; max-width: 100%; }
  .chip {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    max-width: 100%;
    padding: var(--pura-space-1) var(--pura-space-2) var(--pura-space-1) var(--pura-space-3);
    font-size: var(--pura-text-xs); color: var(--pura-fg);
    background: var(--pura-subtle); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-full);
  }
  .doc { width: 0.9rem; height: 0.9rem; flex: none; color: var(--pura-muted); }
  .name { font-weight: 550; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .size { color: var(--pura-muted); flex: none; }
  .rm {
    display: grid; place-items: center; width: 1.1rem; height: 1.1rem; flex: none;
    border: none; background: transparent; color: var(--pura-muted);
    cursor: pointer; border-radius: var(--pura-radius-full);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .rm:hover { background: var(--pura-subtle-hover); color: var(--pura-danger); }
  .rm:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .rm svg { width: 0.7rem; height: 0.7rem; }
`;

export const FILE_DROPZONE_CSS = `
  :host { display: block; }
  :host([disabled]) { opacity: 0.6; }

  .zone {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--pura-space-2); text-align: center;
    padding: var(--pura-space-6) var(--pura-space-5);
    border: 1.5px dashed var(--pura-border-strong); border-radius: var(--pura-radius-lg);
    background: var(--pura-bg); color: var(--pura-fg); cursor: pointer;
    transition: border-color var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .zone:hover { border-color: var(--pura-fg); background: var(--pura-subtle); }
  .zone:focus-visible { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }
  .zone.over {
    border-color: var(--pura-accent); border-style: solid;
    background: color-mix(in srgb, var(--pura-accent) 8%, var(--pura-bg));
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  :host([disabled]) .zone { cursor: not-allowed; }
  :host([disabled]) .zone:hover { border-color: var(--pura-border-strong); background: var(--pura-bg); }

  .icon { width: 1.75rem; height: 1.75rem; color: var(--pura-muted); }
  .zone.over .icon { color: var(--pura-accent); }
  .label { font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg); }
  .hint { font-size: var(--pura-text-xs); color: var(--pura-muted); }
  .native {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }

  .list {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-wrap: wrap; gap: var(--pura-space-2);
  }
  .list:not(:empty) { margin-top: var(--pura-space-3); }
`;

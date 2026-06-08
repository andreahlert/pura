// Pure render for <pura-upload>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function uploadTemplate(el = EMPTY_SHIM) {
  const multiple = el.hasAttribute("multiple");
  const disabled = el.hasAttribute("disabled");
  const label = t("upload.label");
  const html = `<div class="zone" part="dropzone" role="button"
         tabindex="${disabled ? -1 : 0}"
         aria-disabled="${disabled ? "true" : "false"}"
         aria-label="${label}">
         <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0l-4 4m4-4l4 4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
         <span class="label">${label}</span>
         <input class="native" type="file" tabindex="-1" aria-hidden="true"
           ${multiple ? "multiple" : ""}
           ${disabled ? "disabled" : ""}
           ${el.getAttribute("accept") ? `accept="${el.getAttribute("accept")}"` : ""} />
       </div>
       <ul class="list" part="list" role="list" aria-label="${t("upload.selected")}"></ul>`;
  return { html, css: UPLOAD_CSS };
}

export const UPLOAD_CSS = `
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
  .native {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }

  .list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--pura-space-3); }
  .list:not(:empty) { margin-top: var(--pura-space-4); }

  .item {
    padding: var(--pura-space-3);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    background: var(--pura-bg);
  }
  .head { display: flex; align-items: center; gap: var(--pura-space-2); }
  .doc { width: 1rem; height: 1rem; flex: none; color: var(--pura-muted); }
  .name {
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1 1 auto; min-width: 0;
  }
  .size { font-size: var(--pura-text-xs); color: var(--pura-muted); flex: none; }
  .status {
    font-size: var(--pura-text-xs); font-weight: 550; flex: none;
    color: var(--pura-muted);
  }
  .item[data-status="uploading"] .status { color: var(--pura-accent); }
  .item[data-status="done"] .status { color: var(--pura-success-fg); }
  .item[data-status="error"] .status { color: var(--pura-danger); }
  .rm {
    display: grid; place-items: center; width: 1.4rem; height: 1.4rem; flex: none;
    border: none; background: transparent; color: var(--pura-muted);
    cursor: pointer; border-radius: var(--pura-radius-full); padding: 0;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .rm:hover { background: var(--pura-subtle-hover); color: var(--pura-danger); }
  .rm:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .rm svg { width: 0.85rem; height: 0.85rem; }

  .track {
    width: 100%; height: 0.4rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); overflow: hidden; margin-top: var(--pura-space-2);
  }
  .fill {
    height: 100%; width: 0%; border-radius: inherit;
    background: var(--pura-primary);
    transition: width var(--pura-dur) var(--pura-ease);
  }
  .item[data-status="done"] .fill { background: var(--pura-success); }
  .item[data-status="error"] .fill { background: var(--pura-danger); }
`;

// Pure render for <pura-floating-window>. No DOM; SSR/DSD + client safe.
// The title comes from the [title] attribute; geometry and open/closed state are
// applied at runtime by _applyGeometry()/_reflectOpen(). Under EMPTY_SHIM the
// title is "" and control labels resolve to the default-locale i18n strings.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const CSS = `
  :host { --win-z: 1000; }

  .backdrop {
    position: fixed; inset: 0; z-index: calc(var(--win-z) - 1);
    background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px);
  }
  .backdrop[hidden] { display: none; }

  .win {
    position: fixed; z-index: var(--win-z);
    display: flex; flex-direction: column;
    min-width: 160px; min-height: 80px;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg); overflow: hidden;
  }
  .win.maximized { border-radius: 0; }
  .win.minimized { height: auto !important; }
  .win.minimized .body, .win.minimized .resize { display: none; }

  .bar {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); flex: none;
    padding: var(--pura-space-2) var(--pura-space-3);
    background: var(--pura-subtle); border-bottom: 1px solid var(--pura-border);
    cursor: grab; user-select: none; touch-action: none;
  }
  .bar:active { cursor: grabbing; }
  .title {
    font-size: var(--pura-text-sm); font-weight: 600;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  .controls { display: flex; align-items: center; gap: var(--pura-space-1); flex: none; }
  .ctl {
    display: grid; place-items: center; width: 1.6rem; height: 1.6rem;
    border: none; background: transparent; color: var(--pura-muted);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .ctl:hover { background: var(--pura-subtle-hover); color: var(--pura-fg); }
  .ctl.close:hover { background: var(--pura-danger-bg); color: var(--pura-danger); }
  .ctl svg { width: 1rem; height: 1rem; }

  .body {
    flex: 1 1 auto; min-height: 0; overflow: auto;
    padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-fg);
  }

  .resize {
    position: absolute; right: 0; bottom: 0;
    width: 1.1rem; height: 1.1rem;
    color: var(--pura-muted); cursor: nwse-resize; touch-action: none;
    display: grid; place-items: end;
  }
  .resize svg { width: 1rem; height: 1rem; }
`;

export function floatingWindowTemplate(el = EMPTY_SHIM) {
  // _titleText(): the [title] attribute or "".
  const titleText = el.getAttribute("title") || "";
  const html = `<div class="backdrop" part="backdrop" hidden></div>
       <div class="win" part="window" role="dialog" aria-modal="false">
         <div class="bar" part="titlebar">
           <span class="title" part="title">${titleText}</span>
           <div class="controls" part="controls">
             <button class="ctl min" part="control" data-act="min" aria-label="${t("window.minimize")}">
               <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
             </button>
             <button class="ctl max" part="control" data-act="max" aria-label="${t("window.maximize")}">
               <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>
             </button>
             <button class="ctl close" part="control" data-act="close" aria-label="${t("window.close")}">
               <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
             </button>
           </div>
         </div>
         <div class="body" part="body"><slot></slot></div>
         <div class="resize" part="resize" aria-hidden="true">
           <svg viewBox="0 0 24 24"><path d="M22 10L10 22M22 16L16 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </div>
       </div>`;
  return { html, css: CSS };
}

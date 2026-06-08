// Pure render(s) for <avatar-group> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const CSS = `
  :host { display: inline-flex; vertical-align: middle; --ring-w: 2px; }
  :host([size="sm"]) { --ring-w: 2px; }
  :host([size="lg"]) { --ring-w: 3px; }

  [part="group"] {
    display: inline-flex; align-items: center; isolation: isolate;
    padding: var(--ring-w);
  }

  /* overlap: pull every avatar/bubble after the first leftward by ~35% */
  ::slotted(pura-avatar) {
    margin-left: -0.875rem;
    border-radius: var(--pura-radius-full);
    box-shadow: 0 0 0 var(--ring-w) var(--pura-bg);
    transition: transform var(--pura-dur) var(--pura-ease), margin var(--pura-dur) var(--pura-ease);
  }
  ::slotted(pura-avatar:first-child) { margin-left: 0; }
  ::slotted(pura-avatar:hover) { transform: translateY(-2px); z-index: 1; }
  ::slotted(pura-avatar[hidden]) { display: none; }

  /* tighter / looser overlap by size */
  :host([size="sm"]) ::slotted(pura-avatar) { margin-left: -0.625rem; }
  :host([size="sm"]) ::slotted(pura-avatar:first-child) { margin-left: 0; }
  :host([size="lg"]) ::slotted(pura-avatar) { margin-left: -1.25rem; }
  :host([size="lg"]) ::slotted(pura-avatar:first-child) { margin-left: 0; }

  /* the +N overflow bubble (acts as popover trigger) */
  .more {
    anchor-name: ANCHOR;
    position: relative;
    display: inline-grid; place-items: center;
    width: 2.5rem; height: 2.5rem; margin-left: -0.875rem;
    border: none; cursor: pointer; font: inherit;
    border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm); font-weight: 600; user-select: none;
    box-shadow: inset 0 0 0 1px var(--pura-border), 0 0 0 var(--ring-w) var(--pura-bg);
    transition: background var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .more[hidden] { display: none; }
  .more:hover { background: var(--pura-subtle-hover); }
  .more:focus-visible { outline: none; box-shadow: inset 0 0 0 1px var(--pura-border), 0 0 0 3px var(--pura-ring); }
  .more[data-size="sm"] { width: 1.75rem; height: 1.75rem; font-size: var(--pura-text-xs); margin-left: -0.625rem; }
  .more[data-size="lg"] { width: 3.5rem; height: 3.5rem; font-size: var(--pura-text-lg); margin-left: -1.25rem; }

  /* overflow popover (native Popover API + CSS anchor positioning) */
  [part="overflow"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(center); translate: -50% 0;
    margin-top: var(--pura-space-2);
    width: max-content; max-width: min(18rem, 92vw); max-height: 60vh; overflow: auto;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-2);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="overflow"]:popover-open { opacity: 1; transform: none; }
  .ovf-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.125rem; }
  .ovf-item {
    padding: var(--pura-space-2) var(--pura-space-3); border-radius: var(--pura-radius-sm);
    color: var(--pura-fg); white-space: nowrap;
  }
  .ovf-item:hover { background: var(--pura-subtle); }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    [part="group"] { position: relative; }
    [part="overflow"] { position: absolute; top: 100%; left: 0; translate: none; inset: auto; }
  }
`;

export function avatarGroupTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label") || t("avatar-group.label");
  const html = `<div part="group" role="group" aria-label="${esc(label)}" data-pura="avatar-group">
         <slot></slot>
         <button part="more" id="more" class="more" type="button"
                 hidden aria-expanded="false" aria-controls="overflow">
           <span class="more-count" part="more-count" aria-hidden="true"></span>
         </button>
         <div part="overflow" id="overflow" popover="auto" aria-label="${esc(t("avatar-group.hidden"))}">
           <ul part="overflow-list" class="ovf-list" role="list"></ul>
         </div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._anchor) };
}

// Pure render(s) for <presence> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const CSS = `
  :host { display: inline-flex; vertical-align: middle; --ring-w: 2px; }
  :host([size="sm"]) { --ring-w: 2px; }
  :host([size="lg"]) { --ring-w: 3px; }

  [part="presence"] {
    display: inline-flex; align-items: center; gap: var(--pura-space-3);
    isolation: isolate;
  }
  .stack { display: inline-flex; align-items: center; padding: var(--ring-w); }

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

  /* the +N overflow bubble (acts as roster popover trigger) */
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

  /* online count region — readable without motion (static dot color + text) */
  .count {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-muted-fg);
    white-space: nowrap;
  }
  .pulse {
    position: relative; flex: none;
    width: 0.5rem; height: 0.5rem; border-radius: 50%;
    background: var(--pura-muted);
  }
  /* live state: solid status color + a soft expanding ring (decorative). */
  [part="presence"][data-live] .pulse { background: var(--pura-success); }
  [part="presence"][data-live] .pulse::after {
    content: ""; position: absolute; inset: 0; border-radius: 50%;
    background: var(--pura-success);
    animation: pura-presence-pulse 1.8s var(--pura-ease) infinite;
  }
  .count-text { color: var(--pura-fg); }
  @keyframes pura-presence-pulse {
    0% { transform: scale(1); opacity: 0.6; }
    70% { transform: scale(2.6); opacity: 0; }
    100% { transform: scale(2.6); opacity: 0; }
  }

  /* roster popover (native Popover API + CSS anchor positioning) */
  [part="roster"] {
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
  [part="roster"]:popover-open { opacity: 1; transform: none; }
  .roster-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.125rem; }
  .roster-item {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-3); border-radius: var(--pura-radius-sm);
    color: var(--pura-fg); white-space: nowrap;
  }
  .roster-item:hover { background: var(--pura-subtle); }
  .roster-dot { flex: none; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--pura-muted); }
  .roster-dot[data-status="online"] { background: var(--pura-success); }
  .roster-dot[data-status="busy"] { background: var(--pura-danger); }
  .roster-dot[data-status="offline"] { background: var(--pura-muted); }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    [part="presence"] { position: relative; }
    [part="roster"] { position: absolute; top: 100%; left: 0; translate: none; inset: auto; }
  }
`;

export function presenceTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label") || t("presence.label");
  const html = `<div part="presence" role="group" aria-label="${esc(label)}" data-pura="presence">
         <div part="stack" class="stack">
           <slot></slot>
           <button part="more" id="more" class="more" type="button"
                   hidden aria-expanded="false" aria-controls="roster">
             <span class="more-count" part="more-count" aria-hidden="true"></span>
           </button>
         </div>
         <span part="count" class="count" role="status" aria-live="polite">
           <span class="pulse" part="pulse" aria-hidden="true"></span>
           <span class="count-text" part="count-text"></span>
         </span>
         <div part="roster" id="roster" popover="auto" aria-label="${esc(t("presence.members"))}">
           <ul part="roster-list" class="roster-list" role="list"></ul>
         </div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._anchor) };
}

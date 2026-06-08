// Pure render(s) for <explain> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host {
    display: inline; position: relative;
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-decoration-color: var(--pura-border-strong);
    text-underline-offset: 0.18em;
  }

  .content { color: inherit; }

  .trigger {
    anchor-name: ANCHOR;
    display: inline-grid; place-items: center; vertical-align: baseline;
    width: 1.05em; height: 1.05em; margin-inline-start: 0.15em;
    padding: 0; flex: none; cursor: help;
    color: var(--pura-muted); background: transparent;
    border: none; border-radius: var(--pura-radius-full);
    transition: color var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  .trigger[hidden] { display: none; }
  .trigger:hover { color: var(--pura-fg); background: var(--pura-subtle); }
  .trigger:focus-visible {
    outline: none; box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .trigger:disabled { display: none; }
  .ico { width: 100%; height: 100%; }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(20rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-3) var(--pura-space-4);
    font-size: var(--pura-text-sm); line-height: 1.55;
    text-decoration: none;
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  [part="panel-text"]:empty { display: none; }
  .explanation-slot { display: contents; }

  :host([placement="top"]) .panel { top: auto; bottom: anchor(top); margin: 0 0 var(--pura-space-2); transform: translateY(4px); }
  :host([placement="right"]) .panel { top: anchor(top); left: anchor(right); margin: 0 0 0 var(--pura-space-2); transform: translateX(-4px); }
  :host([placement="left"]) .panel { top: anchor(top); left: auto; right: anchor(left); margin: 0 var(--pura-space-2) 0 0; transform: translateX(4px); }
  :host([placement="top"]) .panel:popover-open,
  :host([placement="left"]) .panel:popover-open,
  :host([placement="right"]) .panel:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

export function explainTemplate(el = EMPTY_SHIM) {
  const html = `<span class="content" part="content"><slot></slot></span><button
         class="trigger" part="trigger" type="button"
         aria-expanded="false">
         <svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
           <circle cx="12" cy="12" r="9"></circle>
           <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7v.3"></path>
           <path d="M12 17h.01"></path>
         </svg>
       </button><div class="panel" part="panel" popover="auto" role="note">
         <span part="panel-text"></span>
         <span class="explanation-slot"><slot name="explanation"></slot></span>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._anchor) };
}

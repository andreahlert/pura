// Pure render for <pura-mention>. No DOM; SSR/DSD + client safe.
// An <input> or <textarea> (chosen by [multiline]) inside an anchor, plus an
// empty popover menu that the component fills at runtime as the user types a
// trigger token. All control attributes derive from the host
// (multiline/placeholder/value/rows). The anchor name comes from el._name on the
// client; under EMPTY_SHIM it falls back to a literal so the CSS anchor stays
// valid.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; }
  .anchor { anchor-name: ANCHOR; position: relative; display: block; }

  .control {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  input.control { padding: 0 var(--pura-space-3); height: 2.25rem; }
  textarea.control {
    padding: var(--pura-space-3); min-height: 4.5rem; line-height: 1.55;
    resize: vertical;
  }
  .control::placeholder { color: var(--pura-muted); }
  .control:hover { border-color: var(--pura-fg); }
  .control:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .menu {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: anchor-size(width); width: max-content; max-width: min(24rem, 92vw);
    max-height: 16rem; overflow-y: auto;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .menu:popover-open { opacity: 1; transform: none; }

  .option {
    padding: var(--pura-space-2) var(--pura-space-2);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    color: var(--pura-fg); user-select: none;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .option.active { background: var(--pura-subtle); }

  @supports not (anchor-name: --x) {
    .menu { position: absolute; top: 100%; left: 0; inset: auto; margin-top: var(--pura-space-2); }
  }
`;

export function mentionTemplate(el = EMPTY_SHIM) {
  const name = el._name || "--pura-mention";
  const multiline = el.hasAttribute("multiline");
  const ph = esc(el.getAttribute("placeholder") || "");
  const val = esc(el.getAttribute("value") || "");
  const control = multiline
    ? `<textarea part="input" class="control" rows="${el.getAttribute("rows") || 4}" placeholder="${ph}">${val}</textarea>`
    : `<input part="input" class="control" type="text" autocomplete="off" placeholder="${ph}" value="${val}" />`;

  const html = `<div class="anchor" part="anchor">
         ${control}
       </div>
       <div part="menu" class="menu" role="listbox" popover="manual" tabindex="-1"></div>`;
  return { html, css: CSS.replaceAll("ANCHOR", name) };
}

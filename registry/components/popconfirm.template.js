// Pure render for <pura-popconfirm>. No DOM; SSR/DSD + client safe.
// title/confirm/cancel labels derive from attributes with i18n defaults (`t` is
// module-global); under EMPTY_SHIM the popup shows the default-locale strings and
// no danger styling. The anchor-name token comes from el._name (set per instance);
// server-side it degrades like popover.template.js.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function escText(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: inline-block; }
  .anchor { anchor-name: ANCHOR; display: inline-flex; }

  .popup {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(20rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-4);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .popup:popover-open { opacity: 1; transform: none; }

  :host([placement="top"]) .popup { top: auto; bottom: anchor(top); margin: 0 0 var(--pura-space-2); transform: translateY(4px); }
  :host([placement="right"]) .popup { top: anchor(top); left: anchor(right); margin: 0 0 0 var(--pura-space-2); transform: translateX(-4px); }
  :host([placement="left"]) .popup { top: anchor(top); left: auto; right: anchor(left); margin: 0 var(--pura-space-2) 0 0; transform: translateX(4px); }
  :host([placement="top"]) .popup:popover-open,
  :host([placement="left"]) .popup:popover-open,
  :host([placement="right"]) .popup:popover-open { transform: none; }

  .head { display: flex; gap: var(--pura-space-2); align-items: flex-start; }
  .ico { width: 1.05rem; height: 1.05rem; flex: none; margin-top: 1px; color: var(--pura-warning); }
  .msg { margin: 0; font-weight: 550; line-height: 1.45; color: var(--pura-fg); }

  .btns {
    display: flex; gap: var(--pura-space-2); justify-content: flex-end;
    margin-top: var(--pura-space-4);
  }
  .btn {
    font: inherit; font-size: var(--pura-text-xs); font-weight: 550; line-height: 1;
    cursor: pointer; white-space: nowrap;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-3); height: 1.875rem;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease), filter var(--pura-dur) var(--pura-ease);
  }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  .cancel {
    background: var(--pura-bg); color: var(--pura-fg);
    border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow-sm);
  }
  .cancel:hover { background: var(--pura-subtle); }

  .confirm { background: var(--pura-primary); color: var(--pura-primary-fg); }
  .confirm:hover { background: var(--pura-primary-hover); }
  .confirm.danger { background: var(--pura-danger-solid); color: #fff; }
  .confirm.danger:hover { filter: brightness(0.94); }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .popup { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

export function popconfirmTemplate(el = EMPTY_SHIM) {
  const danger = el.hasAttribute("danger");
  // _title() / _confirmText() / _cancelText(), inlined verbatim with this -> el.
  const title = el.getAttribute("title") || el.getAttribute("message") || t("popconfirm.title");
  const confirmText = el.getAttribute("confirm-text") || t("popconfirm.confirm");
  const cancelText = el.getAttribute("cancel-text") || t("popconfirm.cancel");

  const html = `<span class="anchor" part="trigger"><slot></slot></span>
       <div part="popup" class="popup" popover="auto" role="dialog">
         <div class="head">
           <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>
             <path d="M12 9v4M12 17h.01"/>
           </svg>
           <p class="msg">${escText(title)}</p>
         </div>
         <div class="btns">
           <button part="cancel" class="btn cancel" type="button">${escText(cancelText)}</button>
           <button part="confirm" class="btn confirm${danger ? " danger" : ""}" type="button">${escText(confirmText)}</button>
         </div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}

// <pura-popconfirm> - confirmation popover on a trigger. Wraps a slotted trigger
// (default slot) and shows a small popover with a message plus Confirm/Cancel
// buttons when the trigger is clicked. Built on the native Popover API (top layer,
// light dismiss + ESC for free) and CSS anchor positioning, mirroring popover.js.
// Attributes:
//   title / message  - the question shown (alias; default i18n "Are you sure?")
//   confirm-text     - confirm button label (default i18n "Confirm")
//   cancel-text      - cancel button label (default i18n "Cancel")
//   danger           - boolean; renders a danger-styled confirm button
//   placement        - bottom (default) | top | left | right
// Events:
//   confirm - CustomEvent (bubbles), fired on confirm
//   cancel  - CustomEvent (bubbles), fired on cancel / dismiss
// Parts: trigger, popup, confirm, cancel
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "popconfirm.title": {
    en: "Are you sure?",
    "pt-BR": "Tem certeza?",
    fr: "Êtes-vous sûr ?",
    de: "Sind Sie sicher?",
    it: "Sei sicuro?",
  },
  "popconfirm.confirm": {
    en: "Confirm",
    "pt-BR": "Confirmar",
    fr: "Confirmer",
    de: "Bestätigen",
    it: "Conferma",
  },
  "popconfirm.cancel": {
    en: "Cancel",
    "pt-BR": "Cancelar",
    fr: "Annuler",
    de: "Abbrechen",
    it: "Annulla",
  },
});

let uid = 0;

class PuraPopconfirm extends PuraElement {
  static observedAttributes = ["title", "message", "confirm-text", "cancel-text", "danger", "placement"];

  connectedCallback() {
    this._name = `--pura-popconfirm-${uid++}`;
    this._render();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._render();
  }

  _title() {
    return this.getAttribute("title") || this.getAttribute("message") || t("popconfirm.title");
  }

  _confirmText() {
    return this.getAttribute("confirm-text") || t("popconfirm.confirm");
  }

  _cancelText() {
    return this.getAttribute("cancel-text") || t("popconfirm.cancel");
  }

  _render() {
    const danger = this.hasAttribute("danger");
    this.render(
      `<span class="anchor" part="trigger"><slot></slot></span>
       <div part="popup" class="popup" popover="auto" role="dialog">
         <div class="head">
           <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>
             <path d="M12 9v4M12 17h.01"/>
           </svg>
           <p class="msg">${escText(this._title())}</p>
         </div>
         <div class="btns">
           <button part="cancel" class="btn cancel" type="button">${escText(this._cancelText())}</button>
           <button part="confirm" class="btn confirm${danger ? " danger" : ""}" type="button">${escText(this._confirmText())}</button>
         </div>
       </div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._trigger = this.$(".anchor");
    this._pop = this.$("[popover]");
    this._confirmBtn = this.$('[part="confirm"]');
    this._cancelBtn = this.$('[part="cancel"]');

    this._trigger.addEventListener("click", () => this._pop.showPopover());

    this._confirmBtn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("confirm", { bubbles: true }));
      this._pop.hidePopover();
    });
    this._cancelBtn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("cancel", { bubbles: true }));
      this._pop.hidePopover();
    });

    // Outside click / Escape dismiss (light dismiss) counts as cancel.
    this._pop.addEventListener("toggle", (e) => {
      if (e.newState === "closed" && !this._closingViaButton) {
        this.dispatchEvent(new CustomEvent("cancel", { bubbles: true }));
      }
      this._closingViaButton = false;
      this.toggleAttribute("open", e.newState === "open");
    });
    // Track button-driven closes so we do not double-fire cancel on confirm.
    for (const b of [this._confirmBtn, this._cancelBtn]) {
      b.addEventListener("click", () => { this._closingViaButton = true; });
    }
  }

  _applyI18n() {
    const msg = this.$(".msg");
    if (msg) msg.textContent = this._title();
    if (this._confirmBtn) this._confirmBtn.textContent = this._confirmText();
    if (this._cancelBtn) this._cancelBtn.textContent = this._cancelText();
  }

  show() { this._pop?.showPopover(); }
  hide() { this._pop?.hidePopover(); }
}

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

define("pura-popconfirm", PuraPopconfirm);
export { PuraPopconfirm };

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
import meta from "./popconfirm.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { popconfirmTemplate } from "./popconfirm.template.js";

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
    const { html, css } = popconfirmTemplate(this);
    this.render(html, css);

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

define("pura-popconfirm", PuraPopconfirm, meta);
export { PuraPopconfirm };

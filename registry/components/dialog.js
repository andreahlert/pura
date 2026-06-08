// <pura-dialog> — modal built on the native <dialog> element (focus trap +
// backdrop + ESC for free). Named slots: header, footer. Default slot = body.
// API: .open() / .close(), or attribute `open`. Attribute: title.
import { PuraElement, define } from "../base.js";
import meta from "./dialog.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { dialogTemplate } from "./dialog.template.js";

registerMessages({
  "dialog.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
});

class PuraDialog extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    const { html, css } = dialogTemplate(this);
    this.render(html, css);
    this._dlg = this.$("dialog");
    this.$(".x").addEventListener("click", () => this.close());
    this._dlg.addEventListener("click", (e) => { if (e.target === this._dlg) this.close(); });
    this._dlg.addEventListener("close", () => {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    });
    const footSlot = this.$('slot[name="footer"]');
    const foot = this.$('footer');
    const upd = () => (foot.style.display = footSlot.assignedNodes().length ? "" : "none");
    footSlot.addEventListener("slotchange", upd); upd();
    if (this.hasAttribute("open")) this.open();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    this.$(".x")?.setAttribute("aria-label", t("dialog.close"));
  }

  attributeChangedCallback(_n, o, v) {
    if (!this._dlg) return;
    if (v !== null && !this._dlg.open) this._dlg.showModal();
    if (v === null && this._dlg.open) this._dlg.close();
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
}


define("pura-dialog", PuraDialog, meta);
export { PuraDialog };

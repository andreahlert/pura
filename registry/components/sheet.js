// <pura-sheet> — slide-in panel on top of a modal backdrop. Built on the native
// <dialog> element (focus trap + ESC + backdrop for free). Slots: header,
// footer, default = body. Attributes: side (right default | left | top | bottom),
// title, open. API: .open() / .close().
import { PuraElement, define } from "../base.js";
import meta from "./sheet.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { sheetTemplate } from "./sheet.template.js";

registerMessages({
  "sheet.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
});

class PuraSheet extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    const { html, css } = sheetTemplate(this);
    this.render(html, css);
    this._dlg = this.$("dialog");
    this.$(".x").addEventListener("click", () => this.close());
    this._dlg.addEventListener("click", (e) => { if (e.target === this._dlg) this.close(); });
    this._dlg.addEventListener("close", () => {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    });
    const footSlot = this.$('slot[name="footer"]');
    const foot = this.$("footer");
    const upd = () => (foot.style.display = footSlot.assignedNodes().length ? "" : "none");
    footSlot.addEventListener("slotchange", upd); upd();
    if (this.hasAttribute("open")) this.open();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    this.$(".x")?.setAttribute("aria-label", t("sheet.close"));
  }

  attributeChangedCallback(_n, _o, v) {
    if (!this._dlg) return;
    if (v !== null && !this._dlg.open) this._dlg.showModal();
    if (v === null && this._dlg.open) this._dlg.close();
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
}


define("pura-sheet", PuraSheet, meta);
export { PuraSheet };

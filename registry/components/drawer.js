// <pura-drawer> — bottom drawer / sheet (vaul-like). Built on the native
// <dialog> element (focus trap + ESC + backdrop for free): pinned to the bottom
// edge, full width, sliding up with a centered grab-handle bar on top. Slots:
// header, footer, default = body. Attribute: title, open. API: .open() / .close().
import { PuraElement, define } from "../base.js";
import meta from "./drawer.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { drawerTemplate } from "./drawer.template.js";

registerMessages({
  "drawer.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
});

class PuraDrawer extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    const { html, css } = drawerTemplate(this);
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
    this.$(".x")?.setAttribute("aria-label", t("drawer.close"));
  }

  attributeChangedCallback(_n, _o, v) {
    if (!this._dlg) return;
    if (v !== null && !this._dlg.open) this._dlg.showModal();
    if (v === null && this._dlg.open) this._dlg.close();
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
}


define("pura-drawer", PuraDrawer, meta);
export { PuraDrawer };

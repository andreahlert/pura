// <pura-overlay> a standalone dimming scrim / loading overlay layer, separate
// from dialog.
// Attributes:
//   open         boolean visibility
//   target       "page" (default, fixed full-screen) or "parent" (absolute, covers
//                the nearest positioned ancestor of the host)
//   blur         apply a backdrop-filter blur to the scrim
//   spinner      center a spinner (and optional message)
//   message      text shown under the spinner
//   dismissable  clicking the scrim closes and dispatches "close"
// Slot: default = custom centered content. Parts: scrim, content.
// Methods: open(), close(). Event: close.
import { PuraElement, define } from "../base.js";
import meta from "./overlay.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { overlayTemplate } from "./overlay.template.js";

registerMessages({
  "overlay.loading": {
    en: "Loading",
    "pt-BR": "Carregando",
    fr: "Chargement",
    de: "Wird geladen",
    it: "Caricamento",
  },
});

class PuraOverlay extends PuraElement {
  static observedAttributes = ["open", "target", "blur", "spinner", "message", "dismissable"];

  connectedCallback() {
    this._renderAll();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, _value) {
    if (!this.isConnected) return;
    if (name === "open") {
      this._syncOpen();
      return;
    }
    if (name === "message") {
      const msg = this.$(".msg");
      if (msg) msg.textContent = this.getAttribute("message") || "";
      return;
    }
    this._renderAll();
  }

  _applyI18n() {
    const sp = this.$(".scrim");
    if (sp) sp.setAttribute("aria-label", t("overlay.loading"));
  }

  _renderAll() {
    const showSpinner = this.bool("spinner");
    const message = this.getAttribute("message") || "";
    const { html, css } = overlayTemplate(this);
    this.render(html, css);
    this._scrim = this.$(".scrim");
    this._scrim.addEventListener("click", (e) => {
      // Only the scrim itself (not its content) dismisses.
      if (e.target === this._scrim && this.bool("dismissable")) this.close();
    });
    this._syncOpen();
  }

  _syncOpen() {
    const open = this.hasAttribute("open");
    this.dataset.open = open ? "true" : "false";
    if (this._scrim) this._scrim.setAttribute("aria-hidden", open ? "false" : "true");
  }

  open() {
    if (!this.hasAttribute("open")) this.setAttribute("open", "");
    this._syncOpen();
  }

  close() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    this._syncOpen();
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }
}

define("pura-overlay", PuraOverlay, meta);
export { PuraOverlay };

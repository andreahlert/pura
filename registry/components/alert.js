// <pura-alert> — callout. variant: info (default) | success | warning | danger.
// Attributes: title, dismissible.
import { PuraElement, define } from "../base.js";
import meta from "./alert.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { alertTemplate } from "./alert.template.js";

registerMessages({
  "alert.dismiss": {
    en: "Dismiss",
    "pt-BR": "Dispensar",
    fr: "Fermer",
    de: "Schließen",
    it: "Chiudi",
  },
});


class PuraAlert extends PuraElement {
  connectedCallback() {
    const { html, css } = alertTemplate(this);
    this.render(html, css);
    this.$(".x")?.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("dismiss", { bubbles: true }));
      this.remove();
    });
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    this.$(".x")?.setAttribute("aria-label", t("alert.dismiss"));
  }
}


define("pura-alert", PuraAlert, meta);
export { PuraAlert };

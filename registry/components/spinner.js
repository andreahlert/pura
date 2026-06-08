// <pura-spinner> — loading indicator. size: sm | md (default) | lg.
import { PuraElement, define } from "../base.js";
import meta from "./spinner.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { spinnerTemplate } from "./spinner.template.js";

registerMessages({
  "spinner.loading": {
    en: "Loading",
    "pt-BR": "Carregando",
    fr: "Chargement",
    de: "Wird geladen",
    it: "Caricamento",
  },
});

class PuraSpinner extends PuraElement {
  connectedCallback() {
    const { html, css } = spinnerTemplate(this);
    this.render(html, css);
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    // Only update the default aria-label; a consumer-provided label wins.
    if (this.getAttribute("label")) return;
    const el = this.shadowRoot?.querySelector('[part="spinner"]');
    if (el) el.setAttribute("aria-label", t("spinner.loading"));
  }
}


define("pura-spinner", PuraSpinner, meta);
export { PuraSpinner };

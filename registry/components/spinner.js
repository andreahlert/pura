// <pura-spinner> — loading indicator. size: sm | md (default) | lg.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

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
    this.render(
      `<span part="spinner" role="status" aria-label="${this.getAttribute("label") || t("spinner.loading")}"></span>`,
      CSS
    );
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

const CSS = `
  :host { display: inline-block; line-height: 0; }
  [part="spinner"] {
    display: inline-block; width: 1.25rem; height: 1.25rem;
    border: 2.5px solid color-mix(in srgb, var(--pura-fg) 18%, transparent);
    border-top-color: var(--pura-fg); border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  :host([size="sm"]) [part="spinner"] { width: 0.9rem; height: 0.9rem; border-width: 2px; }
  :host([size="lg"]) [part="spinner"] { width: 2rem; height: 2rem; border-width: 3px; }
  @keyframes pura-spin { to { transform: rotate(360deg); } }
`;

define("pura-spinner", PuraSpinner);
export { PuraSpinner };

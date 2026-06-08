// <pura-result> - status result page block. Large status icon, title, subtitle,
// then actions. status: info (default) | success | error | warning | 404 | 403 | 500.
// Attributes:
//   status      - one of the above (default "info")
//   title       - heading (falls back to an i18n default for http codes)
//   subtitle    - secondary line (alias: description)
//   description - alias of subtitle
// Slots:
//   (default)        - extra content / body
//   name="actions"   - buttons row
// Parts: icon, title, subtitle, actions
import { PuraElement, define } from "../base.js";
import meta from "./result.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { resultTemplate } from "./result.template.js";

registerMessages({
  "result.404.title": {
    en: "Page not found",
    "pt-BR": "Página não encontrada",
    fr: "Page introuvable",
    de: "Seite nicht gefunden",
    it: "Pagina non trovata",
  },
  "result.403.title": {
    en: "Access denied",
    "pt-BR": "Acesso negado",
    fr: "Accès refusé",
    de: "Zugriff verweigert",
    it: "Accesso negato",
  },
  "result.500.title": {
    en: "Server error",
    "pt-BR": "Erro no servidor",
    fr: "Erreur du serveur",
    de: "Serverfehler",
    it: "Errore del server",
  },
});

// status -> color token name + inline svg body (viewBox 0 0 24 24, currentColor).
const CHECK = '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>';
const CROSS = '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>';
const WARN = '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>';
const INFO = '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>';
const LOCK = '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>';
const PLUG = '<path d="M12 3v6M9 9h6M8 9v3a4 4 0 0 0 8 0V9M12 16v5"/>';

const STATUS = {
  success: { token: "--pura-success", svg: CHECK },
  error:   { token: "--pura-danger",  svg: CROSS },
  warning: { token: "--pura-warning", svg: WARN },
  info:    { token: "--pura-info",    svg: INFO },
  "404":   { token: "--pura-info",    svg: INFO, key: "result.404.title" },
  "403":   { token: "--pura-warning", svg: LOCK, key: "result.403.title" },
  "500":   { token: "--pura-danger",  svg: PLUG, key: "result.500.title" },
};

class PuraResult extends PuraElement {
  static observedAttributes = ["status", "title", "subtitle", "description"];

  connectedCallback() {
    this._render();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._render();
  }

  get status() {
    const s = this.getAttribute("status") || "info";
    return STATUS[s] ? s : "info";
  }

  _title() {
    const attr = this.getAttribute("title");
    if (attr != null && attr !== "") return attr;
    const key = STATUS[this.status]?.key;
    return key ? t(key) : "";
  }

  _subtitle() {
    return this.getAttribute("subtitle") || this.getAttribute("description") || "";
  }

  _render() {
    const { html, css } = resultTemplate(this);
    this.render(html, css);

    // hide empty body / actions regions
    for (const sel of [".body", ".actions"]) {
      const host = this.$(sel);
      const slot = host.querySelector("slot");
      const upd = () => {
        host.style.display = slot.assignedNodes({ flatten: true }).length ? "" : "none";
      };
      slot.addEventListener("slotchange", upd);
      upd();
    }
  }

  _applyI18n() {
    // Only http-code defaults are translatable; re-render the title node if used.
    if (this.getAttribute("title")) return;
    const el = this.$('[part="title"]');
    const title = this._title();
    if (el && title) el.textContent = title;
  }
}

define("pura-result", PuraResult, meta);
export { PuraResult };

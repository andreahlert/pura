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
    const cfg = STATUS[this.status];
    const title = this._title();
    const subtitle = this._subtitle();
    this.render(
      `<div part="result" role="status">
         <div part="icon" class="icon" aria-hidden="true">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round" focusable="false">${cfg.svg}</svg>
         </div>
         ${title ? `<h2 part="title" class="title">${escText(title)}</h2>` : ""}
         ${subtitle ? `<p part="subtitle" class="subtitle">${escText(subtitle)}</p>` : ""}
         <div class="body"><slot></slot></div>
         <div part="actions" class="actions"><slot name="actions"></slot></div>
       </div>`,
      CSS.replaceAll("STATUS_COLOR", `var(${cfg.token})`)
    );

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

function escText(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; }
  [part="result"] {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: var(--pura-space-2);
    padding: var(--pura-space-6) var(--pura-space-5);
    color: var(--pura-fg);
  }
  .icon {
    display: grid; place-items: center;
    width: 4rem; height: 4rem; margin-bottom: var(--pura-space-2);
    border-radius: var(--pura-radius-full);
    color: STATUS_COLOR;
    background: color-mix(in srgb, STATUS_COLOR 12%, transparent);
  }
  .icon svg { width: 2.25rem; height: 2.25rem; display: block; }
  .title {
    margin: 0; font-size: var(--pura-text-xl); font-weight: 600; line-height: 1.25;
    color: var(--pura-fg);
  }
  .subtitle {
    margin: 0; font-size: var(--pura-text-base); line-height: 1.55;
    color: var(--pura-muted-fg); max-width: 32rem;
  }
  .body {
    margin-top: var(--pura-space-2); font-size: var(--pura-text-sm);
    color: var(--pura-muted-fg); max-width: 32rem;
  }
  .actions {
    display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
    gap: var(--pura-space-2); margin-top: var(--pura-space-3);
  }
`;

define("pura-result", PuraResult, meta);
export { PuraResult };

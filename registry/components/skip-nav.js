// <pura-skip-nav> a "Skip to content" link, visually hidden until focused, that
// jumps to a target.
// Attributes:
//   href   target anchor, default "#main"
//   label  link text, default "Skip to content" (i18n)
// Renders an <a> with the sr-only-until-focus pattern, pinned top-left and styled
// with tokens when focused. Part: link.
import { PuraElement, define } from "../base.js";
import meta from "./skip-nav.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "skip-nav.label": {
    en: "Skip to content",
    "pt-BR": "Pular para o conteúdo",
    fr: "Aller au contenu",
    de: "Zum Inhalt springen",
    it: "Vai al contenuto",
  },
});

class PuraSkipNav extends PuraElement {
  static observedAttributes = ["href", "label"];

  connectedCallback() {
    this._renderAll();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._renderAll();
  }

  _renderAll() {
    const href = this.getAttribute("href") || "#main";
    const label = this.getAttribute("label") || t("skip-nav.label");
    this.render(
      `<a class="link" part="link" href="${esc(href)}">${esc(label)}</a>`,
      CSS
    );
  }

  _applyI18n() {
    if (this.getAttribute("label")) return;
    const a = this.$(".link");
    if (a) a.textContent = t("skip-nav.label");
  }
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const CSS = `
  :host { display: contents; }

  .link {
    position: fixed; top: var(--pura-space-2); left: var(--pura-space-2);
    z-index: 1100;
    transform: translateY(-150%);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    text-decoration: none; white-space: nowrap;
    color: var(--pura-primary-fg); background: var(--pura-primary);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-2) var(--pura-space-4);
    box-shadow: var(--pura-shadow-lg);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .link:focus-visible, .link:focus {
    outline: none;
    transform: translateY(0);
    box-shadow: 0 0 0 3px var(--pura-ring), var(--pura-shadow-lg);
  }
`;

define("pura-skip-nav", PuraSkipNav, meta);
export { PuraSkipNav };

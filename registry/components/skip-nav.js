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
import { skipNavTemplate } from "./skip-nav.template.js";

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
    const { html, css } = skipNavTemplate(this);
    this.render(html, css);
  }

  _applyI18n() {
    if (this.getAttribute("label")) return;
    const a = this.$(".link");
    if (a) a.textContent = t("skip-nav.label");
  }
}

define("pura-skip-nav", PuraSkipNav, meta);
export { PuraSkipNav };

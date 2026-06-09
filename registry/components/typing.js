// <pura-typing> — three-dot "typing…" indicator for chat and agent UIs. Pure CSS
// @keyframes bounce with a per-dot stagger; JS only handles i18n of the
// accessible label. role="status" announces it to assistive tech.
//
// Attributes:
//   label — overrides the localized accessible label (default: "Typing…").
//
// Theming: --pura-typing-color (default var(--pura-muted)),
//   --pura-typing-size (0.5rem), --pura-typing-gap (0.25rem).
//
// Parts: dots — the flex container; dot — each individual dot.
//
// Reduced motion: base.js RESET collapses animation-duration, so the dots are
//   static under reduce while the status label still conveys the meaning.
import { PuraElement, define } from "../base.js";
import meta from "./typing.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { typingTemplate } from "./typing.template.js";

registerMessages({
  "typing.label": {
    en: "Typing…",
    "pt-BR": "Digitando…",
    fr: "En train d’écrire…",
    de: "Schreibt…",
    it: "Sta scrivendo…",
  },
});

class PuraTyping extends PuraElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    const { html, css } = typingTemplate(this);
    this.render(html, css);
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._applyI18n();
  }

  _applyI18n() {
    const label = this.getAttribute("label") || t("typing.label");
    this.$(".dots")?.setAttribute("aria-label", label);
  }
}


define("pura-typing", PuraTyping, meta);
export { PuraTyping };

// <pura-theme-designer> — a slide-in panel to pick a brand preset or craft a
// custom theme. Applies --pura-* token overrides live (every component + template
// restyles instantly) and persists the choice. Attributes:
//   open      — reflects/controls visibility.
//   launcher  — also render a fixed floating button that toggles the panel
//               (handy on standalone template pages).
//   position  — right (default) | left.
// API: .open() / .close() / .toggle(). Emits 'change' { id }.
import { PuraElement, define } from "../base.js";
import meta from "./theme-designer.meta.js";
import { applyTheme, getTheme, getCustom } from "../theme.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { themeDesignerTemplate, FONTS } from "./theme-designer.template.js";

registerMessages({
  "theme-designer.designer": { en: "Theme designer", "pt-BR": "Designer de tema", fr: "Concepteur de thème", de: "Theme-Designer", it: "Designer del tema" },
  "theme-designer.theme": { en: "Theme", "pt-BR": "Tema", fr: "Thème", de: "Theme", it: "Tema" },
  "theme-designer.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
  "theme-designer.presets": { en: "Presets", "pt-BR": "Predefinições", fr: "Préréglages", de: "Voreinstellungen", it: "Preimpostazioni" },
  "theme-designer.customize": { en: "Customize", "pt-BR": "Personalizar", fr: "Personnaliser", de: "Anpassen", it: "Personalizza" },
  "theme-designer.accent": { en: "Accent", "pt-BR": "Destaque", fr: "Accentuation", de: "Akzent", it: "Accento" },
  "theme-designer.radius": { en: "Radius", "pt-BR": "Raio", fr: "Rayon", de: "Radius", it: "Raggio" },
  "theme-designer.font": { en: "Font", "pt-BR": "Fonte", fr: "Police", de: "Schriftart", it: "Carattere" },
  "theme-designer.reset": { en: "Reset to default", "pt-BR": "Restaurar padrão", fr: "Réinitialiser", de: "Auf Standard zurücksetzen", it: "Ripristina predefinito" },
});

class PuraThemeDesigner extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    const { html, css } = themeDesignerTemplate(this);
    this.render(html, css);
    this._panel = this.$(".panel");
    this.$(".close").addEventListener("click", () => this.close());
    this.$(".backdrop").addEventListener("click", () => this.close());
    const launcher = this.$(".launcher");
    if (launcher) launcher.addEventListener("click", () => this.toggle());

    // preset clicks
    this.$$("[data-preset]").forEach((b) =>
      b.addEventListener("click", () => this._pick(b.dataset.preset))
    );
    // custom controls
    this._accent = this.$("#accent");
    this._radius = this.$("#radius");
    this._font = this.$("#font");
    [this._accent, this._radius, this._font].forEach((el) =>
      el && el.addEventListener("input", () => this._applyCustom())
    );
    this.$(".reset").addEventListener("click", () => this._pick("default"));

    this._highlight(getTheme());
    window.addEventListener("pura:theme", (e) => this._highlight(e.detail.id));

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  // Update only the already-rendered i18n nodes in place; never re-render or
  // re-attach global listeners.
  _applyI18n() {
    const launcher = this.$(".launcher");
    if (launcher) launcher.setAttribute("aria-label", t("theme-designer.designer"));
    if (this._panel) this._panel.setAttribute("aria-label", t("theme-designer.designer"));
    const header = this.$("header strong");
    if (header) header.textContent = t("theme-designer.theme");
    const close = this.$(".close");
    if (close) close.setAttribute("aria-label", t("theme-designer.close"));
    const heads = this.$$(".body > h4");
    if (heads[0]) heads[0].textContent = t("theme-designer.presets");
    if (heads[1]) heads[1].textContent = t("theme-designer.customize");
    const labels = this.$$(".field > span");
    if (labels[0]) labels[0].textContent = t("theme-designer.accent");
    if (labels[1]) labels[1].textContent = t("theme-designer.radius");
    if (labels[2]) labels[2].textContent = t("theme-designer.font");
    const reset = this.$(".reset");
    if (reset) reset.textContent = t("theme-designer.reset");
  }

  attributeChangedCallback() {
    if (this._panel) this._reflectOpen();
  }

  _reflectOpen() {
    const open = this.hasAttribute("open");
    this.$(".root").classList.toggle("is-open", open);
    // `inert` (not aria-hidden) on the closed panel: it pulls the panel's
    // focusable controls out of both the tab order and the a11y tree, so a
    // dialog full of buttons doesn't trip aria-hidden-focus while hidden.
    this._panel.inert = !open;
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
  toggle() { this.toggleAttribute("open"); }

  _pick(id) {
    applyTheme(id);
    this.dispatchEvent(new CustomEvent("change", { detail: { id }, bubbles: true }));
  }

  _applyCustom() {
    const accent = this._accent.value;
    const radius = `${this._radius.value}rem`;
    const font = FONTS[this._font.value] || FONTS.System;
    const vars = {
      base: {
        "--pura-primary": accent,
        "--pura-primary-hover": accent,
        "--pura-accent": accent,
        "--pura-ring": `color-mix(in srgb, ${accent} 45%, transparent)`,
        "--pura-radius-sm": `calc(${radius} * 0.7)`,
        "--pura-radius": radius,
        "--pura-radius-lg": `calc(${radius} * 1.4)`,
        "--pura-font": font,
      },
    };
    applyTheme(vars);
    this.dispatchEvent(new CustomEvent("change", { detail: { id: "custom" }, bubbles: true }));
  }

  _highlight(id) {
    this.$$("[data-preset]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.preset === id))
    );
  }

}

define("pura-theme-designer", PuraThemeDesigner, meta);
export { PuraThemeDesigner };

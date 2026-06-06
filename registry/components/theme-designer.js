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
import { listPresets, applyTheme, getTheme, getCustom } from "../theme.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

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

const FONTS = {
  System: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  Serif: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
  Mono: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace",
  Rounded: "ui-rounded, 'SF Pro Rounded', 'Nunito', system-ui, sans-serif",
};

class PuraThemeDesigner extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this.render(this._html(), CSS);
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
    this._panel.setAttribute("aria-hidden", open ? "false" : "true");
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

  _html() {
    const presets = listPresets()
      .map((p) => {
        const v = p.vars.light || p.vars.base || {};
        const bg = v["--pura-bg"] || "var(--pura-bg)";
        const primary = v["--pura-primary"] || "var(--pura-primary)";
        const accent = v["--pura-accent"] || primary;
        return `<button class="swatch" data-preset="${p.id}" aria-pressed="false" title="${p.name}">
            <span class="chip" style="background:${bg}">
              <i style="background:${primary}"></i><i style="background:${accent}"></i>
            </span>
            <span class="sw-name">${p.name}</span>
          </button>`;
      })
      .join("");

    const launcher = this.hasAttribute("launcher")
      ? `<button class="launcher" part="launcher" aria-label="${t("theme-designer.designer")}">
           <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9z"/></svg>
         </button>`
      : "";

    return `<div class="root">
      ${launcher}
      <div class="backdrop"></div>
      <aside class="panel" part="panel" role="dialog" aria-label="${t("theme-designer.designer")}" aria-hidden="true">
        <header>
          <strong>${t("theme-designer.theme")}</strong>
          <button class="close" aria-label="${t("theme-designer.close")}">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </header>
        <div class="body">
          <h4>${t("theme-designer.presets")}</h4>
          <div class="grid">${presets}</div>

          <h4>${t("theme-designer.customize")}</h4>
          <label class="field"><span>${t("theme-designer.accent")}</span><input id="accent" type="color" value="#2563eb"></label>
          <label class="field"><span>${t("theme-designer.radius")}</span><input id="radius" type="range" min="0" max="1.5" step="0.05" value="0.625"></label>
          <label class="field"><span>${t("theme-designer.font")}</span>
            <select id="font">${Object.keys(FONTS).map((f) => `<option>${f}</option>`).join("")}</select>
          </label>
          <button class="reset">${t("theme-designer.reset")}</button>
        </div>
      </aside>
    </div>`;
  }
}

const CSS = `
  :host { font-family: var(--pura-font); }
  .backdrop { position: fixed; inset: 0; background: rgb(0 0 0 / 0.4); opacity: 0; visibility: hidden;
    transition: opacity var(--pura-dur) var(--pura-ease); z-index: 9998; }
  .root.is-open .backdrop { opacity: 1; visibility: visible; }
  .panel {
    position: fixed; top: 0; right: 0; height: 100dvh; width: min(340px, 92vw); z-index: 9999;
    background: var(--pura-bg); color: var(--pura-fg); border-left: 1px solid var(--pura-border);
    box-shadow: var(--pura-shadow-lg); display: flex; flex-direction: column;
    transform: translateX(100%); transition: transform var(--pura-dur) var(--pura-ease);
  }
  :host([position="left"]) .panel { right: auto; left: 0; border-left: none; border-right: 1px solid var(--pura-border); transform: translateX(-100%); }
  .root.is-open .panel { transform: none; }

  header { display: flex; align-items: center; justify-content: space-between; padding: var(--pura-space-4) var(--pura-space-5); border-bottom: 1px solid var(--pura-border); }
  header strong { font-size: var(--pura-text-lg); }
  .close { display: grid; place-items: center; width: 1.9rem; height: 1.9rem; border: none; background: transparent; color: var(--pura-muted); cursor: pointer; border-radius: var(--pura-radius-sm); }
  .close:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .body { padding: var(--pura-space-5); overflow-y: auto; }
  h4 { font-size: var(--pura-text-xs); text-transform: uppercase; letter-spacing: .08em; color: var(--pura-muted); margin: 0 0 var(--pura-space-3); }
  h4:not(:first-child) { margin-top: var(--pura-space-5); }

  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--pura-space-2); }
  .swatch { display: flex; flex-direction: column; gap: 6px; align-items: center; padding: var(--pura-space-2); cursor: pointer;
    background: transparent; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); transition: border-color var(--pura-dur), box-shadow var(--pura-dur); }
  .swatch:hover { border-color: var(--pura-border-strong); }
  .swatch[aria-pressed="true"] { border-color: var(--pura-primary); box-shadow: 0 0 0 2px var(--pura-ring); }
  .chip { width: 100%; height: 30px; border-radius: var(--pura-radius-sm); border: 1px solid var(--pura-border); display: flex; align-items: flex-end; gap: 3px; padding: 4px; box-sizing: border-box; overflow: hidden; }
  .chip i { width: 10px; height: 10px; border-radius: 999px; display: block; }
  .sw-name { font-size: 11px; color: var(--pura-muted-fg); }

  .field { display: flex; align-items: center; justify-content: space-between; gap: var(--pura-space-3); margin-bottom: var(--pura-space-3); font-size: var(--pura-text-sm); }
  .field span { color: var(--pura-muted-fg); }
  .field input[type=color] { width: 44px; height: 28px; padding: 0; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); background: none; cursor: pointer; }
  .field input[type=range] { flex: 1; max-width: 160px; accent-color: var(--pura-primary); }
  .field select { font: inherit; font-size: var(--pura-text-sm); padding: 4px 8px; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); }
  .reset { margin-top: var(--pura-space-2); width: 100%; font: inherit; font-size: var(--pura-text-sm); font-weight: 550; cursor: pointer;
    padding: 8px; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius); background: var(--pura-bg); color: var(--pura-fg); }
  .reset:hover { background: var(--pura-subtle); }

  .launcher { position: fixed; right: 18px; bottom: 18px; z-index: 9997; width: 46px; height: 46px; border-radius: 999px;
    display: grid; place-items: center; cursor: pointer; border: 1px solid var(--pura-border); background: var(--pura-bg); color: var(--pura-fg); box-shadow: var(--pura-shadow-lg); }
  .launcher:hover { background: var(--pura-subtle); }
`;

define("pura-theme-designer", PuraThemeDesigner, meta);
export { PuraThemeDesigner };

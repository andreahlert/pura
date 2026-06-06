// <pura-alert> — callout. variant: info (default) | success | warning | danger.
// Attributes: title, dismissible.
import { PuraElement, define } from "../base.js";
import meta from "./alert.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "alert.dismiss": {
    en: "Dismiss",
    "pt-BR": "Dispensar",
    fr: "Fermer",
    de: "Schließen",
    it: "Chiudi",
  },
});

const ICONS = {
  info: '<path d="M12 16v-4M12 8h.01" stroke-width="2"/><circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/>',
  success: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M8 12l3 3 5-6" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  warning: '<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  danger: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M12 8v5M12 16h.01" stroke-width="2" stroke-linecap="round"/>',
};

class PuraAlert extends PuraElement {
  connectedCallback() {
    const v = this.getAttribute("variant") || "info";
    this.render(
      `<div part="alert" role="alert">
         <svg class="ico" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none">${ICONS[v] || ICONS.info}</svg>
         <div class="body">
           ${this.getAttribute("title") ? `<strong part="title">${this.getAttribute("title")}</strong>` : ""}
           <div part="desc"><slot></slot></div>
         </div>
         ${this.hasAttribute("dismissible") ? `<button class="x" part="close" aria-label="${t("alert.dismiss")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>` : ""}
       </div>`,
      CSS
    );
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

const CSS = `
  :host { display: block; }
  [part="alert"] {
    display: flex; gap: var(--pura-space-3); align-items: flex-start;
    padding: var(--pura-space-4); border-radius: var(--pura-radius);
    border: 1px solid var(--pura-border); background: var(--pura-subtle);
    color: var(--pura-fg);
  }
  .ico { width: 1.15rem; height: 1.15rem; flex: none; margin-top: 1px; color: var(--pura-muted); }
  .body { flex: 1; min-width: 0; }
  [part="title"] { display: block; font-size: var(--pura-text-sm); font-weight: 600; margin-bottom: 2px; }
  [part="desc"] { font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.55; }
  .x { display: grid; place-items: center; width: 1.5rem; height: 1.5rem; flex: none;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm); }
  .x:hover { background: color-mix(in srgb, currentColor 12%, transparent); color: var(--pura-fg); }
  .x svg { width: 0.95rem; height: 0.95rem; }

  :host([variant="info"]) [part="alert"] { background: var(--pura-info-bg); border-color: color-mix(in srgb, var(--pura-info) 25%, transparent); }
  :host([variant="info"]) .ico { color: var(--pura-info); }
  :host([variant="success"]) [part="alert"] { background: var(--pura-success-bg); border-color: color-mix(in srgb, var(--pura-success) 25%, transparent); }
  :host([variant="success"]) .ico { color: var(--pura-success); }
  :host([variant="warning"]) [part="alert"] { background: var(--pura-warning-bg); border-color: color-mix(in srgb, var(--pura-warning) 25%, transparent); }
  :host([variant="warning"]) .ico { color: var(--pura-warning); }
  :host([variant="danger"]) [part="alert"] { background: var(--pura-danger-bg); border-color: color-mix(in srgb, var(--pura-danger) 25%, transparent); }
  :host([variant="danger"]) .ico { color: var(--pura-danger); }
`;

define("pura-alert", PuraAlert, meta);
export { PuraAlert };

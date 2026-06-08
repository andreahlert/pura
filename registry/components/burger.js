// <pura-burger>. A hamburger menu toggle button that animates between a
// hamburger glyph and an X. Three lines morph into the cross when open. Clicking
// toggles the `open` state and dispatches a "change" CustomEvent (detail {open}).
// The control is a real <button>, so it gets Enter/Space keyboard handling for
// free, with aria-expanded and an accessible label. prefers-reduced-motion is
// respected via the base reset (transition durations collapse).
//
// Attributes:
//   open    boolean, reflects the toggled state.
//   size    CSS length for the glyph box (default "1.5rem").
//   label   accessible label (i18n default "Menu").
//
// Events:
//   change  CustomEvent({ detail: { open } }) on every toggle.
//
// Parts: button, line
import { PuraElement, define } from "../base.js";
import meta from "./burger.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { burgerTemplate } from "./burger.template.js";

registerMessages({
  "burger.label": {
    en: "Menu",
    "pt-BR": "Menu",
    fr: "Menu",
    de: "Menü",
    it: "Menu",
  },
});

class PuraBurger extends PuraElement {
  static observedAttributes = ["open", "size", "label"];

  connectedCallback() {
    const { html, css } = burgerTemplate(this);
    this.render(html, css);

    this._btn = this.$("button");
    this._onClick = () => this.toggle();
    this._btn.addEventListener("click", this._onClick);

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
    this._i18nOff = null;
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._btn) return;
    if (name === "open") {
      this._btn.setAttribute("aria-expanded", this.hasAttribute("open") ? "true" : "false");
    } else if (name === "size") {
      this._btn.style.setProperty("--burger-size", val || "1.5rem");
    } else if (name === "label") {
      // Keep an explicit label in sync; fall back to the i18n default.
      this._btn.setAttribute("aria-label", val || t("burger.label"));
    }
  }

  _applyI18n() {
    if (this._btn && !this.hasAttribute("label")) {
      this._btn.setAttribute("aria-label", t("burger.label"));
    }
  }

  toggle() {
    const next = !this.hasAttribute("open");
    if (next) this.setAttribute("open", "");
    else this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("change", { detail: { open: next }, bubbles: true }));
  }

  get open() { return this.hasAttribute("open"); }
  set open(v) {
    if (v) this.setAttribute("open", "");
    else this.removeAttribute("open");
  }
}

define("pura-burger", PuraBurger, meta);
export { PuraBurger };

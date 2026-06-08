// <pura-pull-to-refresh> mobile-style pull down at scroll-top to refresh.
//   Dragging down while the content is scrolled to the top reveals an indicator
//   (arrow → spinner). Releasing past the threshold dispatches "refresh"
//   (bubbles). The app sets the `refreshing` attribute to keep the indicator
//   spinning, then removes it when done.
//   Attributes:
//     height (px) → scroll container height (overflow auto)
//     refreshing  → app-controlled busy state
//   Parts: indicator, content. i18n: pull / release / refreshing labels.
import { PuraElement, define } from "../base.js";
import meta from "./pull-to-refresh.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { pullToRefreshTemplate } from "./pull-to-refresh.template.js";

registerMessages({
  "pull-to-refresh.pull": {
    en: "Pull to refresh",
    "pt-BR": "Puxe para atualizar",
    fr: "Tirez pour actualiser",
    de: "Zum Aktualisieren ziehen",
    it: "Trascina per aggiornare",
  },
  "pull-to-refresh.release": {
    en: "Release to refresh",
    "pt-BR": "Solte para atualizar",
    fr: "Relâchez pour actualiser",
    de: "Loslassen zum Aktualisieren",
    it: "Rilascia per aggiornare",
  },
  "pull-to-refresh.refreshing": {
    en: "Refreshing…",
    "pt-BR": "Atualizando…",
    fr: "Actualisation…",
    de: "Wird aktualisiert…",
    it: "Aggiornamento…",
  },
});

const THRESHOLD = 64; // px to trigger
const MAX = 96; // px clamp with resistance

class PuraPullToRefresh extends PuraElement {
  static observedAttributes = ["height", "refreshing"];

  connectedCallback() {
    const { html, css } = pullToRefreshTemplate(this);
    this.render(html, css);
    this._indicator = this.$(".indicator");
    this._content = this.$(".content");
    this._label = this.$(".label");

    this._active = false;
    this._startY = 0;
    this._dist = 0;

    this._onDown = (e) => this._down(e);
    this._onMove = (e) => this._move(e);
    this._onUp = (e) => this._up(e);
    this._content.addEventListener("pointerdown", this._onDown);
    this._content.addEventListener("pointermove", this._onMove);
    this._content.addEventListener("pointerup", this._onUp);
    this._content.addEventListener("pointercancel", this._onUp);

    this._sync();
    this._applyI18n();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._content?.removeEventListener("pointerdown", this._onDown);
    this._content?.removeEventListener("pointermove", this._onMove);
    this._content?.removeEventListener("pointerup", this._onUp);
    this._content?.removeEventListener("pointercancel", this._onUp);
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this._content) this._sync();
  }

  _sync() {
    const h = this.getAttribute("height");
    if (h) {
      this._content.style.height = /\D/.test(h) ? h : `${h}px`;
      this._content.style.overflow = "auto";
    } else {
      this._content.style.removeProperty("height");
      this._content.style.removeProperty("overflow");
    }
    if (this.bool("refreshing")) this._setOpen(THRESHOLD, "refreshing");
    else if (!this._active) this._setOpen(0, "pull");
  }

  _applyI18n() {
    this._label.textContent = t(`pull-to-refresh.${this._state || "pull"}`);
  }

  _down(e) {
    if (this.bool("refreshing")) return;
    if (this._content.scrollTop > 0) return;
    this._active = true;
    this._startY = e.clientY;
    this._dist = 0;
    this._content.setPointerCapture?.(e.pointerId);
    this._indicator.style.transition = "none";
    this._content.style.transition = "none";
  }

  _move(e) {
    if (!this._active) return;
    const dy = e.clientY - this._startY;
    if (dy <= 0) {
      this._setOpen(0, "pull");
      return;
    }
    e.preventDefault();
    // Rubber-band resistance past the threshold.
    this._dist = Math.min(MAX, dy * 0.5);
    const state = this._dist >= THRESHOLD ? "release" : "pull";
    this._setOpen(this._dist, state);
  }

  _up() {
    if (!this._active) return;
    this._active = false;
    this._indicator.style.removeProperty("transition");
    this._content.style.removeProperty("transition");
    if (this._dist >= THRESHOLD) {
      this._setOpen(THRESHOLD, "refreshing");
      this.dispatchEvent(new CustomEvent("refresh", { bubbles: true }));
    } else {
      this._setOpen(0, "pull");
    }
  }

  // Drive the visual: translate the content, label state, arrow vs spinner.
  _setOpen(px, state) {
    this._state = state;
    this._content.style.transform = `translateY(${px}px)`;
    this._indicator.style.height = `${px}px`;
    this._indicator.dataset.state = state;
    this._label.textContent = t(`pull-to-refresh.${state}`);
  }
}


define("pura-pull-to-refresh", PuraPullToRefresh, meta);
export { PuraPullToRefresh };

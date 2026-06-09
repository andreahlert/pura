// <pura-disclosure> — a show/hide region that animates its height between 0 and
// the content's natural `auto` using the modern CSS recipe `interpolate-size:
// allow-keywords` + `transition: height`. Unlike <pura-collapsible> (which uses
// the grid-template-rows 0fr/1fr trick), this tweens true height with no inner
// wrapper measuring, so padding, borders, and nested collapsibles animate
// cleanly. Browsers without interpolate-size still open/close, they just snap.
//
// Attributes:
//   open      — expanded when present.
//   disabled  — the trigger is inert and toggling is blocked.
// Slots:
//   trigger   — the clickable summary (falls back to "Details").
//   (default) — the disclosed content.
// API: .toggle() / .open() / .close().
// Event: disclosuretoggle { open } — fired whenever the open state changes.
// ARIA: the trigger is a <button> with aria-expanded + aria-controls; the
//   content region carries aria-hidden when collapsed.
//
// Agent-native layer: data-pura-open mirrors the state and each instance
//   registers in window.__puraDisclosures keyed by data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./disclosure.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { disclosureTemplate } from "./disclosure.template.js";

registerMessages({
  "disclosure.toggle": {
    en: "Toggle details",
    "pt-BR": "Alternar detalhes",
    fr: "Afficher les détails",
    de: "Details umschalten",
    it: "Mostra dettagli",
  },
});

let uid = 0;

function registry() {
  return (window.__puraDisclosures ||= new Map());
}

class PuraDisclosure extends PuraElement {
  static observedAttributes = ["open", "disabled"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-disclosure-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = disclosureTemplate(this);
    this.render(html, css);

    this._trigger = this.$(".trigger");
    this._content = this.$(".content");
    this._contentId = `${this._id}-content`;
    this._content.setAttribute("id", this._contentId);
    this._trigger.setAttribute("aria-controls", this._contentId);
    this._trigger.addEventListener("click", () => this.toggle());

    this._sync();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    this._i18nOff?.();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._trigger) return;
    this._sync();
    if (name === "open" && oldValue !== newValue) {
      this.dispatchEvent(new CustomEvent("disclosuretoggle", {
        bubbles: true,
        detail: { open: this.hasAttribute("open") },
      }));
    }
  }

  _applyI18n() {
    if (this._trigger) this._trigger.setAttribute("aria-label", t("disclosure.toggle"));
  }

  _sync() {
    const open = this.hasAttribute("open");
    this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
    this._trigger.disabled = this.hasAttribute("disabled");
    this._trigger.setAttribute("aria-label", t("disclosure.toggle"));
    this._content.setAttribute("aria-hidden", open ? "false" : "true");
    // inert (not just aria-hidden) so focusable children in a collapsed panel
    // leave the tab order and the a11y tree, avoiding the aria-hidden-focus trap.
    if (open) this._content.removeAttribute("inert");
    else this._content.setAttribute("inert", "");
    this.setAttribute("data-pura-open", open ? "true" : "false");
  }

  toggle() {
    if (this.hasAttribute("disabled")) return;
    this.toggleAttribute("open");
  }

  open() {
    if (this.hasAttribute("disabled")) return;
    this.setAttribute("open", "");
  }

  close() {
    this.removeAttribute("open");
  }
}

define("pura-disclosure", PuraDisclosure, meta);
export { PuraDisclosure };

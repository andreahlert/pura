// <pura-banner> — full-width announcement strip. Persistent site/section notice
// with an accent icon, optional title + message, an optional action and a
// dismiss button. Sticky-friendly.
//
// Attributes:
//   variant       — info (default) | success | warning | danger | promo
//   title         — fallback for the `title` slot (plain text)
//   message       — fallback for the `message` / default slot (plain text)
//   dismissible   — render a close button
//   sticky        — position: sticky to the top of the scroll container
//   label         — accessible label for the region (default per-variant)
// Slots:
//   title         — bold lead line (falls back to the `title` attribute)
//   message (default slot) — body text (falls back to the `message` attribute)
//   action        — trailing call-to-action (e.g. a <pura-button>)
// Events:
//   dismiss { id } — cancelable; bubbles. Preventing it keeps the banner shown.
// Agent-native layer: a stable data-pura-id, a window.__puraBanners registry
//   keyed by that id, and data-pura-banner-* attributes mirroring live state so
//   agents can enumerate / read / dismiss every banner without touching the DOM.
import { PuraElement, define } from "../base.js";
import meta from "./banner.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { bannerTemplate } from "./banner.template.js";

registerMessages({
  "banner.label.info": { en: "Information announcement", "pt-BR": "Aviso informativo", fr: "Annonce d'information", de: "Informationshinweis", it: "Annuncio informativo" },
  "banner.label.success": { en: "Success announcement", "pt-BR": "Aviso de sucesso", fr: "Annonce de réussite", de: "Erfolgshinweis", it: "Annuncio di successo" },
  "banner.label.warning": { en: "Warning announcement", "pt-BR": "Aviso de alerta", fr: "Annonce d'avertissement", de: "Warnhinweis", it: "Annuncio di avviso" },
  "banner.label.danger": { en: "Danger announcement", "pt-BR": "Aviso de perigo", fr: "Annonce de danger", de: "Gefahrenhinweis", it: "Annuncio di pericolo" },
  "banner.label.promo": { en: "Promotional announcement", "pt-BR": "Aviso promocional", fr: "Annonce promotionnelle", de: "Werbehinweis", it: "Annuncio promozionale" },
  "banner.dismiss": { en: "Dismiss notice", "pt-BR": "Dispensar aviso", fr: "Fermer l'avis", de: "Hinweis schließen", it: "Chiudi avviso" },
});

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraBanners ||= new Map());
}

const VARIANTS = new Set(["info", "success", "warning", "danger", "promo"]);

class PuraBanner extends PuraElement {
  static observedAttributes = ["variant", "title", "message", "dismissible", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-banner-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._dismissed = false;
    this._render();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    // Re-render so the icon/variant + fallbacks stay in sync. Guarded by the
    // connected flag (_id is set in connectedCallback).
    if (this._id != null) this._render();
  }

  // ---- public API --------------------------------------------------------
  get variant() {
    const v = this.getAttribute("variant");
    return VARIANTS.has(v) ? v : "info";
  }

  get dismissed() {
    return this._dismissed;
  }

  // Dismiss programmatically. Same path as the close button: emits a cancelable
  // `dismiss` event; if not prevented, the banner is hidden (kept in the DOM so
  // it can be re-shown and stays in the registry).
  dismiss() {
    if (this._dismissed) return false;
    const ev = new CustomEvent("dismiss", {
      bubbles: true,
      cancelable: true,
      detail: { id: this._id },
    });
    const proceed = this.dispatchEvent(ev);
    if (!proceed) return false;
    this._dismissed = true;
    this.hidden = true;
    this.setAttribute("data-pura-banner-dismissed", "true");
    return true;
  }

  // Re-show a previously dismissed banner.
  show() {
    this._dismissed = false;
    this.hidden = false;
    this.setAttribute("data-pura-banner-dismissed", "false");
  }

  // ---- internals ---------------------------------------------------------
  _render() {
    const { html, css } = bannerTemplate(this);
    this.render(html, css);

    this.$(".x")?.addEventListener("click", () => this.dismiss());

    // Hide structurally-empty regions (title / message / action) so the strip
    // degrades gracefully with no attributes and no children.
    this._bindAutoHide("title", ".title");
    this._bindAutoHide("message", ".message");
    this._bindAutoHide("action", ".action");

    this._reflectAgentState();
  }

  // Update already-rendered i18n nodes in place on locale change (no re-render,
  // so listeners/focus/state are preserved).
  _applyI18n() {
    const region = this.$('[part="banner"]');
    if (region && !this.getAttribute("label")) {
      region.setAttribute("aria-label", t(`banner.label.${this.variant}`));
    }
    this.$(".x")?.setAttribute("aria-label", t("banner.dismiss"));
  }

  // Hide `selector` when its slot (and any attribute fallback) is empty.
  _bindAutoHide(slotName, selector) {
    const host = this.$(selector);
    if (!host) return;
    const slots = host.querySelectorAll("slot");
    const upd = () => {
      let has = false;
      for (const s of slots) {
        if (s.assignedNodes({ flatten: true }).length) { has = true; break; }
      }
      // Attribute fallbacks render as text inside the (unassigned) default slot,
      // so also treat non-empty text content as content.
      if (!has && host.textContent.trim()) has = true;
      host.style.display = has ? "" : "none";
    };
    for (const s of slots) s.addEventListener("slotchange", upd);
    upd();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-banner-variant", this.variant);
    this.setAttribute("data-pura-banner-dismissible", this.hasAttribute("dismissible") ? "true" : "false");
    this.setAttribute("data-pura-banner-sticky", this.hasAttribute("sticky") ? "true" : "false");
    this.setAttribute("data-pura-banner-dismissed", this._dismissed ? "true" : "false");
  }
}

define("pura-banner", PuraBanner, meta);
export { PuraBanner };

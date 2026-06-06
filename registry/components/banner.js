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

// Inline SVG glyphs per variant. `promo` gets a sparkle; the rest mirror the
// shared status iconography used across alert/toast.
const ICONS = {
  info: '<path d="M12 16v-4M12 8h.01" stroke-width="2"/><circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/>',
  success: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M8 12l3 3 5-6" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  warning: '<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  danger: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M12 8v5M12 16h.01" stroke-width="2" stroke-linecap="round"/>',
  promo: '<path d="M12 3l1.9 4.8L19 9l-4 3.4 1.3 5.1L12 15l-4.3 2.5L9 12.4 5 9l5.1-1.2z" fill="none" stroke-width="2" stroke-linejoin="round"/>',
};

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
    const v = this.variant;
    const title = this.getAttribute("title") || "";
    const message = this.getAttribute("message") || "";
    const dismissible = this.hasAttribute("dismissible");

    this.render(
      `<div part="banner" role="region" aria-label="${esc(this.getAttribute("label") || t(`banner.label.${v}`))}">
         <svg class="ico" part="icon" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none">${ICONS[v] || ICONS.info}</svg>
         <div class="body" part="content">
           <strong class="title" part="title"><slot name="title">${esc(title)}</slot></strong>
           <span class="message" part="message"><slot>${esc(message)}</slot></span>
         </div>
         <div class="action" part="action"><slot name="action"></slot></div>
         ${dismissible
           ? `<button class="x" part="close" type="button" aria-label="${esc(t("banner.dismiss"))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>`
           : ""}
       </div>`,
      CSS
    );

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

// Minimal escaping for attribute-derived text interpolated into the template.
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: block; }
  :host([hidden]) { display: none !important; }
  :host([sticky]) { position: sticky; top: 0; z-index: 50; }

  [part="banner"] {
    display: flex; align-items: center; gap: var(--pura-space-3);
    width: 100%; padding: var(--pura-space-3) var(--pura-space-5);
    border-bottom: 1px solid var(--pura-border);
    background: var(--pura-subtle); color: var(--pura-fg);
    font-size: var(--pura-text-sm); line-height: 1.5;
  }

  .ico { width: 1.15rem; height: 1.15rem; flex: none; color: var(--pura-muted); }

  .body {
    display: flex; flex-wrap: wrap; align-items: baseline;
    gap: var(--pura-space-1) var(--pura-space-2);
    flex: 1; min-width: 0;
  }
  .title { font-weight: 600; }
  .message { color: var(--pura-muted-fg); min-width: 0; word-wrap: break-word; }

  .action { flex: none; display: inline-flex; align-items: center; gap: var(--pura-space-2); }

  .x {
    display: grid; place-items: center; width: 1.5rem; height: 1.5rem; flex: none;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .x:hover { background: color-mix(in srgb, currentColor 12%, transparent); color: var(--pura-fg); }
  .x:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .x svg { width: 0.95rem; height: 0.95rem; }

  /* variants — colours from existing tokens only */
  :host([variant="info"]) [part="banner"] { background: var(--pura-info-bg); border-color: color-mix(in srgb, var(--pura-info) 25%, transparent); }
  :host([variant="info"]) .ico { color: var(--pura-info); }

  :host([variant="success"]) [part="banner"] { background: var(--pura-success-bg); border-color: color-mix(in srgb, var(--pura-success) 25%, transparent); }
  :host([variant="success"]) .ico { color: var(--pura-success); }

  :host([variant="warning"]) [part="banner"] { background: var(--pura-warning-bg); border-color: color-mix(in srgb, var(--pura-warning) 25%, transparent); }
  :host([variant="warning"]) .ico { color: var(--pura-warning); }

  :host([variant="danger"]) [part="banner"] { background: var(--pura-danger-bg); border-color: color-mix(in srgb, var(--pura-danger) 25%, transparent); }
  :host([variant="danger"]) .ico { color: var(--pura-danger); }

  /* promo — no dedicated token set; built from the accent + primary surface */
  :host([variant="promo"]) [part="banner"] {
    background: var(--pura-primary); color: var(--pura-primary-fg);
    border-color: transparent;
  }
  :host([variant="promo"]) .ico { color: var(--pura-primary-fg); }
  :host([variant="promo"]) .message { color: color-mix(in srgb, var(--pura-primary-fg) 80%, transparent); }
  :host([variant="promo"]) .x { color: color-mix(in srgb, var(--pura-primary-fg) 70%, transparent); }
  :host([variant="promo"]) .x:hover { color: var(--pura-primary-fg); }

  @media (max-width: 30rem) {
    [part="banner"] { flex-wrap: wrap; }
    .action { width: 100%; }
  }
`;

define("pura-banner", PuraBanner, meta);
export { PuraBanner };

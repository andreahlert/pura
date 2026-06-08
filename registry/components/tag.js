// <pura-tag> — a single tag / chip. A small rounded pill that labels, filters or
// categorizes. Default slot is the label; an optional leading dot and an optional
// trailing remove (×) affordance turn it into a dismissible chip.
//
// Attributes:
//   variant    — neutral (default) | primary | success | warning | danger | info
//   removable  — render a trailing × button that emits `remove`
//   dot        — render a leading status dot
//   disabled   — dim the chip and disable the remove button
//   label      — accessible label fallback (used when the slot is empty)
// Slots:
//   (default)  — the tag label (text or inline content)
// Parts:
//   tag        — the pill wrapper
//   dot        — the leading status dot
//   label      — the label text wrapper
//   remove     — the trailing remove button
// Events:
//   remove { id, label } — cancelable; bubbles. Fired by the × button or remove().
//     Preventing it keeps the tag in place.
// Agent-native layer: a stable data-pura-id, a window.__puraTags registry keyed by
//   that id, and data-pura-tag-* attributes mirroring live state (variant,
//   removable, disabled, removed) so agents/tooling can enumerate, read and remove
//   every tag without reaching into the Shadow DOM.
import { PuraElement, define } from "../base.js";
import meta from "./tag.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { tagTemplate } from "./tag.template.js";

registerMessages({
  "tag.remove": {
    en: "Remove {label}",
    "pt-BR": "Remover {label}",
    fr: "Supprimer {label}",
    de: "{label} entfernen",
    it: "Rimuovi {label}",
  },
  "tag.fallback": {
    en: "tag",
    "pt-BR": "etiqueta",
    fr: "étiquette",
    de: "Tag",
    it: "etichetta",
  },
});

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraTags ||= new Map());
}

const VARIANTS = new Set(["neutral", "primary", "success", "warning", "danger", "info"]);

class PuraTag extends PuraElement {
  static observedAttributes = ["variant", "removable", "dot", "disabled", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-tag-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._removed = false;
    this._render();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    // Re-render so the dot / remove button / variant stay in sync. Guarded by the
    // connected flag (_id is set in connectedCallback).
    if (this._id != null) this._render();
  }

  // ---- public API --------------------------------------------------------
  get variant() {
    const v = this.getAttribute("variant");
    return VARIANTS.has(v) ? v : "neutral";
  }

  get removed() {
    return this._removed;
  }

  // The plain-text label, from the `label` attribute or the slotted text.
  get label() {
    return (this.getAttribute("label") || this.textContent || "").trim();
  }

  // Remove programmatically. Same path as the × button: emits a cancelable
  // `remove` event; if not prevented, the tag hides itself (kept in the DOM and
  // the registry so it can be re-shown).
  remove() {
    if (this._removed || this.hasAttribute("disabled")) return false;
    const ev = new CustomEvent("remove", {
      bubbles: true,
      cancelable: true,
      detail: { id: this._id, label: this.label },
    });
    const proceed = this.dispatchEvent(ev);
    if (!proceed) return false;
    this._removed = true;
    this.hidden = true;
    this.setAttribute("data-pura-tag-removed", "true");
    return true;
  }

  // Re-show a previously removed tag.
  show() {
    this._removed = false;
    this.hidden = false;
    this.setAttribute("data-pura-tag-removed", "false");
  }

  // ---- internals ---------------------------------------------------------
  // Update already-rendered i18n nodes in place on locale change (no re-render).
  _applyI18n() {
    const btn = this.$(".remove");
    if (btn) btn.setAttribute("aria-label", t("tag.remove", { label: this.label || t("tag.fallback") }));
  }

  _render() {
    const removable = this.hasAttribute("removable");
    const disabled = this.hasAttribute("disabled");

    const { html, css } = tagTemplate(this);
    this.render(html, css);

    // Mirror live state onto the host for agents / assistive tech.
    this.setAttribute("data-pura-component", "tag");
    this.setAttribute("data-pura-tag-variant", this.variant);
    this.setAttribute("data-pura-tag-removable", removable ? "true" : "false");
    this.setAttribute("data-pura-tag-disabled", disabled ? "true" : "false");
    this.setAttribute("data-pura-tag-removed", this._removed ? "true" : "false");

    if (removable) {
      const btn = this.$(".remove");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.remove();
      });
    }
  }
}

define("pura-tag", PuraTag, meta);
export { PuraTag };

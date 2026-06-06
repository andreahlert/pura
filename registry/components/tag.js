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
    const dot = this.hasAttribute("dot") ? '<span class="dot" part="dot" aria-hidden="true"></span>' : "";
    const remove = removable
      ? `<button class="remove" part="remove" type="button"
             aria-label="${esc(t("tag.remove", { label: this.label || t("tag.fallback") }))}"
             ${disabled ? "disabled" : ""}>
           <svg viewBox="0 0 24 24" width="0.85em" height="0.85em" aria-hidden="true">
             <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor"
                   stroke-width="2.2" stroke-linecap="round"/>
           </svg>
         </button>`
      : "";

    this.render(
      `<span part="tag" data-pura="tag">
         ${dot}<span class="label" part="label"><slot></slot></span>${remove}
       </span>`,
      CSS
    );

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

// Minimal HTML-attribute escaper for the dynamic aria-label.
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

const CSS = `
  :host { display: inline-flex; vertical-align: middle; }
  :host([disabled]) { opacity: 0.55; pointer-events: none; }

  [part="tag"] {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1;
    white-space: nowrap; max-width: 100%;
    padding: 0.3rem var(--pura-space-2); border-radius: var(--pura-radius-full);
    border: 1px solid var(--pura-border); background: var(--pura-subtle);
    color: var(--pura-muted-fg);
  }

  .label {
    overflow: hidden; text-overflow: ellipsis; min-width: 0;
  }

  .dot {
    flex: none; width: 0.4rem; height: 0.4rem;
    border-radius: 50%; background: currentColor;
  }

  .remove {
    flex: none; display: inline-flex; align-items: center; justify-content: center;
    margin: -0.15rem -0.2rem -0.15rem 0; padding: 0.1rem;
    font: inherit; color: inherit; cursor: pointer;
    background: transparent; border: 0; border-radius: var(--pura-radius-full);
    opacity: 0.7;
    transition: background var(--pura-dur) var(--pura-ease),
      opacity var(--pura-dur) var(--pura-ease);
  }
  .remove:hover { opacity: 1; background: color-mix(in srgb, currentColor 16%, transparent); }
  .remove:focus-visible { outline: none; opacity: 1; box-shadow: 0 0 0 2px var(--pura-ring); }
  .remove:disabled { cursor: not-allowed; opacity: 0.4; }

  /* variants */
  :host([variant="primary"]) [part="tag"] {
    background: var(--pura-primary); color: var(--pura-primary-fg); border-color: transparent;
  }
  :host([variant="success"]) [part="tag"] {
    background: var(--pura-success-bg); color: var(--pura-success);
    border-color: color-mix(in srgb, var(--pura-success) 30%, transparent);
  }
  :host([variant="warning"]) [part="tag"] {
    background: var(--pura-warning-bg); color: var(--pura-warning);
    border-color: color-mix(in srgb, var(--pura-warning) 30%, transparent);
  }
  :host([variant="danger"]) [part="tag"] {
    background: var(--pura-danger-bg); color: var(--pura-danger);
    border-color: color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
  :host([variant="info"]) [part="tag"] {
    background: var(--pura-info-bg); color: var(--pura-info);
    border-color: color-mix(in srgb, var(--pura-info) 30%, transparent);
  }
`;

define("pura-tag", PuraTag, meta);
export { PuraTag };

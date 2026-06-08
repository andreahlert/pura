// <pura-tag-input> — chips/tags input. Type text + Enter (or comma) adds a chip;
// Backspace on an empty field removes the last chip; click the × on a chip
// removes it. Reflects the current tags to the host `value` attribute as a
// comma-separated list; the .value property reads/writes an array. Emits
// CustomEvent('change', { detail: { tags } }) on every mutation.
//
// Attributes:
//   value        comma-separated initial tags (reflected as tags change)
//   placeholder  placeholder for the text field (only shown while empty)
//   max          maximum number of tags allowed (input is blocked at the cap)
//   disabled     non-interactive
//
// Property: .value  -> string[] (get/set)
// Events:   change  -> { tags: string[] }
//
// Agent-native: each instance registers in the global window.__puraTagInputs
// registry keyed by a stable id, exposing { el, getTags, addTag, removeTag, max }.
// The host carries data-pura-tag-input (id), data-tags (JSON), data-count and
// data-max so an agent can read state without touching the shadow DOM. The
// region is a role="group" with the chip list as role="list" / role="listitem".
import { PuraElement, define } from "../base.js";
import meta from "./tag-input.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { tagInputTemplate } from "./tag-input.template.js";

registerMessages({
  "tag-input.label": {
    en: "Tags",
    "pt-BR": "Tags",
    fr: "Étiquettes",
    de: "Tags",
    it: "Tag",
  },
  "tag-input.add": {
    en: "Add a tag",
    "pt-BR": "Adicionar uma tag",
    fr: "Ajouter une étiquette",
    de: "Tag hinzufügen",
    it: "Aggiungi un tag",
  },
  "tag-input.remove": {
    en: "Remove {tag}",
    "pt-BR": "Remover {tag}",
    fr: "Supprimer {tag}",
    de: "{tag} entfernen",
    it: "Rimuovi {tag}",
  },
});

let uid = 0;

// Global machine-readable registry so agents can discover and drive every
// tag-input on the page without reaching into shadow roots.
const REGISTRY = (window.__puraTagInputs ||= new Map());

class PuraTagInput extends PuraElement {
  static observedAttributes = ["value", "placeholder", "max", "disabled"];

  connectedCallback() {
    this._id = `pura-tag-input-${uid++}`;
    // Seed tags from the value attribute on first connect.
    if (this._tags === undefined) this._tags = this._parse(this.getAttribute("value"));

    this.setAttribute("data-pura-tag-input", this._id);
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    if (!this.hasAttribute("aria-label")) {
      // Track when we own the default label so locale changes can re-translate
      // it without clobbering a placeholder- or consumer-derived value.
      this._ownsAriaLabel = !this.hasAttribute("placeholder");
      this.setAttribute("aria-label", this.getAttribute("placeholder") || t("tag-input.label"));
    }

    const { html, css } = tagInputTemplate(this);
    this.render(html, css);

    this._field = this.$(".field");
    this._list = this.$(".chips");
    this._entry = this.$(".entry");

    this._entry.addEventListener("keydown", (e) => this._onKeydown(e));
    this._entry.addEventListener("input", () => this._onInput());
    // Clicking anywhere on the field focuses the text entry (not when hitting ×).
    this._field.addEventListener("mousedown", (e) => {
      if (e.target.closest(".remove")) return;
      if (e.target !== this._entry && !this.hasAttribute("disabled")) {
        e.preventDefault();
        this._entry.focus();
      }
    });
    // Remove a chip via its × button (delegated).
    this._list.addEventListener("click", (e) => {
      const btn = e.target.closest(".remove");
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      this._removeAt(idx);
      this._entry.focus();
    });

    REGISTRY.set(this._id, {
      el: this,
      getTags: () => this.value,
      addTag: (tag) => this._add(tag),
      removeTag: (tag) => this._removeValue(tag),
      get max() { return this._maxCount(); },
    });

    this._renderChips();
    this._reflect();

    // React to locale changes by updating only the already-rendered i18n nodes.
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (this._id) REGISTRY.delete(this._id);
    this._i18nOff?.();
  }

  // Update the in-place i18n nodes (host + input aria-labels and chip remove
  // buttons) without re-rendering the shadow tree or adding any listeners.
  _applyI18n() {
    // Host aria-label: only re-translate the default we own (no placeholder,
    // no consumer-set aria-label).
    if (this._ownsAriaLabel) {
      this.setAttribute("aria-label", t("tag-input.label"));
    }
    // Input aria-label: only when the consumer did not supply a placeholder
    // (which drives the input aria-label in render()).
    if (this._entry && !this.hasAttribute("placeholder")) {
      this._entry.setAttribute("aria-label", t("tag-input.add"));
    }
    // Refresh chip remove-button aria-labels (no listeners added here).
    this._renderChips();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this._entry) return; // not yet rendered
    if (name === "placeholder") {
      this._entry.placeholder = newVal || "";
    } else if (name === "disabled") {
      this._entry.disabled = this.hasAttribute("disabled");
    } else if (name === "value") {
      // Ignore the echo from our own _reflect() writes.
      if (newVal === this._serialize(this._tags)) return;
      this._tags = this._parse(newVal);
      this._renderChips();
      this._reflect();
    } else if (name === "max") {
      this._reflect();
    }
  }

  // ---- public API ---------------------------------------------------------
  get value() { return [...(this._tags || [])]; }
  set value(v) {
    const arr = Array.isArray(v) ? v : this._parse(v);
    this._tags = arr.map((tag) => String(tag).trim()).filter(Boolean);
    if (this._entry) {
      this._renderChips();
      this._reflect();
    }
  }

  // ---- internals -----------------------------------------------------------
  _parse(str) {
    if (!str) return [];
    return str.split(",").map((tag) => tag.trim()).filter(Boolean);
  }

  _serialize(tags) {
    return (tags || []).join(",");
  }

  _maxCount() {
    const m = parseInt(this.getAttribute("max"), 10);
    return Number.isFinite(m) && m >= 0 ? m : Infinity;
  }

  _esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/"/g, "&quot;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  _onInput() {
    // Treat a typed comma as a delimiter: commit whatever precedes it.
    const v = this._entry.value;
    if (v.includes(",")) {
      const parts = v.split(",");
      const tail = parts.pop();
      parts.forEach((p) => this._add(p));
      this._entry.value = tail;
    }
  }

  _onKeydown(e) {
    if (this.hasAttribute("disabled")) return;
    if (e.key === "Enter") {
      e.preventDefault();
      this._add(this._entry.value);
      this._entry.value = "";
    } else if (e.key === "Backspace" && this._entry.value === "") {
      if ((this._tags || []).length) {
        e.preventDefault();
        this._removeAt(this._tags.length - 1);
      }
    }
  }

  _add(raw) {
    if (this.hasAttribute("disabled")) return false;
    const tag = String(raw).trim();
    if (!tag) return false;
    if (this._tags.includes(tag)) return false; // no duplicates
    if (this._tags.length >= this._maxCount()) return false; // at the cap
    this._tags.push(tag);
    this._renderChips();
    this._reflect();
    this._emit();
    return true;
  }

  _removeAt(idx) {
    if (idx < 0 || idx >= this._tags.length) return;
    this._tags.splice(idx, 1);
    this._renderChips();
    this._reflect();
    this._emit();
  }

  _removeValue(tag) {
    const idx = this._tags.indexOf(String(tag).trim());
    if (idx >= 0) this._removeAt(idx);
  }

  _renderChips() {
    const tags = this._tags || [];
    this._list.innerHTML = tags
      .map((tag, i) =>
        `<li class="chip" part="chip" role="listitem" data-tag="${this._esc(tag)}">
           <span class="chip-label" part="chip-label">${this._esc(tag)}</span>
           <button class="remove" part="chip-remove" type="button" tabindex="-1"
             data-index="${i}" aria-label="${this._esc(t("tag-input.remove", { tag: tag }))}">
             <svg viewBox="0 0 24 24" aria-hidden="true">
               <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round"/>
             </svg>
           </button>
         </li>`
      )
      .join("");
  }

  // Mirror current state to the host: value attr + machine-readable data-*.
  _reflect() {
    const serialized = this._serialize(this._tags);
    if (this.getAttribute("value") !== serialized) {
      this.setAttribute("value", serialized);
    }
    this.setAttribute("data-tags", JSON.stringify(this._tags || []));
    this.setAttribute("data-count", String((this._tags || []).length));
    const max = this._maxCount();
    if (max === Infinity) this.removeAttribute("data-max");
    else this.setAttribute("data-max", String(max));
    // Block the entry when the cap is reached.
    if (this._entry) {
      const full = (this._tags || []).length >= max;
      this._entry.toggleAttribute("readonly", full && !this.hasAttribute("disabled"));
      this._entry.setAttribute("aria-disabled", full ? "true" : "false");
    }
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("change", {
      detail: { tags: this.value },
      bubbles: true,
    }));
  }
}

define("pura-tag-input", PuraTagInput, meta);
export { PuraTagInput };

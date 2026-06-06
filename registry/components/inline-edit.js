// <pura-inline-edit> click-to-edit text. Shows a read-only value that swaps
// into an input/textarea in place on click (or focus+Enter), with confirm and
// cancel buttons. Escape cancels, Enter (or check) confirms, blur can confirm
// when [submit-on-blur] is set.
// Attributes: value, placeholder, multiline (textarea), disabled, editing (bool
//   state control), submit-on-blur.
// Parts: value, input, confirm, cancel.
// Events: change { value } on confirm only; cancel on cancel.
import { PuraElement, define } from "../base.js";
import meta from "./inline-edit.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "inline-edit.edit": {
    en: "Edit",
    "pt-BR": "Editar",
    fr: "Modifier",
    de: "Bearbeiten",
    it: "Modifica",
  },
  "inline-edit.confirm": {
    en: "Confirm",
    "pt-BR": "Confirmar",
    fr: "Confirmer",
    de: "Bestätigen",
    it: "Conferma",
  },
  "inline-edit.cancel": {
    en: "Cancel",
    "pt-BR": "Cancelar",
    fr: "Annuler",
    de: "Abbrechen",
    it: "Annulla",
  },
  "inline-edit.empty": {
    en: "Empty",
    "pt-BR": "Vazio",
    fr: "Vide",
    de: "Leer",
    it: "Vuoto",
  },
});

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
const XICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
const PENCIL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;

class PuraInlineEdit extends PuraElement {
  static observedAttributes = ["value", "placeholder", "multiline", "disabled", "editing"];

  connectedCallback() {
    this._value = this.getAttribute("value") || "";
    this._editing = this.hasAttribute("editing");
    this._renderAll();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, value) {
    if (!this.isConnected) return;
    if (name === "value") {
      const v = value || "";
      if (v !== this._value) {
        this._value = v;
        if (!this._editing) this._renderAll();
      }
      return;
    }
    if (name === "editing") {
      const want = this.hasAttribute("editing");
      if (want !== this._editing) {
        this._editing = want;
        this._renderAll();
      }
      return;
    }
    // placeholder / multiline / disabled need a re-render
    this._renderAll();
  }

  _renderAll() {
    const multiline = this.bool("multiline");
    const tag = multiline ? "textarea" : "input";
    const ph = this.getAttribute("placeholder") || "";
    const disabled = this.bool("disabled");
    const display = this._value || ph || t("inline-edit.empty");

    if (this._editing && !disabled) {
      this.render(
        `<div class="edit">
           <${tag} class="field" part="input" placeholder="${esc(ph)}"
             ${multiline ? "rows=\"2\"" : "type=\"text\""}></${tag}>
           <div class="actions">
             <button type="button" class="btn confirm" part="confirm" aria-label="${t("inline-edit.confirm")}">${CHECK}</button>
             <button type="button" class="btn cancel" part="cancel" aria-label="${t("inline-edit.cancel")}">${XICON}</button>
           </div>
         </div>`,
        CSS
      );
      this._field = this.$(".field");
      this._field.value = this._value;
      this.$(".confirm").addEventListener("click", () => this._confirm());
      this.$(".cancel").addEventListener("click", () => this._cancel());
      this._field.addEventListener("keydown", (e) => this._onFieldKeydown(e));
      if (this.bool("submit-on-blur")) {
        this._field.addEventListener("blur", (e) => {
          // Ignore blur caused by clicking confirm/cancel.
          if (this.shadowRoot.contains(e.relatedTarget)) return;
          this._confirm();
        });
      }
      requestAnimationFrame(() => {
        this._field?.focus();
        try { this._field?.select?.(); } catch {}
      });
    } else {
      const empty = !this._value;
      this.render(
        `<button type="button" class="view ${empty ? "is-empty" : ""}" part="value"
           ${disabled ? "disabled" : ""} aria-label="${t("inline-edit.edit")}">
           <span class="text">${esc(display)}</span>
           <span class="pencil" aria-hidden="true">${PENCIL}</span>
         </button>`,
        CSS
      );
      const view = this.$(".view");
      view.addEventListener("click", () => this._startEdit());
      view.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this._startEdit();
        }
      });
    }
  }

  _applyI18n() {
    // Re-render to refresh labels/empty text in place.
    this._renderAll();
  }

  _startEdit() {
    if (this.bool("disabled") || this._editing) return;
    this._editing = true;
    this.setAttribute("editing", "");
    this._renderAll();
  }

  _onFieldKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      this._cancel();
    } else if (e.key === "Enter" && !this.bool("multiline")) {
      e.preventDefault();
      this._confirm();
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this._confirm();
    }
  }

  _confirm() {
    if (!this._editing) return;
    const next = this._field ? this._field.value : this._value;
    this._value = next;
    this.setAttribute("value", next);
    this._editing = false;
    this.removeAttribute("editing");
    this._renderAll();
    this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: next } }));
  }

  _cancel() {
    if (!this._editing) return;
    this._editing = false;
    this.removeAttribute("editing");
    this._renderAll();
    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true }));
  }

  get value() { return this._value; }
  set value(v) {
    const s = v == null ? "" : String(v);
    this._value = s;
    this.setAttribute("value", s);
    if (!this._editing) this._renderAll();
    else if (this._field) this._field.value = s;
  }
}

// Escape text for safe insertion into markup.
function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const CSS = `
  :host { display: inline-block; max-width: 100%; }
  :host([disabled]) { opacity: 0.55; }

  .view {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: transparent; cursor: text; text-align: left;
    border: 1px solid transparent; border-radius: var(--pura-radius);
    padding: var(--pura-space-1) var(--pura-space-2); max-width: 100%;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .view:hover { background: var(--pura-subtle); border-color: var(--pura-border); }
  .view:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .view:disabled { cursor: not-allowed; }
  .view.is-empty .text { color: var(--pura-muted); font-style: italic; }
  .text { overflow: hidden; text-overflow: ellipsis; white-space: pre-wrap; }

  .pencil {
    display: inline-flex; flex: none; opacity: 0;
    transition: opacity var(--pura-dur) var(--pura-ease);
  }
  .pencil svg { width: 0.9rem; height: 0.9rem; }
  .view:hover .pencil, .view:focus-visible .pencil { opacity: 0.6; }

  .edit { display: inline-flex; align-items: flex-start; gap: var(--pura-space-2); max-width: 100%; }
  .field {
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: var(--pura-bg); resize: vertical;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-1) var(--pura-space-2); min-height: 2.25rem;
  }
  textarea.field { min-width: 14rem; }
  .field::placeholder { color: var(--pura-muted); }
  .field:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .actions { display: inline-flex; gap: var(--pura-space-1); }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.875rem; height: 1.875rem; padding: 0; cursor: pointer;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .btn svg { width: 1rem; height: 1rem; }
  .btn:hover { background: var(--pura-subtle); }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .confirm { color: var(--pura-success-fg); }
  .cancel { color: var(--pura-muted-fg); }
`;

define("pura-inline-edit", PuraInlineEdit, meta);
export { PuraInlineEdit };

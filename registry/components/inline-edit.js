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
import { inlineEditTemplate } from "./inline-edit.template.js";

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
    const { html, css } = inlineEditTemplate(this);
    this.render(html, css);

    const disabled = this.bool("disabled");
    if (this._editing && !disabled) {
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

define("pura-inline-edit", PuraInlineEdit, meta);
export { PuraInlineEdit };

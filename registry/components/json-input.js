// <pura-json-input>. A textarea specialized for JSON. It validates on blur, shows
// an error state with the parse message when invalid, and can pretty-print valid
// JSON. The `json` getter returns the parsed object, or undefined when the
// current text is not valid JSON. A small Format button pretty-prints on demand.
//
// Attributes:
//   value           the JSON string.
//   placeholder     textarea placeholder.
//   rows            textarea rows (default 6).
//   format-on-blur  boolean, pretty-print valid JSON on blur.
//   disabled        block editing.
//   label           field label.
//   indent          spaces used when pretty-printing (default 2).
//
// Events:
//   input   CustomEvent({ detail: { value, valid } }) on every keystroke.
//   change  CustomEvent({ detail: { value, valid } }) on blur.
//
// Parts: label, textarea, error, format
import { PuraElement, define } from "../base.js";
import meta from "./json-input.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "json-input.invalid": {
    en: "Invalid JSON",
    "pt-BR": "JSON inválido",
    fr: "JSON invalide",
    de: "Ungültiges JSON",
    it: "JSON non valido",
  },
  "json-input.format": {
    en: "Format",
    "pt-BR": "Formatar",
    fr: "Formater",
    de: "Formatieren",
    it: "Formatta",
  },
});

class PuraJsonInput extends PuraElement {
  static observedAttributes = ["value", "placeholder", "rows", "disabled", "label", "indent", "format-on-blur"];

  connectedCallback() {
    const label = this.getAttribute("label");
    this.render(
      `${label ? `<label part="label" for="t">${this._esc(label)}</label>` : ""}
       <div class="field">
         <textarea id="t" part="textarea" rows="${this.getAttribute("rows") || 6}"
           placeholder="${this._esc(this.getAttribute("placeholder") || "")}"
           ${this.hasAttribute("disabled") ? "disabled" : ""}
           aria-invalid="false"
           aria-describedby="err"></textarea>
         <button class="format" part="format" type="button"
           ${this.hasAttribute("disabled") ? "disabled" : ""}>${this._esc(t("json-input.format"))}</button>
       </div>
       <small id="err" part="error" class="error" role="alert"></small>`,
      CSS
    );

    this._ta = this.$("textarea");
    this._err = this.$(".error");
    this._formatBtn = this.$(".format");

    if (this.hasAttribute("value")) this._ta.value = this.getAttribute("value");

    this._onInput = () => {
      this.setAttribute("value", this._ta.value);
      this.dispatchEvent(new CustomEvent("input", {
        detail: { value: this._ta.value, valid: this._isValid(this._ta.value) },
        bubbles: true,
      }));
    };
    this._onBlur = () => this._validateAndMaybeFormat();
    this._onFormat = () => this.format();

    this._ta.addEventListener("input", this._onInput);
    this._ta.addEventListener("blur", this._onBlur);
    this._formatBtn.addEventListener("click", this._onFormat);

    if (!this._i18nOff) this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
    this._i18nOff = null;
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._ta) return;
    if (name === "value" && val !== null && val !== this._ta.value) {
      this._ta.value = val;
      this._setInvalid(false);
    } else if (name === "placeholder") {
      this._ta.placeholder = val || "";
    } else if (name === "rows") {
      this._ta.rows = val || 6;
    } else if (name === "disabled") {
      const d = this.hasAttribute("disabled");
      this._ta.disabled = d;
      this._formatBtn.disabled = d;
    } else if (name === "label") {
      this.connectedCallback();
    }
  }

  _applyI18n() {
    if (this._formatBtn) this._formatBtn.textContent = t("json-input.format");
    // Refresh a shown error message in the new locale.
    if (this._invalid && this._err) this._err.textContent = `${t("json-input.invalid")}: ${this._lastError}`;
  }

  _isValid(s) {
    const text = (s ?? "").trim();
    if (!text) return true; // empty is treated as valid (no JSON yet)
    try { JSON.parse(text); return true; } catch (_) { return false; }
  }

  _parse(s) {
    const text = (s ?? "").trim();
    if (!text) return { ok: true, value: undefined };
    try { return { ok: true, value: JSON.parse(text) }; }
    catch (e) { return { ok: false, error: e }; }
  }

  _validateAndMaybeFormat() {
    const res = this._parse(this._ta.value);
    if (!res.ok) {
      this._lastError = res.error?.message ?? String(res.error);
      this._setInvalid(true);
    } else {
      this._setInvalid(false);
      if (this.hasAttribute("format-on-blur") && this._ta.value.trim() && res.value !== undefined) {
        this._ta.value = JSON.stringify(res.value, null, this._indent());
        this.setAttribute("value", this._ta.value);
      }
    }
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this._ta.value, valid: res.ok },
      bubbles: true,
    }));
  }

  _setInvalid(invalid) {
    this._invalid = invalid;
    if (invalid) this.setAttribute("invalid", "");
    else this.removeAttribute("invalid");
    if (this._ta) this._ta.setAttribute("aria-invalid", invalid ? "true" : "false");
    if (this._err) {
      this._err.textContent = invalid ? `${t("json-input.invalid")}: ${this._lastError}` : "";
    }
  }

  _indent() {
    const n = parseInt(this.getAttribute("indent") ?? "2", 10);
    return Number.isFinite(n) ? n : 2;
  }

  // Pretty-print the current value when it is valid JSON. No-op otherwise (the
  // invalid state is shown instead).
  format() {
    const res = this._parse(this._ta.value);
    if (!res.ok) {
      this._lastError = res.error?.message ?? String(res.error);
      this._setInvalid(true);
      return false;
    }
    this._setInvalid(false);
    if (res.value !== undefined) {
      this._ta.value = JSON.stringify(res.value, null, this._indent());
      this.setAttribute("value", this._ta.value);
    }
    return true;
  }

  get value() { return this._ta?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    const next = v == null ? "" : String(v);
    this.setAttribute("value", next);
    if (this._ta) {
      this._ta.value = next;
      this._setInvalid(false);
    }
  }

  // The parsed object, or undefined when the text is not valid JSON (or empty).
  get json() {
    const res = this._parse(this.value);
    return res.ok ? res.value : undefined;
  }

  _esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

const CSS = `
  :host { display: block; }

  label {
    display: block; font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-2);
  }

  .field { position: relative; }

  textarea {
    width: 100%; font-family: var(--pura-font-mono); font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg); resize: vertical;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-3); min-height: 6rem; line-height: 1.55;
    box-shadow: var(--pura-shadow-sm); tab-size: 2;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  textarea::placeholder { color: var(--pura-muted); }
  textarea:hover { border-color: var(--pura-fg); }
  textarea:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  textarea:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }

  :host([invalid]) textarea {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }

  .format {
    position: absolute; top: var(--pura-space-2); right: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-xs); font-weight: 550;
    line-height: 1; cursor: pointer;
    color: var(--pura-muted-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: 0.3rem var(--pura-space-2);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .format:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .format:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .format:disabled { opacity: 0.55; cursor: not-allowed; }

  .error {
    display: none; margin-top: var(--pura-space-2);
    font-size: var(--pura-text-xs); color: var(--pura-danger);
    font-family: var(--pura-font-mono);
  }
  :host([invalid]) .error { display: block; }
`;

define("pura-json-input", PuraJsonInput, meta);
export { PuraJsonInput };

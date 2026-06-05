// <pura-input-otp> — one-time-code input. Attributes: length (default 6),
// value, disabled, invalid, alphanumeric, mono. Renders `length` single-char
// boxes; typing auto-advances, Backspace clears+retreats, arrows move, paste
// fills across. Mirrors combined value to the host attribute. Emits 'input' on
// every change and 'complete' once every box is filled.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "input-otp.group": {
    en: "One-time code",
    "pt-BR": "Código de uso único",
    fr: "Code à usage unique",
    de: "Einmalcode",
    it: "Codice monouso",
  },
  "input-otp.digit": {
    en: "Digit {n} of {total}",
    "pt-BR": "Dígito {n} de {total}",
    fr: "Chiffre {n} sur {total}",
    de: "Ziffer {n} von {total}",
    it: "Cifra {n} di {total}",
  },
});

class PuraInputOtp extends PuraElement {
  static observedAttributes = ["length", "value", "disabled", "invalid", "alphanumeric", "mono"];

  connectedCallback() {
    this._len = this._length();
    this.render(
      `<div part="root" role="group" aria-label="${t("input-otp.group")}">
         ${Array.from({ length: this._len }, (_, i) => this._slot(i)).join("")}
       </div>`,
      CSS
    );
    this._root = this.$("[part=\"root\"]");
    this._inputs = this.$$("input");
    this._inputs.forEach((input, i) => {
      input.addEventListener("input", (e) => this._onInput(e, i));
      input.addEventListener("keydown", (e) => this._onKeydown(e, i));
      input.addEventListener("paste", (e) => this._onPaste(e, i));
      input.addEventListener("focus", () => input.select());
    });
    this._setValue(this.getAttribute("value") || "", false);
    if (!this._i18nOff) this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
    this._i18nOff = null;
  }

  _applyI18n() {
    if (this._root) this._root.setAttribute("aria-label", t("input-otp.group"));
    if (this._inputs) {
      this._inputs.forEach((el, i) => {
        el.setAttribute("aria-label", t("input-otp.digit", { n: i + 1, total: this._len }));
      });
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this._inputs) return;
    if (name === "length" && this._length() !== this._len) {
      // Re-render from scratch when the box count changes.
      this.connectedCallback();
      return;
    }
    if (name === "value" && newVal !== this._joined()) {
      this._setValue(newVal || "", false);
    }
    if (name === "disabled" || name === "invalid") this._sync();
  }

  _length() {
    const n = parseInt(this.getAttribute("length"), 10);
    return Number.isFinite(n) && n > 0 ? n : 6;
  }

  _slot(i) {
    return `<input part="slot" type="text" inputmode="${this.hasAttribute("alphanumeric") ? "text" : "numeric"}"
      autocomplete="${i === 0 ? "one-time-code" : "off"}" maxlength="1"
      aria-label="${t("input-otp.digit", { n: i + 1, total: this._len })}"
      ${this.hasAttribute("disabled") ? "disabled" : ""}
      ${this.hasAttribute("invalid") ? 'aria-invalid="true"' : ""} />`;
  }

  _filter(str) {
    const re = this.hasAttribute("alphanumeric") ? /[^0-9a-zA-Z]/g : /[^0-9]/g;
    return (str || "").replace(re, "");
  }

  _onInput(e, i) {
    const raw = this._filter(e.target.value);
    if (!raw) { e.target.value = ""; this._commit(); return; }
    // First char stays here; overflow spills into following boxes.
    e.target.value = raw[0];
    let next = i + 1;
    for (let k = 1; k < raw.length && next < this._len; k++, next++) {
      this._inputs[next].value = raw[k];
    }
    this._focus(Math.min(next, this._len - 1));
    this._commit();
  }

  _onKeydown(e, i) {
    switch (e.key) {
      case "Backspace":
        if (e.target.value) {
          e.target.value = "";
          this._commit();
        } else if (i > 0) {
          e.preventDefault();
          this._inputs[i - 1].value = "";
          this._focus(i - 1);
          this._commit();
        }
        break;
      case "Delete":
        e.target.value = "";
        this._commit();
        break;
      case "ArrowLeft":
        if (i > 0) { e.preventDefault(); this._focus(i - 1); }
        break;
      case "ArrowRight":
        if (i < this._len - 1) { e.preventDefault(); this._focus(i + 1); }
        break;
      case "Home":
        e.preventDefault(); this._focus(0);
        break;
      case "End":
        e.preventDefault(); this._focus(this._len - 1);
        break;
    }
  }

  _onPaste(e, i) {
    e.preventDefault();
    const data = this._filter((e.clipboardData || window.clipboardData).getData("text"));
    if (!data) return;
    let pos = i;
    for (let k = 0; k < data.length && pos < this._len; k++, pos++) {
      this._inputs[pos].value = data[k];
    }
    this._focus(Math.min(pos, this._len - 1));
    this._commit();
  }

  _focus(i) {
    const input = this._inputs[i];
    if (input) { input.focus(); input.select(); }
  }

  _joined() {
    return this._inputs.map((el) => el.value).join("");
  }

  // Apply a string into the boxes without firing events (used by setter/attr).
  _setValue(str, emit) {
    const chars = this._filter(str).slice(0, this._len);
    this._inputs.forEach((el, i) => { el.value = chars[i] || ""; });
    if (emit) this._commit();
    else this._reflect();
  }

  _reflect() {
    const val = this._joined();
    if (this.getAttribute("value") !== val) this.setAttribute("value", val);
  }

  // After any user edit: reflect, emit input, and emit complete when full.
  _commit() {
    const val = this._joined();
    this._reflect();
    this.dispatchEvent(new CustomEvent("input", { detail: { value: val }, bubbles: true }));
    if (val.length === this._len && this._inputs.every((el) => el.value)) {
      this.dispatchEvent(new CustomEvent("complete", { detail: { value: val }, bubbles: true }));
    }
  }

  _sync() {
    const disabled = this.hasAttribute("disabled");
    const invalid = this.hasAttribute("invalid");
    this._inputs.forEach((el) => {
      el.disabled = disabled;
      if (invalid) el.setAttribute("aria-invalid", "true");
      else el.removeAttribute("aria-invalid");
    });
  }

  get value() { return this._inputs ? this._joined() : (this.getAttribute("value") || ""); }
  set value(v) {
    if (this._inputs) this._setValue(v ?? "", false);
    else this.setAttribute("value", v ?? "");
  }

  focus() { this._focus(0); }
}

const CSS = `
  :host { display: inline-block; }
  [part="root"] {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
  }
  input {
    width: 2.5rem; height: 2.75rem; padding: 0;
    font: inherit; font-size: var(--pura-text-lg); font-weight: 550;
    text-align: center; color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  :host([mono]) input { font-family: var(--pura-font-mono); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
    z-index: 1;
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  :host([invalid]) input {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
`;

define("pura-input-otp", PuraInputOtp);
export { PuraInputOtp };

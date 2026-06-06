// pura-password-input, a password field with a show/hide reveal toggle and an
// optional strength meter. Attributes: value, placeholder, disabled, meter
// (bool), name. Dispatches "input". Parts: input, toggle, meter, label.
import { PuraElement, define } from "../base.js";
import meta from "./password-input.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "password.show": {
    en: "Show password",
    "pt-BR": "Mostrar senha",
    fr: "Afficher le mot de passe",
    de: "Passwort anzeigen",
    it: "Mostra password",
  },
  "password.hide": {
    en: "Hide password",
    "pt-BR": "Ocultar senha",
    fr: "Masquer le mot de passe",
    de: "Passwort verbergen",
    it: "Nascondi password",
  },
  "password.weak": {
    en: "Weak", "pt-BR": "Fraca", fr: "Faible", de: "Schwach", it: "Debole",
  },
  "password.fair": {
    en: "Fair", "pt-BR": "Razoável", fr: "Moyen", de: "Mittel", it: "Discreta",
  },
  "password.good": {
    en: "Good", "pt-BR": "Boa", fr: "Bon", de: "Gut", it: "Buona",
  },
  "password.strong": {
    en: "Strong", "pt-BR": "Forte", fr: "Fort", de: "Stark", it: "Forte",
  },
});

const EYE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
const EYE_OFF = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.6A10 10 0 0 1 12 4.4c6.5 0 10 7 10 7a18.3 18.3 0 0 1-3.3 4M6.6 6.6A18 18 0 0 0 2 11.4s3.5 7 10 7a9.7 9.7 0 0 0 4-.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

class PuraPasswordInput extends PuraElement {
  static observedAttributes = ["value", "placeholder", "disabled", "meter", "name"];

  connectedCallback() {
    const meter = this.hasAttribute("meter");
    this.render(
      `<div class="wrap">
         <input part="input" type="password"
           placeholder="${this.getAttribute("placeholder") || ""}"
           ${this.hasAttribute("disabled") ? "disabled" : ""}
           value="${this.getAttribute("value") || ""}" />
         <button class="toggle" part="toggle" type="button" tabindex="0"
           aria-label="${t("password.show")}" aria-pressed="false">${EYE}</button>
       </div>
       <div class="meter" part="meter" ${meter ? "" : "hidden"} aria-hidden="${meter ? "false" : "true"}>
         <span class="seg"></span><span class="seg"></span><span class="seg"></span><span class="seg"></span>
       </div>
       <small class="label" part="label" ${meter ? "" : "hidden"}></small>`,
      CSS
    );

    this._input = this.$("input");
    this._toggle = this.$(".toggle");
    this._meter = this.$(".meter");
    this._label = this.$(".label");
    this._segs = this.$$(".seg");
    this._shown = false;

    const name = this.getAttribute("name");
    if (name) this._input.setAttribute("name", name);

    this._input.addEventListener("input", () => {
      this.setAttribute("value", this._input.value);
      this._updateMeter();
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._input.value }, bubbles: true }));
    });

    this._toggle.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this._shown = !this._shown;
      this._input.type = this._shown ? "text" : "password";
      this._toggle.innerHTML = this._shown ? EYE_OFF : EYE;
      this._toggle.setAttribute("aria-pressed", this._shown ? "true" : "false");
      this._toggle.setAttribute("aria-label", t(this._shown ? "password.hide" : "password.show"));
      this._input.focus();
    });

    this._updateMeter();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._input) return;
    if (name === "value") {
      if (this._input.value !== (val || "")) this._input.value = val || "";
      this._updateMeter();
    } else if (name === "placeholder") {
      this._input.placeholder = val || "";
    } else if (name === "disabled") {
      this._input.disabled = this.hasAttribute("disabled");
    } else if (name === "meter") {
      const on = this.hasAttribute("meter");
      this._meter.hidden = !on;
      this._meter.setAttribute("aria-hidden", on ? "false" : "true");
      this._label.hidden = !on;
      this._updateMeter();
    } else if (name === "name") {
      if (val === null) this._input.removeAttribute("name");
      else this._input.setAttribute("name", val);
    }
  }

  _applyI18n() {
    this._toggle.setAttribute("aria-label", t(this._shown ? "password.hide" : "password.show"));
    this._updateMeter();
  }

  // Simple score 0..4 from length and character class mix.
  _score(v) {
    if (!v) return 0;
    let classes = 0;
    if (/[a-z]/.test(v)) classes++;
    if (/[A-Z]/.test(v)) classes++;
    if (/\d/.test(v)) classes++;
    if (/[^A-Za-z0-9]/.test(v)) classes++;
    let s = 0;
    if (v.length >= 6) s++;
    if (v.length >= 10) s++;
    if (classes >= 2) s++;
    if (classes >= 3 && v.length >= 8) s++;
    return Math.max(1, Math.min(4, s));
  }

  _updateMeter() {
    if (!this.hasAttribute("meter") || !this._segs) return;
    const v = this._input ? this._input.value : "";
    const score = this._score(v);
    const colors = ["", "var(--pura-danger)", "var(--pura-warning)", "var(--pura-warning)", "var(--pura-success)"];
    const labels = ["", t("password.weak"), t("password.fair"), t("password.good"), t("password.strong")];
    this._segs.forEach((seg, i) => {
      const active = i < score;
      seg.style.background = active ? colors[score] : "var(--pura-subtle)";
    });
    this._label.textContent = v ? labels[score] : "";
    this._label.style.color = score ? colors[score] : "var(--pura-muted)";
  }

  get value() { return this._input?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    this.setAttribute("value", v ?? "");
    if (this._input) { this._input.value = v ?? ""; this._updateMeter(); }
  }
}

const CSS = `
  :host { display: block; }
  .wrap { position: relative; display: block; }
  input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 2.5rem 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  input::placeholder { color: var(--pura-muted); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  .toggle {
    position: absolute; top: 50%; right: var(--pura-space-2); transform: translateY(-50%);
    display: grid; place-items: center; width: 1.75rem; height: 1.75rem;
    border: none; background: transparent; color: var(--pura-muted);
    cursor: pointer; border-radius: var(--pura-radius-sm); padding: 0;
    transition: color var(--pura-dur) var(--pura-ease), background var(--pura-dur) var(--pura-ease);
  }
  .toggle:hover { color: var(--pura-fg); background: var(--pura-subtle); }
  .toggle:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .toggle svg { width: 1.1rem; height: 1.1rem; }
  .meter { display: flex; gap: var(--pura-space-1); margin-top: var(--pura-space-2); }
  .meter[hidden] { display: none; }
  .seg {
    flex: 1; height: 0.3rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .label {
    display: block; margin-top: var(--pura-space-1);
    font-size: var(--pura-text-xs); color: var(--pura-muted); font-weight: 550;
  }
  .label[hidden] { display: none; }
`;

define("pura-password-input", PuraPasswordInput, meta);
export { PuraPasswordInput };

// <pura-color-picker> — a swatch button showing the current color that opens a
// popover (native Popover API + CSS anchor positioning) with a preset palette
// grid, a native <input type="color">, and a hex text input.
// Attributes: value (hex, e.g. "#2563eb"; defaults to "#000000"), disabled,
//   label (accessible name for the swatch trigger; default "Choose color").
// Parts: swatch, panel, grid, swatch-option, native, hex, hex-field.
// Events: change { value } — fired on every committed color change. input { value }
//   — fired live while dragging the native picker.
// Agent-native: stable data-value / data-open on the host, role=listbox grid
//   with roving tabindex + aria-selected, ARIA on the trigger, and a global
//   window.__puraColorPickers registry of live instances.
import { PuraElement, define } from "../base.js";
import meta from "./color-picker.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { colorPickerTemplate } from "./color-picker.template.js";

registerMessages({
  "color-picker.dialog": {
    en: "Color picker",
    "pt-BR": "Seletor de cor",
    fr: "Sélecteur de couleur",
    de: "Farbwähler",
    it: "Selettore colore",
  },
  "color-picker.presets": {
    en: "Preset colors",
    "pt-BR": "Cores predefinidas",
    fr: "Couleurs prédéfinies",
    de: "Vordefinierte Farben",
    it: "Colori predefiniti",
  },
  "color-picker.custom-color": {
    en: "Custom color",
    "pt-BR": "Cor personalizada",
    fr: "Couleur personnalisée",
    de: "Benutzerdefinierte Farbe",
    it: "Colore personalizzato",
  },
  "color-picker.custom": {
    en: "Custom",
    "pt-BR": "Personalizada",
    fr: "Personnalisée",
    de: "Benutzerdefiniert",
    it: "Personalizzato",
  },
  "color-picker.hex": {
    en: "Hex color value",
    "pt-BR": "Valor hexadecimal da cor",
    fr: "Valeur hexadécimale de la couleur",
    de: "Hex-Farbwert",
    it: "Valore esadecimale del colore",
  },
  "color-picker.choose": {
    en: "Choose color",
    "pt-BR": "Escolher cor",
    fr: "Choisir une couleur",
    de: "Farbe wählen",
    it: "Scegli colore",
  },
});

let uid = 0;

const HEX_RE = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// Normalize any accepted hex form to lowercase #rrggbb. Returns null if invalid.
function normalizeHex(raw) {
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  if (!HEX_RE.test(v)) return null;
  let hex = v.replace(/^#/, "").toLowerCase();
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  return "#" + hex;
}

class PuraColorPicker extends PuraElement {
  static observedAttributes = ["value", "disabled", "label"];

  connectedCallback() {
    this._name = `--pura-color-${uid++}`;
    this._value = normalizeHex(this.getAttribute("value")) || "#000000";

    const { html, css } = colorPickerTemplate(this);
    this.render(html, css);

    this._trigger = this.$(".trigger");
    this._panel = this.$(".panel");
    this._grid = this.$(".grid");
    this._native = this.$(".native");
    this._nativeText = this.$(".native-text");
    this._hex = this.$(".hex");
    this._valText = this.$(".val");

    // Preset grid selection.
    this._grid.addEventListener("click", (e) => {
      const opt = e.target.closest(".opt");
      if (!opt) return;
      this._commit(opt.dataset.color, { close: true, focusBack: true });
    });
    this._grid.addEventListener("keydown", (e) => this._onGridKeydown(e));

    // Native picker: live input + committed change.
    this._native.addEventListener("input", () => {
      this._set(this._native.value);
      this.dispatchEvent(new CustomEvent("input", { bubbles: true, detail: { value: this._value } }));
    });
    this._native.addEventListener("change", () => this._commit(this._native.value));

    // Hex text input: commit on Enter or blur, revert if invalid.
    this._hex.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this._commitHex();
      }
    });
    this._hex.addEventListener("blur", () => this._commitHex());

    // Track popover open/close for ARIA + agent-native data-open + focus.
    this._panel.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      this.toggleAttribute("open", open);
      this.dataset.open = open ? "true" : "false";
      if (open) requestAnimationFrame(() => this._focusSelected());
    });

    this._syncDisabled();
    this._sync();

    // React to locale changes by updating text/aria in place (no re-render).
    this._i18nOff = onLocaleChange(() => this._applyI18n());

    // Lightweight global registry of live instances (never throws).
    try {
      (window.__puraColorPickers ||= new Set()).add(this);
    } catch {}
  }

  disconnectedCallback() {
    this._i18nOff?.();
    try {
      window.__puraColorPickers?.delete(this);
    } catch {}
  }

  // Update already-rendered i18n nodes in place when the locale changes.
  _applyI18n() {
    if (this._panel) this._panel.setAttribute("aria-label", t("color-picker.dialog"));
    if (this._grid) this._grid.setAttribute("aria-label", t("color-picker.presets"));
    if (this._native) this._native.setAttribute("aria-label", t("color-picker.custom-color"));
    if (this._nativeText) this._nativeText.textContent = t("color-picker.custom");
    if (this._hex) this._hex.setAttribute("aria-label", t("color-picker.hex"));
    // Re-apply trigger aria-label (falls back to the localized default).
    this._syncDisabled();
  }

  attributeChangedCallback(name, _old, value) {
    if (!this._trigger) return; // can fire before connect; degrade gracefully
    if (name === "disabled") {
      this._syncDisabled();
      return;
    }
    if (name === "value") {
      const next = normalizeHex(value) || "#000000";
      if (next !== this._value) {
        this._value = next;
        this._sync();
      }
    }
    if (name === "label") this._syncDisabled();
  }

  // --- value plumbing -------------------------------------------------------

  // Update internal value + visuals without emitting or re-rendering.
  _set(raw) {
    const next = normalizeHex(raw);
    if (!next) return false;
    this._value = next;
    if (this.getAttribute("value") !== next) this.setAttribute("value", next);
    this._sync();
    return true;
  }

  // Commit a value and emit change. Optionally close the panel.
  _commit(raw, { close = false, focusBack = false } = {}) {
    const before = this._value;
    if (!this._set(raw)) return;
    if (this._value !== before) {
      this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: this._value } }));
    }
    if (close) this._panel.hidePopover();
    if (focusBack) this._trigger.focus();
  }

  _commitHex() {
    const norm = normalizeHex(this._hex.value);
    if (norm) this._commit(norm);
    else this._hex.value = this._value.slice(1); // revert invalid input
  }

  // Reflect current value into every surface + agent-native data-*.
  _sync() {
    const v = this._value;
    this.dataset.value = v;
    if (this._valText) this._valText.textContent = v;
    const dot = this.$(".dot");
    if (dot) dot.style.background = v;
    if (this._native) this._native.value = v;
    if (this._hex && document.activeElement !== this._hex) this._hex.value = v.slice(1);
    // grid selection state
    this.$$(".opt").forEach((opt) => {
      const sel = opt.dataset.color.toLowerCase() === v;
      opt.setAttribute("aria-selected", sel ? "true" : "false");
      opt.tabIndex = sel ? 0 : -1;
    });
  }

  _syncDisabled() {
    const disabled = this.hasAttribute("disabled");
    if (this._trigger) {
      this._trigger.disabled = disabled;
      this._trigger.setAttribute(
        "aria-label",
        this.getAttribute("label") || t("color-picker.choose")
      );
    }
    this.dataset.disabled = disabled ? "true" : "false";
  }

  // --- grid keyboard --------------------------------------------------------

  _opts() {
    return this.$$(".opt");
  }

  _focusSelected() {
    const opts = this._opts();
    const sel = opts.find((o) => o.getAttribute("aria-selected") === "true");
    (sel || opts[0])?.focus();
  }

  _focusAt(index) {
    const opts = this._opts();
    if (!opts.length) return;
    const i = (index + opts.length) % opts.length;
    opts.forEach((o, j) => (o.tabIndex = j === i ? 0 : -1));
    opts[i].focus();
  }

  _onGridKeydown(e) {
    const opts = this._opts();
    if (!opts.length) return;
    const cur = opts.indexOf(document.activeElement);
    const cols = COLS;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur + cols);
        break;
      case "ArrowUp":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur - cols);
        break;
      case "Home":
        e.preventDefault();
        this._focusAt(0);
        break;
      case "End":
        e.preventDefault();
        this._focusAt(opts.length - 1);
        break;
      case "Enter":
      case " ":
        if (cur >= 0) {
          e.preventDefault();
          this._commit(opts[cur].dataset.color, { close: true, focusBack: true });
        }
        break;
    }
  }

  // --- public API -----------------------------------------------------------

  get value() {
    return this._value;
  }

  set value(v) {
    this._commit(v);
  }

  show() {
    this._panel?.showPopover();
  }

  hide() {
    this._panel?.hidePopover();
  }
}

const COLS = 6;

define("pura-color-picker", PuraColorPicker, meta);
export { PuraColorPicker };

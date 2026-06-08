// pura-search-field, a search input with a leading magnifier icon and a
// trailing clear button that appears when there is text. Debounces a "search"
// event (attr debounce ms, default 250); fires immediately on Enter and clear.
// Attributes: value, placeholder, disabled, loading, debounce.
// Parts: input, icon, clear.
import { PuraElement, define } from "../base.js";
import meta from "./search-field.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { searchFieldTemplate } from "./search-field.template.js";

registerMessages({
  "search.placeholder": {
    en: "Search", "pt-BR": "Buscar", fr: "Rechercher", de: "Suchen", it: "Cerca",
  },
  "search.clear": {
    en: "Clear search",
    "pt-BR": "Limpar busca",
    fr: "Effacer la recherche",
    de: "Suche löschen",
    it: "Cancella ricerca",
  },
});

const MAGNIFIER = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

class PuraSearchField extends PuraElement {
  static observedAttributes = ["value", "placeholder", "disabled", "loading", "debounce"];

  connectedCallback() {
    const { html, css } = searchFieldTemplate(this);
    this.render(html, css);

    this._input = this.$("input");
    this._icon = this.$(".icon");
    this._clear = this.$(".clear");
    this._timer = null;

    this._syncClear();
    this._syncLoading();

    this._input.addEventListener("input", () => {
      this.setAttribute("value", this._input.value);
      this._syncClear();
      this._debouncedEmit();
    });

    this._input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this._cancelTimer();
        this._emit();
      }
    });

    this._clear.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this._cancelTimer();
      this._input.value = "";
      this.setAttribute("value", "");
      this._syncClear();
      this._input.focus();
      this._emit();
    });

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._cancelTimer();
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._input) return;
    if (name === "value") {
      if (this._input.value !== (val || "")) this._input.value = val || "";
      this._syncClear();
    } else if (name === "placeholder") {
      this._input.placeholder = val || t("search.placeholder");
    } else if (name === "disabled") {
      this._input.disabled = this.hasAttribute("disabled");
    } else if (name === "loading") {
      this._syncLoading();
    }
  }

  _applyI18n() {
    if (this._clear) this._clear.setAttribute("aria-label", t("search.clear"));
    if (this._input && !this.hasAttribute("placeholder")) {
      this._input.placeholder = t("search.placeholder");
    }
  }

  _syncClear() {
    if (this._clear) this._clear.hidden = !this._input.value;
  }

  _syncLoading() {
    if (!this._icon) return;
    if (this.hasAttribute("loading")) {
      this._icon.classList.add("spin");
      this._icon.innerHTML = "";
    } else {
      this._icon.classList.remove("spin");
      this._icon.innerHTML = MAGNIFIER;
    }
  }

  _debounceMs() {
    const n = Number(this.getAttribute("debounce"));
    return Number.isFinite(n) && n >= 0 ? n : 250;
  }

  _cancelTimer() {
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
  }

  _debouncedEmit() {
    this._cancelTimer();
    const ms = this._debounceMs();
    if (ms === 0) { this._emit(); return; }
    this._timer = setTimeout(() => { this._timer = null; this._emit(); }, ms);
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("search", { detail: { value: this._input.value }, bubbles: true }));
  }

  get value() { return this._input?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    this.setAttribute("value", v ?? "");
    if (this._input) { this._input.value = v ?? ""; this._syncClear(); }
  }
}


define("pura-search-field", PuraSearchField, meta);
export { PuraSearchField };

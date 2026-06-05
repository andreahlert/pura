// pura-search-field, a search input with a leading magnifier icon and a
// trailing clear button that appears when there is text. Debounces a "search"
// event (attr debounce ms, default 250); fires immediately on Enter and clear.
// Attributes: value, placeholder, disabled, loading, debounce.
// Parts: input, icon, clear.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

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
    const ph = this.getAttribute("placeholder") || t("search.placeholder");
    this.render(
      `<div class="wrap">
         <span class="icon" part="icon" aria-hidden="true">${MAGNIFIER}</span>
         <input part="input" type="search" autocomplete="off"
           placeholder="${ph}"
           ${this.hasAttribute("disabled") ? "disabled" : ""}
           value="${this.getAttribute("value") || ""}" />
         <button class="clear" part="clear" type="button" tabindex="0"
           aria-label="${t("search.clear")}" hidden>
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </button>
       </div>`,
      CSS
    );

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

const CSS = `
  :host { display: block; }
  .wrap { position: relative; display: block; }
  .icon {
    position: absolute; top: 50%; left: var(--pura-space-3); transform: translateY(-50%);
    display: grid; place-items: center; width: 1.1rem; height: 1.1rem;
    color: var(--pura-muted); pointer-events: none;
  }
  .icon svg { width: 1.1rem; height: 1.1rem; }
  .icon.spin {
    width: 0.95rem; height: 0.95rem; border-radius: 50%; box-sizing: border-box;
    border: 2px solid currentColor; border-right-color: transparent;
    color: var(--pura-muted); pointer-events: none;
    animation: pura-spin 0.6s linear infinite;
  }
  @keyframes pura-spin {
    from { transform: translateY(-50%) rotate(0); }
    to { transform: translateY(-50%) rotate(360deg); }
  }
  input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 2.25rem 0 2.25rem; height: 2.25rem;
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
    -webkit-appearance: none; appearance: none;
  }
  input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
  input::placeholder { color: var(--pura-muted); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  .clear {
    position: absolute; top: 50%; right: var(--pura-space-2); transform: translateY(-50%);
    display: grid; place-items: center; width: 1.6rem; height: 1.6rem;
    border: none; background: transparent; color: var(--pura-muted);
    cursor: pointer; border-radius: var(--pura-radius-full); padding: 0;
    transition: color var(--pura-dur) var(--pura-ease), background var(--pura-dur) var(--pura-ease);
  }
  .clear[hidden] { display: none; }
  .clear:hover { color: var(--pura-fg); background: var(--pura-subtle); }
  .clear:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .clear svg { width: 0.85rem; height: 0.85rem; }
`;

define("pura-search-field", PuraSearchField);
export { PuraSearchField };

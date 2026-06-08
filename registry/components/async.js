// <pura-async> — declarative async-state container. Renders exactly one of its
// slotted states based on the `state` attribute, so a view's loading / error /
// empty / ready phases are expressed in markup instead of imperative branching.
//
//   attrs:
//     state  idle (default) | loading | error | empty | ready
//            An unknown/missing value degrades to `idle` (renders nothing).
//   slots:
//     loading   shown while state="loading" (default: a spinner)
//     error     shown while state="error"
//     empty     shown while state="empty"
//     (default) the ready content, shown while state="ready"
//   events:
//     statechange  { detail: { state, previous } } — fired on every change.
//   methods:
//     setState(s)  validate + apply a state (the attribute is source of truth).
//
// Agent-native layer: while loading the region carries aria-busy="true"; every
// transition is announced through a dedicated visually-hidden aria-live status
// region (the content region itself is NOT a live region, to avoid re-reading
// swapped content). Each instance reflects a stable data-pura-id + data-state
// and registers in the global window.__puraAsync registry, so agents can read
// the current phase of any async region without walking the DOM.
import { PuraElement, define } from "../base.js";
import meta from "./async.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { asyncTemplate } from "./async.template.js";

registerMessages({
  "async.loading": {
    en: "Loading",
    "pt-BR": "Carregando",
    fr: "Chargement",
    de: "Wird geladen",
    it: "Caricamento",
  },
  "async.error": {
    en: "Failed to load",
    "pt-BR": "Erro ao carregar",
    fr: "Échec du chargement",
    de: "Laden fehlgeschlagen",
    it: "Caricamento non riuscito",
  },
  "async.empty": {
    en: "Nothing to show",
    "pt-BR": "Nada para mostrar",
    fr: "Rien à afficher",
    de: "Nichts anzuzeigen",
    it: "Niente da mostrare",
  },
  "async.ready": {
    en: "Content loaded",
    "pt-BR": "Conteúdo carregado",
    fr: "Contenu chargé",
    de: "Inhalt geladen",
    it: "Contenuto caricato",
  },
});

let uid = 0;

const STATES = new Set(["idle", "loading", "error", "empty", "ready"]);
const DEFAULT_STATE = "idle";

// Human/agent-readable announcement per state (sr-only live region text).
// idle has no announcement; the rest resolve through i18n at read time.
const LABELS = {
  idle: () => "",
  loading: () => t("async.loading"),
  error: () => t("async.error"),
  empty: () => t("async.empty"),
  ready: () => t("async.ready"),
};

// ---- global agent-native registry ----------------------------------------
const registry = (window.__puraAsync ||= {
  regions: {},
  // Current state of a region, by registry id or the element's own DOM id.
  state(id) {
    const el = this.regions[id] || Object.values(this.regions).find((e) => e.id === id);
    return el ? el.state : null;
  },
  // Serializable snapshot of every registered async region.
  snapshot() {
    return Object.entries(this.regions).map(([id, el]) => ({
      id,
      domId: el.id || null,
      state: el.state,
    }));
  },
  list() {
    return Object.keys(this.regions);
  },
});

class PuraAsync extends PuraElement {
  static observedAttributes = ["state"];

  connectedCallback() {
    this._pid = this._pid || `pura-async-${uid++}`;
    this.setAttribute("data-pura-id", this._pid);

    const { html, css } = asyncTemplate(this);
    this.render(html, css);

    this._region = this.$('[part="region"]');
    this._status = this.$('[part="status"]');

    registry.regions[this._pid] = this;
    this._sync();

    // React to locale changes by updating already-rendered nodes in place.
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry.regions[this._pid] === this) delete registry.regions[this._pid];
    this._i18nOff?.();
  }

  // Update the in-place i18n nodes (status live region + spinner aria-label)
  // for the current locale, without re-rendering or adding listeners.
  _applyI18n() {
    const spinner = this.$('[part="spinner"]');
    if (spinner) spinner.setAttribute("aria-label", LABELS.loading());
    // _sync() refreshes the status live-region text; it adds no listeners.
    this._sync();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._region) return; // guard until first render
    if (name === "state" && oldValue !== newValue) this._sync(oldValue);
  }

  // Current normalized state (unknown/missing -> default).
  _currentState() {
    const s = this.getAttribute("state");
    return STATES.has(s) ? s : DEFAULT_STATE;
  }

  // The reflected, normalized state.
  get state() {
    return this._currentState();
  }

  // setState(s) — validate against the allowed set and apply via the attribute,
  // which is the single source of truth (attributeChangedCallback does the rest).
  setState(s) {
    if (!STATES.has(s)) {
      throw new RangeError(
        `<pura-async>: invalid state "${s}". Expected one of: ${[...STATES].join(", ")}.`
      );
    }
    this.setAttribute("state", s);
    return this;
  }

  _sync(previous) {
    const state = this._currentState();
    // Keep host attribute normalized so CSS + agents see a known value.
    if (this.getAttribute("state") !== state && this.getAttribute("state") != null) {
      this.setAttribute("state", state);
    }
    this._region.setAttribute("data-state", state);
    this.setAttribute("aria-busy", state === "loading" ? "true" : "false");

    // Announce the transition via the dedicated sr-only live region.
    const label = (LABELS[state] || LABELS.idle)();
    if (this._status && this._status.textContent !== label) {
      this._status.textContent = label;
    }

    if (previous !== undefined && previous !== state) {
      this.dispatchEvent(
        new CustomEvent("statechange", {
          bubbles: true,
          detail: { state, previous: STATES.has(previous) ? previous : DEFAULT_STATE },
        })
      );
    }
  }
}

define("pura-async", PuraAsync, meta);
export { PuraAsync };

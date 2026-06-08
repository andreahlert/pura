// <pura-stepper> — horizontal (or vertical) step indicator. Numbered circles
// connected by lines: completed steps are filled + checked, the active step is
// highlighted, future steps are muted.
//
// Attributes:
//   steps        comma-separated labels, e.g. "Account, Shipping, Payment"
//   active       zero-based index of the current step (default 0)
//   orientation  horizontal (default) | vertical
//
// Parts: nav, list, step, marker, label, connector.
// Agent-native: host carries data-count / data-active; each step exposes
// data-index and data-state ("complete" | "current" | "upcoming"); ARIA uses an
// ordered list with aria-current="step" on the active item and per-step labels
// that spell out position + state for assistive tech.
import { PuraElement, define } from "../base.js";
import meta from "./stepper.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { stepperTemplate } from "./stepper.template.js";

registerMessages({
  "stepper.progress": {
    en: "Progress",
    "pt-BR": "Progresso",
    fr: "Progression",
    de: "Fortschritt",
    it: "Avanzamento",
  },
  "stepper.step": {
    en: "Step {n} of {total}: {label}, {state}",
    "pt-BR": "Etapa {n} de {total}: {label}, {state}",
    fr: "Étape {n} sur {total} : {label}, {state}",
    de: "Schritt {n} von {total}: {label}, {state}",
    it: "Passo {n} di {total}: {label}, {state}",
  },
  "stepper.completed": {
    en: "completed",
    "pt-BR": "concluída",
    fr: "terminée",
    de: "abgeschlossen",
    it: "completato",
  },
  "stepper.current": {
    en: "current",
    "pt-BR": "atual",
    fr: "en cours",
    de: "aktuell",
    it: "attuale",
  },
  "stepper.upcoming": {
    en: "upcoming",
    "pt-BR": "pendente",
    fr: "à venir",
    de: "ausstehend",
    it: "in arrivo",
  },
});

class PuraStepper extends PuraElement {
  static observedAttributes = ["steps", "active", "orientation"];

  connectedCallback() {
    this._render();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this._render();
  }

  // Translated state word for a step state.
  _stateLabel(state) {
    if (state === "complete") return t("stepper.completed");
    if (state === "current") return t("stepper.current");
    return t("stepper.upcoming");
  }

  // Update only the already-rendered i18n nodes in place (nav + per-step
  // aria-labels). No re-render, no new listeners.
  _applyI18n() {
    const nav = this.$('[part="nav"]');
    if (nav) {
      nav.setAttribute(
        "aria-label",
        this.getAttribute("aria-label") || t("stepper.progress")
      );
    }
    const steps = this.$$(".step");
    const total = steps.length;
    steps.forEach((li) => {
      const i = Number(li.getAttribute("data-index"));
      const state = li.getAttribute("data-state");
      const label = li.querySelector(".label")?.textContent || "";
      const aria = t("stepper.step", {
        n: i + 1,
        total,
        label,
        state: this._stateLabel(state),
      });
      li.setAttribute("aria-label", aria);
    });
  }

  // Parse the comma-separated steps attribute into trimmed, non-empty labels.
  get _labels() {
    return (this.getAttribute("steps") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  get active() {
    const n = Number(this.getAttribute("active"));
    return Number.isFinite(n) ? n : 0;
  }

  _render() {
    // machine-readable host attributes
    this.setAttribute("data-count", String(this._labels.length));
    this.setAttribute("data-active", String(this.active));

    const { html, css } = stepperTemplate(this);
    this.render(html, css);
  }
}

define("pura-stepper", PuraStepper, meta);
export { PuraStepper };

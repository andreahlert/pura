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

const CHECK =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" focusable="false"><path d="M3.5 8.5l3 3 6-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

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

  _stateFor(i) {
    if (i < this.active) return "complete";
    if (i === this.active) return "current";
    return "upcoming";
  }

  _render() {
    const labels = this._labels;
    const active = this.active;
    const orientation =
      this.getAttribute("orientation") === "vertical" ? "vertical" : "horizontal";

    // machine-readable host attributes
    this.setAttribute("data-count", String(labels.length));
    this.setAttribute("data-active", String(active));

    const items = labels
      .map((label, i) => {
        const state = this._stateFor(i);
        const marker =
          state === "complete"
            ? CHECK
            : `<span class="num" aria-hidden="true">${i + 1}</span>`;
        const aria = t("stepper.step", {
          n: i + 1,
          total: labels.length,
          label,
          state: this._stateLabel(state),
        });
        return `<li
            part="step"
            class="step"
            role="listitem"
            data-index="${i}"
            data-state="${state}"
            aria-label="${aria.replace(/"/g, "&quot;")}"
            ${state === "current" ? 'aria-current="step"' : ""}
          >
            ${i > 0 ? '<span part="connector" class="connector" aria-hidden="true"></span>' : ""}
            <span part="marker" class="marker">${marker}</span>
            <span part="label" class="label">${label}</span>
          </li>`;
      })
      .join("");

    this.render(
      `<nav part="nav" aria-label="${this.getAttribute("aria-label") || t("stepper.progress")}">
         <ol part="list" class="list" role="list" data-orientation="${orientation}">
           ${items}
         </ol>
       </nav>`,
      CSS
    );
  }
}

const CSS = `
  :host { display: block; }

  .list {
    list-style: none; margin: 0; padding: 0;
    display: flex; align-items: flex-start;
    color: var(--pura-fg);
  }
  .list[data-orientation="vertical"] { flex-direction: column; }

  .step {
    position: relative;
    display: flex; flex-direction: column; align-items: center;
    flex: 1 1 0; min-width: 0;
    gap: var(--pura-space-2);
    text-align: center;
  }
  .list[data-orientation="vertical"] .step {
    flex: 0 0 auto; align-self: stretch;
    flex-direction: row; align-items: flex-start;
    text-align: left; gap: var(--pura-space-3);
    padding-bottom: var(--pura-space-5);
  }
  .list[data-orientation="vertical"] .step:last-child { padding-bottom: 0; }

  /* connector line drawn from this step back toward the previous marker */
  .connector {
    position: absolute; background: var(--pura-border); z-index: 0;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  /* horizontal: line runs along the top row, centered on the marker height */
  .list[data-orientation="horizontal"] .connector {
    top: calc(var(--pura-space-6) / 2); height: 2px;
    right: 50%; left: -50%;
  }
  /* vertical: line runs down the marker column */
  .list[data-orientation="vertical"] .connector {
    left: calc(var(--pura-space-6) / 2); width: 2px;
    bottom: 100%; top: calc(-1 * var(--pura-space-5));
    transform: translateX(-50%);
  }
  /* completed + current steps carry a filled connector behind them */
  .step[data-state="complete"] .connector,
  .step[data-state="current"] .connector { background: var(--pura-primary); }

  .marker {
    position: relative; z-index: 1;
    flex: 0 0 auto;
    display: inline-flex; align-items: center; justify-content: center;
    width: var(--pura-space-6); height: var(--pura-space-6);
    border-radius: var(--pura-radius-full);
    border: 2px solid var(--pura-border);
    background: var(--pura-bg); color: var(--pura-muted);
    font-size: var(--pura-text-xs); font-weight: 600; line-height: 1;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .num { display: inline-block; }

  .step[data-state="complete"] .marker {
    background: var(--pura-primary); border-color: var(--pura-primary);
    color: var(--pura-primary-fg);
  }
  .step[data-state="current"] .marker {
    border-color: var(--pura-primary); color: var(--pura-fg);
    box-shadow: 0 0 0 4px var(--pura-ring);
  }
  .step[data-state="upcoming"] .marker {
    background: var(--pura-bg); border-color: var(--pura-border); color: var(--pura-muted);
  }

  .label {
    font-size: var(--pura-text-sm); line-height: 1.3;
    color: var(--pura-muted);
    transition: color var(--pura-dur) var(--pura-ease);
  }
  .step[data-state="complete"] .label,
  .step[data-state="current"] .label { color: var(--pura-fg); }
  .step[data-state="current"] .label { font-weight: 600; }

  .list[data-orientation="vertical"] .label { padding-top: 0.35rem; }
`;

define("pura-stepper", PuraStepper, meta);
export { PuraStepper };

// Pure render for <pura-stepper>. No DOM; SSR/DSD + client safe.
// Builds the ordered step list from the [steps] labels and [active] index; step
// labels are emitted verbatim (matching the component) and only the aria-label
// double-quotes are escaped. Under EMPTY_SHIM steps=[]/active=0, so an empty
// nav renders and the steps fill in when [steps] is present.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const CHECK =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" focusable="false"><path d="M3.5 8.5l3 3 6-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function labelsOf(el) {
  return (el.getAttribute("steps") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function activeOf(el) {
  const n = Number(el.getAttribute("active"));
  return Number.isFinite(n) ? n : 0;
}

function stateLabel(state) {
  if (state === "complete") return t("stepper.completed");
  if (state === "current") return t("stepper.current");
  return t("stepper.upcoming");
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

export function stepperTemplate(el = EMPTY_SHIM) {
  const labels = labelsOf(el);
  const active = activeOf(el);
  const orientation =
    el.getAttribute("orientation") === "vertical" ? "vertical" : "horizontal";

  const items = labels
    .map((label, i) => {
      const state = i < active ? "complete" : i === active ? "current" : "upcoming";
      const marker =
        state === "complete"
          ? CHECK
          : `<span class="num" aria-hidden="true">${i + 1}</span>`;
      const aria = t("stepper.step", {
        n: i + 1,
        total: labels.length,
        label,
        state: stateLabel(state),
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

  const html = `<nav part="nav" aria-label="${el.getAttribute("aria-label") || t("stepper.progress")}">
         <ol part="list" class="list" role="list" data-orientation="${orientation}">
           ${items}
         </ol>
       </nav>`;
  return { html, css: CSS };
}

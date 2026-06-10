// Pure render for <pura-dynamic-island>. No DOM; safe on server (SSR/DSD) and
// client. An iOS Dynamic Island style floating pill that morphs between named
// states (compact, expanded, player, timer, ...). Each state is a named slot
// rendered into its own pane; CSS keys visibility off the host's `state`
// attribute (pre-JS) or the JS-mirrored `data-pura-island-state` attribute, so
// the server paint already shows the right pane at its natural size. The size
// morph itself (FLIP + spring easing) and the content crossfade are progressive
// enhancement layered on by the element.
//
// SSR / pre-JS: the active state's pane renders inside a fully styled pill;
// switching `state` without JS still swaps panes (no animation).
// Reduced motion: the JS skips the morph, so this CSS is already the final state.
import { EMPTY_SHIM } from "../base.js";

// Parse the `states` attribute into a safe list of slot/state names.
// Deterministic, attribute-only; names are restricted to [a-z0-9-] so they can
// be embedded in selectors and part names.
export function parseIslandStates(raw) {
  const list = String(raw || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => /^[a-z0-9][a-z0-9-]*$/.test(s));
  return list.length ? [...new Set(list)] : ["compact", "expanded"];
}

export function dynamicIslandTemplate(el = EMPTY_SHIM) {
  const states = parseIslandStates(el.getAttribute("states"));
  const first = states[0];

  // One pane per state; the first pane also hosts the default slot so plain
  // children land in the initial (compact) state.
  const panes = states
    .map(
      (s, i) =>
        `<div class="pane" part="pane pane-${s}" data-state="${s}">` +
        `<slot name="${s}"></slot>${i === 0 ? `<slot></slot>` : ""}` +
        `</div>`,
    )
    .join("");

  const html = `<div class="island" part="island">${panes}</div>`;

  // Per-state rules: show the pane for the active state. Pre-JS the `state`
  // attribute drives it; once the element connects, `data-pura-island-state`
  // takes over (it lags the attribute by one measure during the FLIP).
  const stateRules = states
    .map(
      (s) => `
    :host([state="${s}"]:not([data-pura-island-state])) .pane[data-state="${s}"],
    :host([data-pura-island-state="${s}"]) .pane[data-state="${s}"] { display: flex; }
    :host([state="${s}"]:not([data-pura-island-state])) .island,
    :host([data-pura-island-state="${s}"]) .island {
      border-radius: var(--pura-dynamic-island-${s}-radius, var(--pura-dynamic-island-radius, 999px));
    }`,
    )
    .join("");

  const css = `
    :host { display: inline-block; }
    .island {
      position: relative;
      display: inline-flex;
      overflow: hidden;
      min-width: var(--pura-dynamic-island-min-width, 6rem);
      min-height: var(--pura-dynamic-island-min-height, 2.25rem);
      background: var(--pura-dynamic-island-bg, #0a0a0a);
      color: var(--pura-dynamic-island-fg, #fafafa);
      border-radius: var(--pura-dynamic-island-radius, 999px);
      box-shadow: var(--pura-dynamic-island-shadow, 0 10px 30px rgb(0 0 0 / 0.35));
    }
    .pane {
      display: none;
      align-items: center;
      justify-content: center;
      gap: var(--pura-dynamic-island-gap, 0.5rem);
      padding: var(--pura-dynamic-island-padding, 0.5rem 1rem);
      white-space: nowrap;
    }
    /* the outgoing pane is held absolutely while the JS fades it out */
    .pane[data-leaving] {
      display: flex;
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    /* no state attribute at all: the first declared state shows */
    :host(:not([state]):not([data-pura-island-state])) .pane[data-state="${first}"] { display: flex; }
    ${stateRules}
  `;

  return { html, css };
}

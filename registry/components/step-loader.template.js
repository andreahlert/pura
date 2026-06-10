// Pure render for <pura-step-loader>. No DOM; safe on server (SSR/DSD) and client.
// Builds the vertical checklist from the [steps] labels and the [step] index:
// every item is emitted up front with data-state="done" | "active" | "pending",
// so the SSR paint already shows the finished steps checked, the current one
// spinning (pure CSS animation) and the rest dimmed. The client never
// re-renders the list on advance; it only flips data-state, and CSS transitions
// plus stroke-dashoffset on the check path animate the change.
//
// Reduced motion: the spinner arc and rotation are gated behind
// (prefers-reduced-motion: no-preference); in reduce the active step shows a
// full static ring and the check draw collapses via the base reset.
import { EMPTY_SHIM } from "../base.js";

// One icon per step: a ring (pending outline / active spinner arc / done
// circle) plus a check path drawn via stroke-dashoffset when the step is done.
const ICON =
  '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<circle class="ring" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="check" d="M7 12.5l3.5 3.5 6.5-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
  "</svg>";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Labels come from [steps], split on "|" (or "," when no pipe is present, so
// short comma-separated lists also work). Shared with the component.
export function labelsOf(el) {
  const raw = el.getAttribute("steps") || "";
  const sep = raw.includes("|") ? "|" : ",";
  return raw
    .split(sep)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Current step index from [step], clamped to 0..count (count means all done).
export function stepOf(el, count) {
  const n = parseInt(el.getAttribute("step"), 10);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(n, count));
}

export function stepLoaderTemplate(el = EMPTY_SHIM) {
  const labels = labelsOf(el);
  const step = stepOf(el, labels.length);

  let items = "";
  for (let i = 0; i < labels.length; i++) {
    const state = i < step ? "done" : i === step ? "active" : "pending";
    const current = state === "active" ? ' aria-current="step"' : "";
    items +=
      `<li class="step" part="step" data-state="${state}"${current}>` +
      `<span class="icon" part="icon">${ICON}</span>` +
      `<span class="label" part="label">${esc(labels[i])}</span>` +
      `</li>`;
  }

  const live = step < labels.length ? esc(labels[step] || "") : "";
  const html =
    `<ol class="list" part="list">${items}</ol>` +
    `<span class="sr-live" aria-live="polite">${live}</span>` +
    `<slot></slot>`;

  return { html, css: STEP_LOADER_CSS };
}

export const STEP_LOADER_CSS = `
  :host {
    position: relative;
    display: block;
    color: var(--pura-step-loader-fg, var(--pura-fg, #18181b));
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--pura-step-loader-gap, 0.75rem);
  }

  .step {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transition: opacity 0.3s ease;
  }
  .step[data-state="pending"] { opacity: var(--pura-step-loader-pending-opacity, 0.4); }
  .step[data-state="done"] { opacity: var(--pura-step-loader-done-opacity, 0.75); }
  .step[data-state="active"] { opacity: 1; }

  .icon {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: var(--pura-step-loader-size, 22px);
    height: var(--pura-step-loader-size, 22px);
    color: var(--pura-step-loader-muted, var(--pura-muted-fg, #a1a1aa));
    transition: color 0.3s ease;
  }
  .step[data-state="active"] .icon {
    color: var(--pura-step-loader-active-color, var(--pura-accent, #6366f1));
  }
  .step[data-state="done"] .icon {
    color: var(--pura-step-loader-done-color, var(--pura-accent, #16a34a));
  }

  .icon-svg {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: 50% 50%;
  }

  /* check: drawn by sliding stroke-dashoffset to 0 when the step turns done
     (path length is about 15.3, so 16 covers it). The base reset collapses
     this transition under reduced motion. */
  .check {
    stroke-dasharray: 16;
    stroke-dashoffset: 16;
    transition: stroke-dashoffset var(--pura-step-loader-draw, 0.35s) ease 0.05s;
  }
  .step[data-state="done"] .check { stroke-dashoffset: 0; }

  /* spinner: the active ring becomes a rotating arc. Gated so reduced motion
     gets a full static ring in the active color instead. */
  @keyframes pura-step-loader-spin {
    to { transform: rotate(360deg); }
  }
  @media (prefers-reduced-motion: no-preference) {
    .step[data-state="active"] .ring { stroke-dasharray: 46 17; }
    .step[data-state="active"] .icon-svg {
      animation: pura-step-loader-spin 0.9s linear infinite;
    }
  }

  .label {
    font-size: var(--pura-step-loader-font-size, 0.95rem);
    line-height: 1.4;
    transition: color 0.3s ease;
  }
  .step[data-state="active"] .label {
    color: var(--pura-step-loader-active-color, var(--pura-accent, #6366f1));
  }

  .sr-live {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`;

// Pure render for <pura-tag>. No DOM; SSR/DSD + client safe.
// removable/disabled/dot derive from attributes; under EMPTY_SHIM none are set so
// the chip degrades to a bare label pill (no dot, no remove button). `t` is
// module-global so the remove aria-label resolves to the default locale.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const VARIANTS = new Set(["neutral", "primary", "success", "warning", "danger", "info"]);

// Minimal HTML-attribute escaper for the dynamic aria-label.
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

const CSS = `
  :host { display: inline-flex; vertical-align: middle; }
  :host([disabled]) { opacity: 0.55; pointer-events: none; }

  [part="tag"] {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1;
    white-space: nowrap; max-width: 100%;
    padding: 0.3rem var(--pura-space-2); border-radius: var(--pura-radius-full);
    border: 1px solid var(--pura-border); background: var(--pura-subtle);
    color: var(--pura-muted-fg);
  }

  .label {
    overflow: hidden; text-overflow: ellipsis; min-width: 0;
  }

  .dot {
    flex: none; width: 0.4rem; height: 0.4rem;
    border-radius: 50%; background: currentColor;
  }

  .remove {
    flex: none; display: inline-flex; align-items: center; justify-content: center;
    margin: -0.15rem -0.2rem -0.15rem 0; padding: 0.1rem;
    font: inherit; color: inherit; cursor: pointer;
    background: transparent; border: 0; border-radius: var(--pura-radius-full);
    opacity: 0.7;
    transition: background var(--pura-dur) var(--pura-ease),
      opacity var(--pura-dur) var(--pura-ease);
  }
  .remove:hover { opacity: 1; background: color-mix(in srgb, currentColor 16%, transparent); }
  .remove:focus-visible { outline: none; opacity: 1; box-shadow: 0 0 0 2px var(--pura-ring); }
  .remove:disabled { cursor: not-allowed; opacity: 0.4; }

  /* variants */
  :host([variant="primary"]) [part="tag"] {
    background: var(--pura-primary); color: var(--pura-primary-fg); border-color: transparent;
  }
  :host([variant="success"]) [part="tag"] {
    background: var(--pura-success-bg); color: var(--pura-success-fg);
    border-color: color-mix(in srgb, var(--pura-success) 30%, transparent);
  }
  :host([variant="warning"]) [part="tag"] {
    background: var(--pura-warning-bg); color: var(--pura-warning);
    border-color: color-mix(in srgb, var(--pura-warning) 30%, transparent);
  }
  :host([variant="danger"]) [part="tag"] {
    background: var(--pura-danger-bg); color: var(--pura-danger);
    border-color: color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
  :host([variant="info"]) [part="tag"] {
    background: var(--pura-info-bg); color: var(--pura-info);
    border-color: color-mix(in srgb, var(--pura-info) 30%, transparent);
  }
`;

export function tagTemplate(el = EMPTY_SHIM) {
  const removable = el.hasAttribute("removable");
  const disabled = el.hasAttribute("disabled");
  const dot = el.hasAttribute("dot") ? '<span class="dot" part="dot" aria-hidden="true"></span>' : "";
  // Plain-text label, mirroring the component's `label` getter.
  const label = (el.getAttribute("label") || el.textContent || "").trim();
  const remove = removable
    ? `<button class="remove" part="remove" type="button"
             aria-label="${esc(t("tag.remove", { label: label || t("tag.fallback") }))}"
             ${disabled ? "disabled" : ""}>
           <svg viewBox="0 0 24 24" width="0.85em" height="0.85em" aria-hidden="true">
             <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor"
                   stroke-width="2.2" stroke-linecap="round"/>
           </svg>
         </button>`
    : "";

  const html = `<span part="tag" data-pura="tag">
         ${dot}<span class="label" part="label"><slot></slot></span>${remove}
       </span>`;
  return { html, css: CSS };
}

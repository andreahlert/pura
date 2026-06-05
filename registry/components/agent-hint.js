// <pura-agent-hint> — AGENT-NATIVE. Holds text that is visually hidden from
// humans but kept in the DOM + accessibility tree for screen readers and
// agents (the sr-only technique). Use it to give an automated agent or AT user
// extra context about a nearby control.
//
// Slots: default slot = the hint text.
// Attributes:
//   for     — id of the control this hint describes. When set, the component
//             also wires the target's aria-describedby to a stable internal id
//             so the hint is announced for that control.
//   role    — exposed accessibility role (default "note").
//   label   — optional aria-label for the hint region.
//   level   — semantic weight: info (default) | tip | warning. Machine-readable
//             only; surfaced as data-level + aria-roledescription.
//   visible — opt-in escape hatch: render the hint visibly (debugging / authoring).
//
// Machine-readable layer:
//   - stable data-* attributes: data-pura-agent-hint, data-hint-id, data-level,
//     data-for (mirrors `for`).
//   - ARIA role/label + a stable internal id used for aria-describedby wiring.
//   - global window.__puraAgentHints registry: a live Map keyed by hint id, with
//     { id, text, for, level, el } entries, plus a query(forId) helper. Agents
//     can read window.__puraAgentHints to enumerate every hint on the page.
//
// Events: `pura-agent-hint:change` (bubbles) when the hint text or target changes.
import { PuraElement, define } from "../base.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

// Live global registry so agents can enumerate every hint on the page.
function registry() {
  if (!window.__puraAgentHints) {
    const map = new Map();
    // Convenience: all hints describing a given control id.
    map.query = (forId) =>
      [...map.values()].filter((h) => h.for === forId);
    window.__puraAgentHints = map;
  }
  return window.__puraAgentHints;
}

const LEVELS = new Set(["info", "tip", "warning"]);
const ROLEDESC = { info: "agent hint", tip: "agent tip", warning: "agent warning" };

class PuraAgentHint extends PuraElement {
  static observedAttributes = ["for", "role", "label", "level", "visible"];

  connectedCallback() {
    this._hintId = this.id || `pura-agent-hint-${uid++}`;

    this.render(
      `<span part="hint"><slot></slot></span>`,
      CSS
    );

    this._slot = this.$("slot");
    // Re-publish to the registry + re-announce when the slotted text changes.
    this._slot.addEventListener("slotchange", () => this._sync());

    this._sync();
  }

  disconnectedCallback() {
    this._unwireTarget();
    registry().delete(this._hintId);
  }

  attributeChangedCallback() {
    // connectedCallback may not have run yet; guard on the rendered slot.
    if (this._slot) this._sync();
  }

  // Plain-text content of the hint (trimmed, whitespace-collapsed).
  get text() {
    return (this.textContent || "").replace(/\s+/g, " ").trim();
  }

  _level() {
    const l = (this.getAttribute("level") || "info").toLowerCase();
    return LEVELS.has(l) ? l : "info";
  }

  _sync() {
    // Re-entrancy guard: _sync writes observed attributes (role/aria-*), which
    // would retrigger attributeChangedCallback → _sync → stack overflow.
    if (this._syncing) return;
    this._syncing = true;
    try { this._syncImpl(); } finally { this._syncing = false; }
  }

  _syncImpl() {
    const level = this._level();
    const forId = this.getAttribute("for") || "";
    const text = this.text;

    // Stable machine-readable attributes on the host (light DOM).
    this.setAttribute("data-pura-agent-hint", "");
    this.setAttribute("data-hint-id", this._hintId);
    this.setAttribute("data-level", level);
    if (forId) this.setAttribute("data-for", forId);
    else this.removeAttribute("data-for");

    // ARIA on the host so AT exposes the hidden text in the a11y tree.
    this.setAttribute("role", this.getAttribute("role") || "note");
    this.setAttribute("aria-roledescription", ROLEDESC[level]);
    const label = this.getAttribute("label");
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");
    // Internal hint span carries the stable id used for aria-describedby.
    const hint = this.$("[part='hint']");
    if (hint) hint.id = `${this._hintId}-text`;

    // Wire / rewire the described control.
    this._wireTarget(forId);

    // Publish to the global registry (live entry).
    registry().set(this._hintId, {
      id: this._hintId,
      text,
      for: forId || null,
      level,
      el: this,
    });

    this.dispatchEvent(
      new CustomEvent("pura-agent-hint:change", {
        bubbles: true,
        detail: { id: this._hintId, text, for: forId || null, level },
      })
    );
  }

  // Append our stable id to the target control's aria-describedby (idempotent).
  _wireTarget(forId) {
    if (this._wiredId === forId) return;
    this._unwireTarget();
    if (!forId) return;
    let target = null;
    try {
      target = (this.getRootNode() || document).getElementById?.(forId) ||
        document.getElementById(forId);
    } catch (_) {
      target = null;
    }
    if (!target) return; // degrade gracefully if target is absent
    const tokens = (target.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(Boolean);
    if (!tokens.includes(this._hintId)) {
      tokens.push(this._hintId);
      target.setAttribute("aria-describedby", tokens.join(" "));
    }
    // Mirror the host id so the describedby token resolves to a real element.
    if (!this.id) this.id = this._hintId;
    this._wiredTarget = target;
    this._wiredId = forId;
  }

  _unwireTarget() {
    const target = this._wiredTarget;
    if (target) {
      const tokens = (target.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((t) => t && t !== this._hintId);
      if (tokens.length) target.setAttribute("aria-describedby", tokens.join(" "));
      else target.removeAttribute("aria-describedby");
    }
    this._wiredTarget = null;
    this._wiredId = undefined;
  }
}

const CSS = `
  /* sr-only: visually hidden but present in the DOM + accessibility tree.
     The host stays in the a11y tree; slotted text is announced by AT/agents. */
  :host {
    position: absolute !important;
    width: 1px; height: 1px;
    padding: 0; margin: -1px; border: 0;
    overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Opt-in visible escape hatch for authoring / debugging. */
  :host([visible]) {
    position: static !important;
    width: auto; height: auto;
    padding: var(--pura-space-1) var(--pura-space-2); margin: 0;
    overflow: visible; clip: auto; clip-path: none;
    white-space: normal;
    display: inline-block;
    font-size: var(--pura-text-xs); line-height: 1.5;
    color: var(--pura-muted-fg);
    background: var(--pura-subtle);
    border: 1px dashed var(--pura-border-strong);
    border-radius: var(--pura-radius-sm);
  }
  :host([visible][data-level="warning"]) {
    color: var(--pura-warning);
    border-color: color-mix(in srgb, var(--pura-warning) 45%, transparent);
  }
  :host([visible][data-level="tip"]) {
    color: var(--pura-accent);
    border-color: color-mix(in srgb, var(--pura-accent) 45%, transparent);
  }

  [part="hint"] { display: contents; }
`;

define("pura-agent-hint", PuraAgentHint);
export { PuraAgentHint };

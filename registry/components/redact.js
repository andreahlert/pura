// <pura-redact> — AGENT-NATIVE. Blurs / obscures slotted sensitive content
// (a secret, token, salary, or other PII) until it is explicitly revealed.
// While redacted the real value is hidden from sight and the accessibility
// tree exposes a generic label (e.g. "conteúdo oculto") instead of the value,
// so screen readers and agents do not leak the secret until a human reveals it.
//
// Slots:
//   (default) — the sensitive content to protect.
// Attributes:
//   reveal-on  — interaction that reveals: click (default) | hover | none.
//                `none` makes it purely programmatic (reveal via .reveal()).
//   revealed   — reflected boolean; present while the value is shown.
//   label      — accessible label shown while redacted (default "conteúdo oculto").
//   blur       — blur radius keyword: sm | md (default) | lg. Controls how
//                strongly the content is obscured while hidden.
//   toggle     — when present, a revealed value can be re-hidden by the same
//                interaction (click toggles; hover hides again on leave anyway).
//   disabled   — non-interactive; stays redacted, cannot be revealed by the user.
// Events:
//   reveal  { value }  — fired when the content becomes visible (bubbles).
//   hide    { }        — fired when the content is hidden again (bubbles).
// Agent-native layer:
//   - stable data-* mirror on the host: data-pura-redact, data-pura-id,
//     data-state (hidden | revealed), data-reveal-on.
//   - ARIA: a focusable button-role region with aria-pressed reflecting state
//     and a generic aria-label while hidden (the value is never in the a11y
//     tree until revealed).
//   - global window.__puraRedactions registry (id -> element) with a
//     reveal(id) / hide(id) helper so agents can audit and drive every
//     redaction on the page without piercing the Shadow DOM.
import { PuraElement, define } from "../base.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

const REVEAL_ON = new Set(["click", "hover", "none"]);
const BLURS = new Set(["sm", "md", "lg"]);
const DEFAULT_LABEL = "conteúdo oculto";

// Lazily-created global registry so agents can enumerate / drive every
// redaction on the page without touching the Shadow DOM. id -> element.
function registry() {
  if (!window.__puraRedactions) {
    const map = new Map();
    map.reveal = (id) => map.get(id)?.reveal();
    map.hide = (id) => map.get(id)?.hide();
    window.__puraRedactions = map;
  }
  return window.__puraRedactions;
}

class PuraRedact extends PuraElement {
  static observedAttributes = ["reveal-on", "label", "blur", "disabled", "toggle"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-redact-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<span part="control" class="control" role="button" tabindex="0"
             aria-pressed="false">
         <span part="content" class="content"><slot></slot></span>
         <span part="overlay" class="overlay" aria-hidden="true"></span>
       </span>`,
      CSS
    );

    this._control = this.$(".control");
    this._content = this.$(".content");

    this._onClick = () => {
      if (this._effectiveRevealOn() !== "click") return;
      this.toggle();
    };
    this._onKey = (e) => {
      if (this._effectiveRevealOn() !== "click") return;
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        this.toggle();
      }
    };
    this._onEnter = () => {
      if (this._effectiveRevealOn() === "hover") this.reveal();
    };
    this._onLeave = () => {
      if (this._effectiveRevealOn() === "hover") this.hide();
    };
    this._onFocus = () => {
      if (this._effectiveRevealOn() === "hover") this.reveal();
    };
    this._onBlur = () => {
      if (this._effectiveRevealOn() === "hover") this.hide();
    };

    this._control.addEventListener("click", this._onClick);
    this._control.addEventListener("keydown", this._onKey);
    this._control.addEventListener("mouseenter", this._onEnter);
    this._control.addEventListener("mouseleave", this._onLeave);
    this._control.addEventListener("focus", this._onFocus);
    this._control.addEventListener("blur", this._onBlur);

    // Start hidden unless the author opted into a pre-revealed state.
    this._shown = this.hasAttribute("revealed");
    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._control) return;
    // `disabled` while shown forces it back to hidden.
    if (name === "disabled" && this.hasAttribute("disabled") && this._shown) {
      this._shown = false;
    }
    this._sync();
  }

  // ---- config -------------------------------------------------------------
  get disabled() {
    return this.hasAttribute("disabled");
  }

  _effectiveRevealOn() {
    const r = (this.getAttribute("reveal-on") || "click").toLowerCase();
    const mode = REVEAL_ON.has(r) ? r : "click";
    // A disabled redaction never responds to user interaction.
    return this.disabled ? "none" : mode;
  }

  _blur() {
    const b = (this.getAttribute("blur") || "md").toLowerCase();
    return BLURS.has(b) ? b : "md";
  }

  _label() {
    return this.getAttribute("label") || DEFAULT_LABEL;
  }

  // Plain-text value of the protected content (trimmed, whitespace-collapsed).
  get value() {
    return (this.textContent || "").replace(/\s+/g, " ").trim();
  }

  get revealed() {
    return !!this._shown;
  }

  // ---- public API ---------------------------------------------------------
  // Reveal the content. Returns true if it transitioned to revealed.
  reveal() {
    if (this._shown || this.disabled) return false;
    this._shown = true;
    this._sync();
    this.dispatchEvent(
      new CustomEvent("reveal", { detail: { value: this.value }, bubbles: true })
    );
    return true;
  }

  // Hide the content again. Returns true if it transitioned to hidden.
  hide() {
    if (!this._shown) return false;
    this._shown = false;
    this._sync();
    this.dispatchEvent(new CustomEvent("hide", { detail: {}, bubbles: true }));
    return true;
  }

  // Click behaviour: toggle when `toggle` is set, otherwise reveal-only.
  toggle() {
    if (this._shown) {
      if (this.hasAttribute("toggle")) return this.hide();
      return false;
    }
    return this.reveal();
  }

  // ---- sync DOM + ARIA + agent mirror -------------------------------------
  _sync() {
    if (!this._control) return;
    const shown = this._shown;
    const mode = this._effectiveRevealOn();

    // Reflect state attribute for styling + authoring.
    this.toggleAttribute("revealed", shown);
    this.setAttribute("data-blur", this._blur());

    // The control is only a focusable button when it can be interacted with.
    const interactive = mode !== "none";
    if (interactive) {
      this._control.setAttribute("role", "button");
      this._control.setAttribute("tabindex", "0");
      this._control.setAttribute("aria-pressed", shown ? "true" : "false");
    } else {
      // Purely programmatic / disabled: not a button, not focusable.
      this._control.removeAttribute("role");
      this._control.removeAttribute("tabindex");
      this._control.removeAttribute("aria-pressed");
    }

    // While hidden, expose ONLY the generic label so the secret never reaches
    // the accessibility tree. While revealed, drop the label and let the real
    // slotted content be announced.
    // While hidden, also pull the slotted content out of the accessibility
    // tree so the real value is never announced; the generic label stands in.
    if (shown) {
      this._control.removeAttribute("aria-label");
      if (this._content) this._content.removeAttribute("aria-hidden");
    } else {
      this._control.setAttribute("aria-label", this._label());
      if (this._content) this._content.setAttribute("aria-hidden", "true");
    }

    this._reflectAgentState(shown, mode);
  }

  // Stable machine-readable mirror of state on the host element. Agents read
  // these without piercing the Shadow DOM. The value is NEVER mirrored here.
  _reflectAgentState(shown, mode) {
    this.setAttribute("data-pura-redact", "");
    this.setAttribute("data-pura-id", this._id);
    this.setAttribute("data-state", shown ? "revealed" : "hidden");
    this.setAttribute("data-reveal-on", mode);
  }
}

const CSS = `
  :host { display: inline-block; max-width: 100%; vertical-align: bottom; }

  .control {
    position: relative;
    display: inline-flex; align-items: center;
    max-width: 100%;
    font: inherit; font-family: var(--pura-font-mono);
    border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2);
    background: var(--pura-subtle);
    color: var(--pura-fg);
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  /* non-interactive (reveal-on=none or disabled): no pointer affordance */
  :host([data-reveal-on="none"]) .control { cursor: default; }
  :host([disabled]) .control { cursor: not-allowed; opacity: 0.6; }

  .control:hover { background: var(--pura-subtle-hover); }
  .control:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .content {
    display: inline-block;
    max-width: 100%;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    line-height: 1.4;
    user-select: none;
    filter: blur(6px);
    transition: filter var(--pura-dur) var(--pura-ease);
  }
  :host([data-blur="sm"]) .content { filter: blur(4px); }
  :host([data-blur="lg"]) .content { filter: blur(9px); }

  /* revealed: clear the blur, allow selecting / copying the real value */
  :host([revealed]) .content {
    filter: none;
    user-select: text;
  }

  /* Overlay sits above the blurred content while hidden so neither pixels nor
     a partially-legible glyph leak through. Hidden once revealed. */
  .overlay {
    position: absolute; inset: 0;
    border-radius: inherit;
    background: var(--pura-subtle);
    opacity: 1;
    transition: opacity var(--pura-dur) var(--pura-ease);
  }
  :host([revealed]) .overlay { opacity: 0; pointer-events: none; }

  /* When revealed via hover, keep the obscuring layer non-interactive so the
     pointer reaches the content for selection. */
  :host([revealed]) .content { pointer-events: auto; }
`;

define("pura-redact", PuraRedact);
export { PuraRedact };

// <pura-copy-region> — AGENT-NATIVE. Wraps any slotted region and makes it
// one-click copyable. A copy affordance is revealed on hover/focus in the
// corner of the region; activating it writes the region's text (or the literal
// `value` attribute) to the clipboard and shows a brief floating confirmation.
// The host advertises itself as machine-extractable via a stable data-copyable
// flag + ARIA, and registers in a global registry so agents can read or drive
// every copyable region on the page without piercing the Shadow DOM.
//
// Slots:
//   (default) — the region content that should be copyable.
// Attributes:
//   value     — literal text to copy. When present it wins over the slotted
//               text (useful when the visible content differs from the payload).
//   label     — accessible label for the copy affordance (default "Copiar").
//   timeout   — confirmation duration in ms (default 1400).
//   disabled  — non-interactive; the affordance is hidden and copy() is a no-op.
//   placement — confirmation placement: top (default) | bottom | left | right.
// Parts:
//   region    — the wrapper around the slotted content.
//   trigger   — the copy button affordance.
//   icon / copy-icon / check-icon — the swappable glyphs.
//   confirm   — the floating confirmation panel.
//   live      — the visually-hidden polite live region.
// Events:
//   copy  { value }   — fired after a successful clipboard write.
//   error { error }   — fired when the copy fails (no source, write rejected).
// Machine-readable layer:
//   - host carries data-copyable, data-pura-copy-region, data-pura-id,
//     data-pura-copy (idle | copied), data-pura-copy-source (value | text | none),
//     data-pura-copy-disabled.
//   - ARIA: the region exposes role="group" + aria-roledescription so AT/agents
//     know the content is extractable; the trigger is a labelled button.
//   - global window.__puraCopyRegions: a live Map keyed by data-pura-id with
//     { id, el, text(), copy() } entries plus an all() helper. Agents enumerate
//     and drive copyable regions through it.
import { PuraElement, define } from "../base.js";
import meta from "./copy-region.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "copy-region.label": {
    en: "Copy",
    "pt-BR": "Copiar",
    fr: "Copier",
    de: "Kopieren",
    it: "Copia",
  },
  "copy-region.copied": {
    en: "Copied",
    "pt-BR": "Copiado",
    fr: "Copié",
    de: "Kopiert",
    it: "Copiato",
  },
});

// Module-level counter for stable, unique ids + anchor-names per instance.
let uid = 0;

const PLACEMENTS = new Set(["top", "bottom", "left", "right"]);

// Lazily-created global registry so agents can enumerate / read / drive every
// copy region on the page without touching the Shadow DOM. id -> entry.
function registry() {
  if (!window.__puraCopyRegions) {
    const map = new Map();
    map.all = () => [...map.values()];
    window.__puraCopyRegions = map;
  }
  return window.__puraCopyRegions;
}

class PuraCopyRegion extends PuraElement {
  static observedAttributes = ["value", "label", "timeout", "disabled", "placement"];

  connectedCallback() {
    const n = uid++;
    this._id = this.dataset.puraId || `pura-copy-region-${n}`;
    this.dataset.puraId = this._id;
    this._name = `--pura-copy-region-${n}`;

    this._copied = false;
    this._timer = null;

    const placement = this.getAttribute("placement");
    if (placement && !PLACEMENTS.has(placement)) this.removeAttribute("placement");

    this.render(
      `<div part="region" class="region">
         <div class="content"><slot></slot></div>
         <button part="trigger" class="trigger" type="button">
           <span class="icon copy-icon" part="icon copy-icon" aria-hidden="true">${COPY}</span>
           <span class="icon check" part="icon check-icon" aria-hidden="true">${CHECK}</span>
         </button>
       </div>
       <div part="confirm" class="confirm" popover="manual" aria-hidden="true">
         <span class="check">${CHECK}</span><span class="confirm-text">${t("copy-region.copied")}</span>
       </div>
       <span part="live" class="sr" role="status" aria-live="polite"></span>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._region = this.$(".region");
    this._trigger = this.$(".trigger");
    this._confirm = this.$(".confirm");
    this._confirmText = this.$(".confirm-text");
    this._live = this.$(".sr");

    this._onClick = () => this.copy();
    this._trigger.addEventListener("click", this._onClick);

    this._i18nOff = onLocaleChange(() => this._applyI18n());

    // Register the live entry agents can read / drive.
    registry().set(this._id, {
      id: this._id,
      el: this,
      text: () => this.text,
      copy: () => this.copy(),
    });

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
    if (this._timer) clearTimeout(this._timer);
    try { this._confirm?.hidePopover(); } catch (_) { /* not open */ }
    this._i18nOff?.();
  }

  // Update only the already-rendered i18n nodes in place on locale change.
  // No re-render, no new document/window listeners.
  _applyI18n() {
    if (this._confirmText) this._confirmText.textContent = t("copy-region.copied");
    if (this._copied && this._live) this._live.textContent = t("copy-region.copied");
    this._sync();
  }

  attributeChangedCallback(name) {
    if (name === "placement") {
      const p = this.getAttribute("placement");
      if (p && !PLACEMENTS.has(p)) { this.removeAttribute("placement"); return; }
    }
    if (this._trigger) this._sync();
  }

  // ---- config getters -----------------------------------------------------
  get disabled() {
    return this.hasAttribute("disabled");
  }

  get timeout() {
    const t = Number(this.getAttribute("timeout"));
    return Number.isFinite(t) && t >= 0 ? t : 1400;
  }

  // Resolve the text to copy: explicit `value` wins, else the slotted text.
  get text() {
    if (this.hasAttribute("value")) return this.getAttribute("value") || "";
    return (this.textContent || "").replace(/\s+/g, " ").trim();
  }

  // ---- public API ---------------------------------------------------------
  // Copy the resolved text. Returns Promise<boolean> (true on success). Safe to
  // call programmatically; agents drive the component through this.
  async copy() {
    if (this.disabled) return false;
    const text = this.text;
    if (!text) {
      this.dispatchEvent(
        new CustomEvent("error", { detail: { error: "no-source" }, bubbles: true })
      );
      return false;
    }
    try {
      await writeClipboard(text);
    } catch (error) {
      this.dispatchEvent(new CustomEvent("error", { detail: { error }, bubbles: true }));
      return false;
    }
    this._showCopied();
    this.dispatchEvent(new CustomEvent("copy", { detail: { value: text }, bubbles: true }));
    return true;
  }

  // ---- feedback state ------------------------------------------------------
  _showCopied() {
    this._copied = true;
    if (this._live) this._live.textContent = t("copy-region.copied");
    try { this._confirm?.showPopover(); } catch (_) { /* already open / unsupported */ }
    this._sync();
    if (this._timer) clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._copied = false;
      if (this._live) this._live.textContent = "";
      try { this._confirm?.hidePopover(); } catch (_) { /* not open */ }
      this._sync();
    }, this.timeout);
  }

  // ---- sync DOM + ARIA + agent mirror -------------------------------------
  _sync() {
    if (!this._trigger) return;
    const label = this.getAttribute("label") || t("copy-region.label");

    this._trigger.disabled = this.disabled;
    this._trigger.setAttribute("aria-label", this._copied ? t("copy-region.copied") : label);
    this.toggleAttribute("data-copied", this._copied);

    this._reflectAgentState(label);
  }

  // Stable machine-readable mirror of state on the host (light DOM).
  _reflectAgentState() {
    // The defining agent-native flag: this region's content is extractable.
    this.setAttribute("data-copyable", "true");
    this.setAttribute("data-pura-copy-region", "");
    this.setAttribute("data-pura-id", this._id);
    this.setAttribute("data-pura-copy", this._copied ? "copied" : "idle");
    this.setAttribute("data-pura-copy-disabled", this.disabled ? "true" : "false");
    this.setAttribute(
      "data-pura-copy-source",
      this.hasAttribute("value") ? "value" : (this.text ? "text" : "none")
    );

    // ARIA: advertise the region as a copyable group for AT + agents.
    this.setAttribute("role", "group");
    this.setAttribute("aria-roledescription", "copyable region");
  }
}

// Clipboard write with a graceful fallback for non-secure contexts / older
// engines where navigator.clipboard is unavailable.
function writeClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      ok ? resolve() : reject(new Error("copy-failed"));
    } catch (err) {
      reject(err);
    }
  });
}

// Inline SVGs reused via currentColor; no external assets.
const COPY =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<rect x="9" y="9" width="11" height="11" rx="2"/>` +
  `<path d="M5 15V5a2 2 0 0 1 2-2h10"/>` +
  `</svg>`;

const CHECK =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M20 6L9 17l-5-5"/>` +
  `</svg>`;

const CSS = `
  :host { display: block; }
  :host([hidden]) { display: none !important; }

  .region {
    position: relative;
    anchor-name: ANCHOR;
    border-radius: var(--pura-radius);
  }

  .content { display: block; }

  /* hover-revealed copy affordance, anchored to the region corner */
  .trigger {
    position: absolute; top: var(--pura-space-2); right: var(--pura-space-2);
    z-index: 1;
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.875rem; height: 1.875rem; padding: 0;
    font: inherit; line-height: 1; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    /* Dimmed by default but kept in the tab order so keyboard users can reach
       it even when the slotted region has no focusable content. opacity:0 stays
       focusable; pointer-events:none only suppresses mouse, not Tab/focus.
       Under reduced motion the base reset makes the opacity flip instant, so the
       affordance is never motion-only. */
    opacity: 0; pointer-events: none;
    transition: opacity var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  /* Reveal on hover, or whenever focus enters the region (keyboard users). */
  :host(:hover) .trigger,
  :host(:focus-within) .trigger,
  .region:hover .trigger,
  .trigger:focus-visible { opacity: 1; pointer-events: auto; }

  .trigger:hover { background: var(--pura-subtle); }
  .trigger:active { transform: translateY(0.5px) scale(0.98); }
  .trigger:focus-visible {
    outline: none; box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* disabled: genuinely remove the affordance from view + tab order */
  .trigger:disabled,
  :host([disabled]) .trigger {
    opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;
  }

  .icon {
    display: inline-flex; align-items: center; justify-content: center;
    font-size: var(--pura-text-base);
  }
  .icon svg { display: block; }

  /* swap copy <-> check while in the copied state */
  .check { display: none; color: var(--pura-success-fg); }
  :host([data-copied]) .copy-icon { display: none; }
  :host([data-copied]) .trigger .check { display: inline-flex; }

  /* floating confirmation — native Popover API + CSS anchor positioning */
  .confirm {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; padding: var(--pura-space-2) var(--pura-space-3);
    bottom: anchor(top); right: anchor(right); margin-bottom: var(--pura-space-2);
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    width: max-content; max-width: min(16rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg);
    font-size: var(--pura-text-xs); font-weight: 550;
    opacity: 0; transform: translateY(4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .confirm:popover-open { opacity: 1; transform: none; }
  .confirm .check { display: inline-flex; color: var(--pura-success-fg); }
  .confirm .check svg { width: 0.9em; height: 0.9em; }

  /* placement variants for the confirmation */
  :host([placement="bottom"]) .confirm {
    top: anchor(bottom); bottom: auto; right: anchor(right);
    margin: var(--pura-space-2) 0 0; transform: translateY(-4px);
  }
  :host([placement="left"]) .confirm {
    top: anchor(top); bottom: auto; right: anchor(left); left: auto;
    margin: 0 var(--pura-space-2) 0 0; transform: translateX(4px);
  }
  :host([placement="right"]) .confirm {
    top: anchor(top); bottom: auto; left: anchor(right); right: auto;
    margin: 0 0 0 var(--pura-space-2); transform: translateX(-4px);
  }
  :host([placement="bottom"]) .confirm:popover-open,
  :host([placement="left"]) .confirm:popover-open,
  :host([placement="right"]) .confirm:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .confirm {
      position: absolute; inset: auto; top: 0; right: 0;
      bottom: auto; left: auto; margin: 0;
    }
  }

  /* visually-hidden polite live region for screen readers */
  .sr {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
  }
`;

define("pura-copy-region", PuraCopyRegion, meta);
export { PuraCopyRegion };

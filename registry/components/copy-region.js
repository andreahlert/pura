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
import { copyRegionTemplate } from "./copy-region.template.js";

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

    const { html, css } = copyRegionTemplate(this);
    this.render(html, css);

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



define("pura-copy-region", PuraCopyRegion, meta);
export { PuraCopyRegion };

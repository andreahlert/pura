// <pura-copy-button> — button that copies text to the clipboard. Shows a check
// glyph + "Copiado" feedback for ~1.2s after a successful copy, then reverts.
// Small icon-only button by default; slot a label to make it a labelled button.
// Attributes:
//   value     — literal text to copy
//   target    — CSS selector resolved against the document; copies that node's
//               value (form fields) or textContent. `value` wins over `target`.
//   timeout   — feedback duration in ms (default 1200)
//   disabled  — non-interactive
//   label     — accessible label for the icon-only button (default "Copiar")
// Slots:
//   (default) — optional visible label; when present the button is labelled
//               (icon + text) instead of icon-only.
// Events:
//   copy  { value }      — fired after a successful clipboard write
//   error { error }      — fired when the copy fails (no source, write rejected)
// Agent-native layer: stable data-pura-copy-* attributes mirror live state and
//   the instance registers in window.__puraCopyButtons keyed by its data-pura-id.
//   Agents can call .copy() to trigger a copy programmatically.
import { PuraElement, define } from "../base.js";
import meta from "./copy-button.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { copyButtonTemplate } from "./copy-button.template.js";

registerMessages({
  "copy-button.copy": {
    en: "Copy",
    "pt-BR": "Copiar",
    fr: "Copier",
    de: "Kopieren",
    it: "Copia",
  },
  "copy-button.copied": {
    en: "Copied",
    "pt-BR": "Copiado",
    fr: "Copié",
    de: "Kopiert",
    it: "Copiato",
  },
});

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// copy button on the page without touching the Shadow DOM. id -> element.
function registry() {
  return (window.__puraCopyButtons ||= new Map());
}

class PuraCopyButton extends PuraElement {
  static observedAttributes = ["value", "target", "disabled", "label", "timeout"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-copy-button-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this._copied = false;
    this._timer = null;

    const { html, css } = copyButtonTemplate(this);
    this.render(html, css);

    this._btn = this.$("button");
    this._slot = this.$("slot");
    this._live = this.$(".sr");
    this._feedback = this.$(".feedback");

    this._onClick = () => this.copy();
    this._btn.addEventListener("click", this._onClick);

    this._onSlotChange = () => this._sync();
    this._slot.addEventListener("slotchange", this._onSlotChange);

    this._sync();

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    if (this._timer) clearTimeout(this._timer);
    this._i18nOff?.();
  }

  // Update already-rendered i18n nodes in place on locale change. No re-render,
  // no new listeners. _sync() handles the aria-label (it adds no listeners).
  _applyI18n() {
    if (this._feedback) this._feedback.textContent = t("copy-button.copied");
    if (this._live && this._copied) this._live.textContent = t("copy-button.copied");
    this._sync();
  }

  attributeChangedCallback() {
    if (this._btn) this._sync();
  }

  // ---- config getters ----------------------------------------------------
  get disabled() {
    return this.hasAttribute("disabled");
  }

  get timeout() {
    const t = Number(this.getAttribute("timeout"));
    return Number.isFinite(t) && t >= 0 ? t : 1200;
  }

  // Resolve the text to copy: explicit `value` wins, else read the `target`.
  get text() {
    if (this.hasAttribute("value")) return this.getAttribute("value") || "";
    const sel = this.getAttribute("target");
    if (!sel) return "";
    let node = null;
    try {
      node = document.querySelector(sel);
    } catch {
      return "";
    }
    if (!node) return "";
    if ("value" in node && typeof node.value === "string") return node.value;
    return node.textContent || "";
  }

  // ---- public API ---------------------------------------------------------
  // Copy the resolved text. Returns a Promise<boolean> (true on success). Safe
  // to call programmatically; agents drive the component through this.
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
    if (this._live) this._live.textContent = t("copy-button.copied");
    this._sync();
    if (this._timer) clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._copied = false;
      if (this._live) this._live.textContent = "";
      this._sync();
    }, this.timeout);
  }

  // ---- sync DOM + ARIA + agent mirror -------------------------------------
  _sync() {
    if (!this._btn) return;
    const hasLabel = this._slot && this._slot.assignedNodes().length > 0;
    const label = this.getAttribute("label") || t("copy-button.copy");

    this._btn.disabled = this.disabled;
    this.toggleAttribute("data-labelled", hasLabel);
    this.toggleAttribute("data-copied", this._copied);

    // Icon-only buttons need an accessible name; labelled ones derive it from
    // the slotted text, so we only set aria-label when there is no visible text.
    if (hasLabel) this._btn.removeAttribute("aria-label");
    else this._btn.setAttribute("aria-label", this._copied ? t("copy-button.copied") : label);

    this._reflectAgentState(hasLabel, label);
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState(hasLabel, label) {
    this.setAttribute("data-pura-copy", this._copied ? "copied" : "idle");
    this.setAttribute("data-pura-copy-disabled", this.disabled ? "true" : "false");
    this.setAttribute("data-pura-copy-source", this.hasAttribute("value") ? "value" : (this.getAttribute("target") ? "target" : "none"));
    this.setAttribute("data-pura-copy-label", hasLabel ? "slot" : label);
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



define("pura-copy-button", PuraCopyButton, meta);
export { PuraCopyButton };

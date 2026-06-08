// <pura-code-block> — code display surface. A header bar shows an optional
// filename and a language label plus a copy button; the body is a
// <pre><code> rendered from the default slot with whitespace preserved,
// monospace font, a subtle background, and horizontal scroll. Optional line
// numbers via the `numbered` attribute.
//
// Attributes:
//   language   language label shown in the header (e.g. "js", "css")
//   filename   filename shown in the header (both optional; the header bar
//              with its copy button is always present)
//   numbered   show a line-number gutter
//
// Slots:
//   (default)  the raw code text (preserve indentation/whitespace)
//
// Events:
//   pura-copy  CustomEvent({ detail: { text } }) after a successful copy
//
// Agent-native: each instance registers in the global window.__puraCodeBlocks
// registry (a Map keyed by a stable id) exposing
// { el, getText, copy, language, filename }. The host carries
// data-pura-code-block (id), data-language, data-filename, data-lines and
// data-numbered so an agent can read state without touching the shadow DOM.
// The copy button is a real <button> with aria-label and a live status region.
import { PuraElement, define } from "../base.js";
import meta from "./code-block.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { codeBlockTemplate } from "./code-block.template.js";

registerMessages({
  "code-block.label": {
    en: "Code block",
    "pt-BR": "Bloco de código",
    fr: "Bloc de code",
    de: "Codeblock",
    it: "Blocco di codice",
  },
  "code-block.copy": {
    en: "Copy",
    "pt-BR": "Copiar",
    fr: "Copier",
    de: "Kopieren",
    it: "Copia",
  },
  "code-block.copyAria": {
    en: "Copy code to clipboard",
    "pt-BR": "Copiar código para a área de transferência",
    fr: "Copier le code dans le presse-papiers",
    de: "Code in die Zwischenablage kopieren",
    it: "Copia il codice negli appunti",
  },
  "code-block.copied": {
    en: "Copied",
    "pt-BR": "Copiado",
    fr: "Copié",
    de: "Kopiert",
    it: "Copiato",
  },
  "code-block.copiedAria": {
    en: "Code copied to clipboard",
    "pt-BR": "Código copiado para a área de transferência",
    fr: "Code copié dans le presse-papiers",
    de: "Code in die Zwischenablage kopiert",
    it: "Codice copiato negli appunti",
  },
  "code-block.copyFailed": {
    en: "Copy failed",
    "pt-BR": "Falha ao copiar",
    fr: "Échec de la copie",
    de: "Kopieren fehlgeschlagen",
    it: "Copia non riuscita",
  },
});

// Known localized values of the default host aria-label, so locale changes can
// re-localize a component-owned label without clobbering a consumer's.
const LABELS = new Set([
  "Code block",
  "Bloco de código",
  "Bloc de code",
  "Codeblock",
  "Blocco di codice",
]);

let uid = 0;

// Global machine-readable registry so agents can discover and drive every
// code-block on the page without reaching into shadow roots.
const REGISTRY = (window.__puraCodeBlocks ||= new Map());

class PuraCodeBlock extends PuraElement {
  static observedAttributes = ["language", "filename", "numbered"];

  connectedCallback() {
    if (!this._id) this._id = `pura-code-block-${uid++}`;
    this.setAttribute("data-pura-code-block", this._id);
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", this.getAttribute("filename") || t("code-block.label"));
    }

    const lang = this.getAttribute("language") || "";
    const file = this.getAttribute("filename") || "";

    // The header (with the copy button) is always present — the copy
    // affordance is the fixed feature; filename/language are optional within it.
    const { html, css } = codeBlockTemplate(this);
    this.render(html, css);

    this._slot = this.$("slot");
    this._copyBtn = this.$(".copy");
    this._status = this.$(".sr-status");
    this._gutter = null;

    if (this._copyBtn) {
      this._copyBtn.addEventListener("click", () => this.copy());
    }

    // Recompute line numbers / agent state whenever slotted content changes.
    this._onSlotChange = () => this._sync();
    this._slot.addEventListener("slotchange", this._onSlotChange);
    this._sync();

    REGISTRY.set(this._id, {
      el: this,
      getText: () => this.getText(),
      copy: () => this.copy(),
      language: lang,
      filename: file,
    });

    // Subscribe once to locale changes; update text nodes in place.
    if (!this._i18nOff) this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    REGISTRY.delete(this._id);
    this._i18nOff?.();
    this._i18nOff = null;
  }

  // Update only the already-rendered i18n nodes in place (no re-render).
  _applyI18n() {
    // Only re-localize the host aria-label when the component owns it (no
    // filename and the current value is a known localized default) — never
    // clobber a consumer-provided aria-label.
    if (!this.hasAttribute("filename")) {
      const cur = this.getAttribute("aria-label");
      const owned = LABELS.has(cur);
      if (cur == null || owned) this.setAttribute("aria-label", t("code-block.label"));
    }
    if (this._copyBtn) {
      const ok = this._copyBtn.classList.contains("ok");
      const label = this._copyBtn.querySelector(".copy-label");
      if (label) label.textContent = ok ? t("code-block.copied") : t("code-block.copy");
      this._copyBtn.setAttribute(
        "aria-label",
        ok ? t("code-block.copiedAria") : t("code-block.copyAria")
      );
    }
  }

  attributeChangedCallback() {
    // Re-render when header-affecting attributes change after first connect.
    if (this.isConnected && this._slot) this.connectedCallback();
  }

  // Raw text of the slotted code, whitespace preserved.
  getText() {
    if (!this._slot) return (this.textContent || "");
    const nodes = this._slot.assignedNodes({ flatten: true });
    if (!nodes.length) return (this.textContent || "");
    return nodes.map((n) => n.textContent).join("");
  }

  async copy() {
    const text = this.getText();
    let ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch (_) {
      ok = false;
    }
    if (!ok) ok = this._fallbackCopy(text);

    if (this._copyBtn) {
      this._copyBtn.classList.toggle("ok", ok);
      const label = this._copyBtn.querySelector(".copy-label");
      if (label) label.textContent = ok ? t("code-block.copied") : t("code-block.copy");
      this._copyBtn.setAttribute(
        "aria-label",
        ok ? t("code-block.copiedAria") : t("code-block.copyAria")
      );
      clearTimeout(this._resetT);
      this._resetT = setTimeout(() => {
        this._copyBtn.classList.remove("ok");
        const l = this._copyBtn.querySelector(".copy-label");
        if (l) l.textContent = t("code-block.copy");
        this._copyBtn.setAttribute("aria-label", t("code-block.copyAria"));
      }, 1600);
    }
    if (this._status) this._status.textContent = ok ? t("code-block.copied") : t("code-block.copyFailed");

    if (ok) {
      this.dispatchEvent(
        new CustomEvent("pura-copy", { detail: { text }, bubbles: true })
      );
    }
    return ok;
  }

  _fallbackCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      ta.style.pointerEvents = "none";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  }

  _sync() {
    const text = this.getText();
    const lines = text.length ? text.replace(/\n$/, "").split("\n") : [];
    const count = lines.length || 1;

    // Reflect machine-readable state onto the host.
    this.setAttribute("data-language", this.getAttribute("language") || "");
    this.setAttribute("data-filename", this.getAttribute("filename") || "");
    this.setAttribute("data-lines", String(count));
    this.setAttribute("data-numbered", this.hasAttribute("numbered") ? "true" : "false");

    const entry = REGISTRY.get(this._id);
    if (entry) {
      entry.language = this.getAttribute("language") || "";
      entry.filename = this.getAttribute("filename") || "";
    }

    this._renderGutter(count);
  }

  _renderGutter(count) {
    const body = this.$(".body");
    if (!body) return;
    const existing = body.querySelector(".gutter");
    if (!this.hasAttribute("numbered")) {
      if (existing) existing.remove();
      this._gutter = null;
      return;
    }
    const gutter = existing || document.createElement("div");
    if (!existing) {
      gutter.className = "gutter";
      gutter.setAttribute("part", "gutter");
      gutter.setAttribute("aria-hidden", "true");
      body.insertBefore(gutter, body.firstChild);
    }
    let nums = "";
    for (let i = 1; i <= count; i++) nums += `<span>${i}</span>`;
    gutter.innerHTML = nums;
    this._gutter = gutter;
  }
}

define("pura-code-block", PuraCodeBlock, meta);
export { PuraCodeBlock };

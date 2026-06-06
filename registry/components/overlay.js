// <pura-overlay> a standalone dimming scrim / loading overlay layer, separate
// from dialog.
// Attributes:
//   open         boolean visibility
//   target       "page" (default, fixed full-screen) or "parent" (absolute, covers
//                the nearest positioned ancestor of the host)
//   blur         apply a backdrop-filter blur to the scrim
//   spinner      center a spinner (and optional message)
//   message      text shown under the spinner
//   dismissable  clicking the scrim closes and dispatches "close"
// Slot: default = custom centered content. Parts: scrim, content.
// Methods: open(), close(). Event: close.
import { PuraElement, define } from "../base.js";
import meta from "./overlay.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "overlay.loading": {
    en: "Loading",
    "pt-BR": "Carregando",
    fr: "Chargement",
    de: "Wird geladen",
    it: "Caricamento",
  },
});

class PuraOverlay extends PuraElement {
  static observedAttributes = ["open", "target", "blur", "spinner", "message", "dismissable"];

  connectedCallback() {
    this._renderAll();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, _value) {
    if (!this.isConnected) return;
    if (name === "open") {
      this._syncOpen();
      return;
    }
    if (name === "message") {
      const msg = this.$(".msg");
      if (msg) msg.textContent = this.getAttribute("message") || "";
      return;
    }
    this._renderAll();
  }

  _applyI18n() {
    const sp = this.$(".scrim");
    if (sp) sp.setAttribute("aria-label", t("overlay.loading"));
  }

  _renderAll() {
    const showSpinner = this.bool("spinner");
    const message = this.getAttribute("message") || "";
    this.render(
      `<div class="scrim" part="scrim" role="presentation"
         aria-label="${t("overlay.loading")}">
         <div class="content" part="content">
           ${showSpinner ? `<span class="spinner" aria-hidden="true"></span>` : ""}
           ${showSpinner && message ? `<span class="msg">${esc(message)}</span>` : ""}
           <slot></slot>
         </div>
       </div>`,
      CSS
    );
    this._scrim = this.$(".scrim");
    this._scrim.addEventListener("click", (e) => {
      // Only the scrim itself (not its content) dismisses.
      if (e.target === this._scrim && this.bool("dismissable")) this.close();
    });
    this._syncOpen();
  }

  _syncOpen() {
    const open = this.hasAttribute("open");
    this.dataset.open = open ? "true" : "false";
    if (this._scrim) this._scrim.setAttribute("aria-hidden", open ? "false" : "true");
  }

  open() {
    if (!this.hasAttribute("open")) this.setAttribute("open", "");
    this._syncOpen();
  }

  close() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    this._syncOpen();
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const CSS = `
  :host { display: contents; }

  .scrim {
    position: fixed; inset: 0; z-index: 1000;
    display: none; align-items: center; justify-content: center;
    background: rgb(0 0 0 / 0.45);
    opacity: 0; transition: opacity var(--pura-dur) var(--pura-ease);
  }
  :host([open]) .scrim { display: flex; opacity: 1; }
  :host([blur]) .scrim { backdrop-filter: blur(3px); }

  /* target=parent covers the nearest positioned ancestor of the host */
  :host([target="parent"]) .scrim { position: absolute; }

  .content {
    display: flex; flex-direction: column; align-items: center;
    gap: var(--pura-space-3); color: var(--pura-primary-fg);
    text-align: center; max-width: 90%;
  }

  .spinner {
    width: 2rem; height: 2rem;
    border: 3px solid color-mix(in srgb, #fff 30%, transparent);
    border-top-color: #fff; border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  .msg { font-size: var(--pura-text-sm); color: #fff; }

  @keyframes pura-spin { to { transform: rotate(360deg); } }
`;

define("pura-overlay", PuraOverlay, meta);
export { PuraOverlay };

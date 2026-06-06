// <pura-dialog> — modal built on the native <dialog> element (focus trap +
// backdrop + ESC for free). Named slots: header, footer. Default slot = body.
// API: .open() / .close(), or attribute `open`. Attribute: title.
import { PuraElement, define } from "../base.js";
import meta from "./dialog.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "dialog.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
});

class PuraDialog extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this.render(
      `<dialog part="dialog">
         <header part="header">
           <span class="title"><slot name="header">${this.getAttribute("title") || ""}</slot></span>
           <button class="x" part="close" aria-label="${t("dialog.close")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           </button>
         </header>
         <div part="body"><slot></slot></div>
         <footer part="footer"><slot name="footer"></slot></footer>
       </dialog>`,
      CSS
    );
    this._dlg = this.$("dialog");
    this.$(".x").addEventListener("click", () => this.close());
    this._dlg.addEventListener("click", (e) => { if (e.target === this._dlg) this.close(); });
    this._dlg.addEventListener("close", () => {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    });
    const footSlot = this.$('slot[name="footer"]');
    const foot = this.$('footer');
    const upd = () => (foot.style.display = footSlot.assignedNodes().length ? "" : "none");
    footSlot.addEventListener("slotchange", upd); upd();
    if (this.hasAttribute("open")) this.open();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    this.$(".x")?.setAttribute("aria-label", t("dialog.close"));
  }

  attributeChangedCallback(_n, o, v) {
    if (!this._dlg) return;
    if (v !== null && !this._dlg.open) this._dlg.showModal();
    if (v === null && this._dlg.open) this._dlg.close();
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
}

const CSS = `
  dialog {
    padding: 0; border: 1px solid var(--pura-border); color: var(--pura-fg);
    border-radius: var(--pura-radius-lg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); width: min(32rem, calc(100vw - 2rem));
    opacity: 0; transform: translateY(8px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  dialog[open] { opacity: 1; transform: none; }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }
  header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); padding: var(--pura-space-5) var(--pura-space-5) var(--pura-space-3); }
  .title { font-size: var(--pura-text-lg); font-weight: 600; }
  .x { display: grid; place-items: center; width: 1.75rem; height: 1.75rem;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm); transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur); }
  .x:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .x svg { width: 1.1rem; height: 1.1rem; }
  [part="body"] { padding: 0 var(--pura-space-5) var(--pura-space-5);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
  footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5); border-top: 1px solid var(--pura-border);
    background: var(--pura-subtle); }
`;

define("pura-dialog", PuraDialog, meta);
export { PuraDialog };

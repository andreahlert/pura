// <pura-sheet> — slide-in panel on top of a modal backdrop. Built on the native
// <dialog> element (focus trap + ESC + backdrop for free). Slots: header,
// footer, default = body. Attributes: side (right default | left | top | bottom),
// title, open. API: .open() / .close().
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "sheet.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
});

class PuraSheet extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this.render(
      `<dialog part="sheet">
         <header part="header">
           <span class="title"><slot name="header">${this.getAttribute("title") || ""}</slot></span>
           <button class="x" part="close" aria-label="${t("sheet.close")}">
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
    const foot = this.$("footer");
    const upd = () => (foot.style.display = footSlot.assignedNodes().length ? "" : "none");
    footSlot.addEventListener("slotchange", upd); upd();
    if (this.hasAttribute("open")) this.open();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    this.$(".x")?.setAttribute("aria-label", t("sheet.close"));
  }

  attributeChangedCallback(_n, _o, v) {
    if (!this._dlg) return;
    if (v !== null && !this._dlg.open) this._dlg.showModal();
    if (v === null && this._dlg.open) this._dlg.close();
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
}

const CSS = `
  dialog {
    padding: 0; border: none; color: var(--pura-fg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); display: flex; flex-direction: column;
    position: fixed; max-height: 100dvh; max-width: 100vw;
  }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); opacity: 0; transition: opacity var(--pura-dur) var(--pura-ease); }
  dialog[open]::backdrop { opacity: 1; }

  /* right (default) */
  dialog { inset: 0 0 0 auto; height: 100dvh; width: min(24rem, 92vw);
    border-left: 1px solid var(--pura-border); transform: translateX(100%);
    transition: transform var(--pura-dur) var(--pura-ease); }
  dialog[open] { transform: none; }
  :host([side="left"]) dialog { inset: 0 auto 0 0; border-left: none; border-right: 1px solid var(--pura-border); transform: translateX(-100%); }
  :host([side="top"]) dialog { inset: 0 0 auto 0; width: 100vw; height: auto; max-height: 85dvh; border: none; border-bottom: 1px solid var(--pura-border); transform: translateY(-100%); }
  :host([side="bottom"]) dialog { inset: auto 0 0 0; width: 100vw; height: auto; max-height: 85dvh; border: none; border-top: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg) var(--pura-radius-lg) 0 0; transform: translateY(100%); }

  header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); padding: var(--pura-space-5); }
  .title { font-size: var(--pura-text-lg); font-weight: 600; }
  .x { display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border: none;
    background: transparent; color: var(--pura-muted); cursor: pointer; border-radius: var(--pura-radius-sm); }
  .x:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .x svg { width: 1.1rem; height: 1.1rem; }
  [part="body"] { padding: 0 var(--pura-space-5) var(--pura-space-5); overflow: auto; flex: 1;
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
  footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5); border-top: 1px solid var(--pura-border); }
`;

define("pura-sheet", PuraSheet);
export { PuraSheet };

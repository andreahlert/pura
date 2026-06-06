// <pura-app-shell> is a top level page scaffold that wires app chrome together.
// Named slots: header (top bar), sidebar (left nav), footer (bottom), and the
// default slot for the main content. Layout is a CSS grid: header spans the top,
// sidebar sits on the left (sticky), content scrolls in the middle, footer at the
// bottom. Empty slot regions collapse cleanly (slotchange). Under a narrow width
// the sidebar becomes an off canvas overlay toggled via .toggleSidebar().
//
// Attributes:
//   sidebar-collapsed (bool) hides or narrows the sidebar.
//   sidebar-width  (CSS length, default 16rem) desktop sidebar width.
//   header-height  (CSS length, default 3.5rem) header row height.
//   fixed-header   (bool) makes the header sticky at the top.
// Method: .toggleSidebar(). On desktop it flips sidebar-collapsed, on mobile it
// opens or closes the off canvas overlay. Dispatches a "sidebartoggle"
// CustomEvent with detail { collapsed, open, mobile }.
// Parts: shell, header, sidebar, main, footer.
import { PuraElement, define } from "../base.js";
import meta from "./app-shell.meta.js";

// Only allow length-ish tokens to reach inline styles (guards CSS injection).
const LEN = /^[\d.]+(px|rem|em|vw|vh|ch|%)$/i;

class PuraAppShell extends PuraElement {
  static observedAttributes = ["sidebar-width", "header-height", "sidebar-collapsed"];

  connectedCallback() {
    this.render(
      `<div part="shell" class="shell">
         <header part="header" class="header"><slot name="header"></slot></header>
         <aside part="sidebar" class="sidebar"><slot name="sidebar"></slot></aside>
         <div part="scrim" class="scrim"></div>
         <main part="main" class="main"><slot></slot></main>
         <footer part="footer" class="footer"><slot name="footer"></slot></footer>
       </div>`,
      CSS
    );

    this._scrim = this.$(".scrim");
    this._scrim.addEventListener("click", () => this._closeMobile());

    // Collapse empty slot regions. Same pattern as sidebar.js.
    this._regions = [
      ["header", '.header'],
      ["sidebar", '.sidebar'],
      ["footer", '.footer'],
    ];
    this._slotHandlers = [];
    // When a region is empty, hide its box AND zero its grid track so no dead
    // band/gutter is left. The track is driven by a host variable (like the
    // max var in container.js) so empty can collapse it to 0.
    const trackVar = { header: "--shell-header-row", sidebar: "--shell-sidebar-col" };
    for (const [name, sel] of this._regions) {
      const slot = this.$(`slot[name="${name}"]`);
      const box = this.$(sel);
      const upd = () => {
        const empty = !slot.assignedNodes().length;
        box.style.display = empty ? "none" : "";
        const v = trackVar[name];
        if (v) {
          if (empty) this.style.setProperty(v, "0");
          else this.style.removeProperty(v);
        }
      };
      slot.addEventListener("slotchange", upd);
      this._slotHandlers.push([slot, upd]);
      upd();
    }

    this._applyWidth();
    this._applyHeaderHeight();

    // Responsive mode: inline sidebar on desktop, off canvas overlay on mobile.
    this._mq = window.matchMedia("(max-width: 768px)");
    this._onMq = () => this._applyMode();
    this._mq.addEventListener("change", this._onMq);
    this._applyMode();
  }

  disconnectedCallback() {
    this._mq?.removeEventListener("change", this._onMq);
    for (const [slot, upd] of this._slotHandlers || []) {
      slot.removeEventListener("slotchange", upd);
    }
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot.childElementCount) return;
    if (name === "sidebar-width") this._applyWidth();
    else if (name === "header-height") this._applyHeaderHeight();
    else if (name === "sidebar-collapsed") this._applyMode();
  }

  get _mobile() {
    return this._mq ? this._mq.matches : false;
  }

  _applyWidth() {
    const v = (this.getAttribute("sidebar-width") || "").trim();
    if (v && LEN.test(v)) this.style.setProperty("--shell-sidebar-width", v);
    else this.style.removeProperty("--shell-sidebar-width");
  }

  _applyHeaderHeight() {
    const v = (this.getAttribute("header-height") || "").trim();
    if (v && LEN.test(v)) this.style.setProperty("--shell-header-height", v);
    else this.style.removeProperty("--shell-header-height");
  }

  // When switching to desktop, drop any open mobile overlay state.
  _applyMode() {
    if (!this._mobile) {
      this.removeAttribute("sidebar-open");
    }
  }

  _closeMobile() {
    if (this.hasAttribute("sidebar-open")) {
      this.removeAttribute("sidebar-open");
      this._emit();
    }
  }

  // Dual mode: desktop flips sidebar-collapsed, mobile opens the overlay.
  toggleSidebar() {
    if (this._mobile) {
      this.toggleAttribute("sidebar-open");
    } else {
      this.toggleAttribute("sidebar-collapsed");
    }
    this._emit();
  }

  _emit() {
    this.dispatchEvent(
      new CustomEvent("sidebartoggle", {
        bubbles: true,
        detail: {
          collapsed: this.hasAttribute("sidebar-collapsed"),
          open: this.hasAttribute("sidebar-open"),
          mobile: this._mobile,
        },
      })
    );
  }
}

const CSS = `
  :host {
    display: block; height: 100%;
    --shell-sidebar-width: 16rem;
    --shell-header-height: 3.5rem;
    --shell-rail-width: 3.5rem;
    /* Track sources. Inline-overridden to 0 when a region is empty. */
    --shell-header-row: var(--shell-header-height);
    --shell-sidebar-col: var(--shell-sidebar-width);
  }

  .shell {
    display: grid; height: 100%; min-height: 0;
    background: var(--pura-bg); color: var(--pura-fg);
    grid-template-columns: var(--shell-sidebar-col) 1fr;
    grid-template-rows: var(--shell-header-row) 1fr auto;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    transition: grid-template-columns var(--pura-dur) var(--pura-ease);
  }

  .header {
    grid-area: header; display: flex; align-items: center;
    min-height: 0; min-width: 0;
    border-bottom: 1px solid var(--pura-border);
    background: var(--pura-bg);
  }
  :host([fixed-header]) .header {
    position: sticky; top: 0; z-index: 30;
  }

  .sidebar {
    grid-area: sidebar; min-height: 0; overflow: auto;
    border-right: 1px solid var(--pura-border);
    background: var(--pura-subtle);
    transition: width var(--pura-dur) var(--pura-ease);
  }

  .main {
    grid-area: main; min-width: 0; min-height: 0; overflow: auto;
  }

  .footer {
    grid-area: footer; min-width: 0;
    border-top: 1px solid var(--pura-border);
    background: var(--pura-bg);
  }

  /* Desktop collapsed: narrow the sidebar column to an icon rail. An empty
     sidebar (inline --shell-sidebar-col: 0) still overrides this to 0. */
  :host([sidebar-collapsed]:not([sidebar-open])) {
    --shell-sidebar-col: var(--shell-rail-width);
  }

  /* Scrim only matters in the mobile overlay state. */
  .scrim { display: none; }

  /* Mobile: sidebar becomes a fixed off canvas overlay sliding from the left. */
  @media (max-width: 768px) {
    .shell {
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "main"
        "footer";
    }
    .sidebar {
      position: fixed; inset: 0 auto 0 0; z-index: 50;
      width: min(18rem, 86vw); height: 100dvh;
      box-shadow: var(--pura-shadow-lg);
      transform: translateX(-100%);
      transition: transform var(--pura-dur) var(--pura-ease);
    }
    :host([sidebar-open]) .sidebar { transform: none; }

    .scrim {
      display: block; position: fixed; inset: 0; z-index: 40;
      background: rgb(0 0 0 / 0.45);
      opacity: 0; pointer-events: none;
      transition: opacity var(--pura-dur) var(--pura-ease);
    }
    :host([sidebar-open]) .scrim { opacity: 1; pointer-events: auto; }
  }
`;

define("pura-app-shell", PuraAppShell, meta);
export { PuraAppShell };

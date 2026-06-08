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
import { appShellTemplate } from "./app-shell.template.js";

// Only allow length-ish tokens to reach inline styles (guards CSS injection).
const LEN = /^[\d.]+(px|rem|em|vw|vh|ch|%)$/i;

class PuraAppShell extends PuraElement {
  static observedAttributes = ["sidebar-width", "header-height", "sidebar-collapsed"];

  connectedCallback() {
    const { html, css } = appShellTemplate(this);
    this.render(html, css);

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


define("pura-app-shell", PuraAppShell, meta);
export { PuraAppShell };

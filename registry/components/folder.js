// <pura-folder> — a stylized paper folder that opens on hover or click,
// revealing up to three papers (named slots) that rise and fan out above the
// cover. The folder is drawn entirely in CSS (back panel, tab, papers, front
// cover); opening is a rotateX transition on the front cover plus staggered
// translate/rotate on the papers. A decorative micro-component for feature
// and download sections, inspired by React Bits' Folder.
//
// Attributes:
//   open    — boolean; forces the open state (works without hover).
//   trigger — "hover" (default) | "click". hover opens on :hover via pure
//             CSS; click makes the folder a keyboard-operable toggle button.
//   papers  — number of paper sheets, 1..3 (default 3).
//   color   — folder color (any CSS color); the --pura-folder-color token
//             still wins if set.
//
// Slots: paper-1, paper-2, paper-3 — content of each sheet (images, text).
// Events: open, close — fired when the open attribute is toggled.
//
// Tokens: --pura-folder-color, --pura-folder-size, --pura-folder-paper,
//   --pura-folder-duration, --pura-folder-radius.
// SSR / pre-JS: paints the closed folder; hover opening needs no JS at all.
// Reduced motion: the shared reset collapses the transitions, so open/close
//   snap instantly to their final state.
//
// Agent-native layer: each instance registers in window.__puraFolders by
//   data-pura-id with { open, close, toggle, el }; data-pura-folder-open
//   mirrors the open attribute state.
import { PuraElement, define } from "../base.js";
import meta from "./folder.meta.js";
import { folderTemplate } from "./folder.template.js";

let uid = 0;

function registry() {
  return (window.__puraFolders ||= new Map());
}

class PuraFolder extends PuraElement {
  static get observedAttributes() {
    return ["open"];
  }

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-folder-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = folderTemplate(this);
    this.render(html, css);

    this._bind();
    this._mirror();
    registry().set(this._id, {
      id: this._id,
      open: () => this.open(),
      close: () => this.close(),
      toggle: () => this.toggle(),
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "open" || oldValue === newValue || !this._id) return;
    this._mirror();
    this.dispatchEvent(
      new CustomEvent(newValue !== null ? "open" : "close", { bubbles: true, composed: true }),
    );
  }

  // ---- config ---------------------------------------------------------------
  get isOpen() {
    return this.hasAttribute("open");
  }
  get trigger() {
    return this.getAttribute("trigger") === "click" ? "click" : "hover";
  }

  // ---- public API -----------------------------------------------------------
  open() {
    this.setAttribute("open", "");
  }

  close() {
    this.removeAttribute("open");
  }

  toggle() {
    this.toggleAttribute("open");
  }

  // ---- internals ------------------------------------------------------------
  _bind() {
    if (this.trigger !== "click") return;
    const folder = this.$(".folder");
    folder.addEventListener("click", () => this.toggle());
    folder.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  // Mirror state into data-pura-* and ARIA for the agent-native layer.
  _mirror() {
    this.toggleAttribute("data-pura-folder-open", this.isOpen);
    const folder = this.$(".folder");
    if (folder && this.trigger === "click") {
      folder.setAttribute("aria-expanded", String(this.isOpen));
    }
  }
}

define("pura-folder", PuraFolder, meta);
export { PuraFolder };

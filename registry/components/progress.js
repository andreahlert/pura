// <pura-progress value="0..100"> — determinate bar. Add `indeterminate` for
// an animated unknown-progress state.
import { PuraElement, define } from "../base.js";
import meta from "./progress.meta.js";

class PuraProgress extends PuraElement {
  static observedAttributes = ["value", "indeterminate"];

  connectedCallback() {
    this.render(
      `<div part="track" role="progressbar" aria-valuemin="0" aria-valuemax="100">
         <div class="fill" part="fill"></div>
       </div>`,
      CSS
    );
    this._fill = this.$(".fill");
    this._track = this.$('[part="track"]');
    // role=progressbar needs an accessible name. The host can't carry the role
    // (it's on the inner track), so forward the host's aria-label/labelledby
    // down to the element that actually has the role.
    const label = this.getAttribute("aria-label");
    const labelledby = this.getAttribute("aria-labelledby");
    if (label) this._track.setAttribute("aria-label", label);
    else if (labelledby) this._track.setAttribute("aria-labelledby", labelledby);
    this._sync();
  }

  attributeChangedCallback() { if (this._fill) this._sync(); }

  _sync() {
    const v = Math.max(0, Math.min(100, Number(this.getAttribute("value") || 0)));
    if (this.hasAttribute("indeterminate")) {
      this._track.removeAttribute("aria-valuenow");
    } else {
      this._fill.style.width = v + "%";
      this._track.setAttribute("aria-valuenow", v);
    }
  }
}

const CSS = `
  :host { display: block; }
  [part="track"] {
    width: 100%; height: 0.5rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); overflow: hidden;
  }
  .fill {
    height: 100%; width: 0%; border-radius: inherit;
    background: var(--pura-primary);
    transition: width var(--pura-dur) var(--pura-ease);
  }
  :host([indeterminate]) .fill {
    width: 40% !important;
    animation: pura-indet 1.1s var(--pura-ease) infinite;
  }
  @keyframes pura-indet {
    0% { transform: translateX(-120%); }
    100% { transform: translateX(280%); }
  }
`;

define("pura-progress", PuraProgress, meta);
export { PuraProgress };

// <pura-prose> — typography wrapper for slotted rich HTML (shadcn Typography).
// Styles default-slot content via ::slotted: h1–h4, p, a, strong, ul/ol/li,
// blockquote, code, pre, hr, img. Comfortable reading measure + vertical rhythm.
// No attributes; purely presentational. Theming via var(--pura-*) tokens.
import { PuraElement, define } from "../base.js";
import meta from "./prose.meta.js";
import { proseTemplate } from "./prose.template.js";

class PuraProse extends PuraElement {
  connectedCallback() {
    const { html, css } = proseTemplate(this);
    this.render(html, css);
  }
}


define("pura-prose", PuraProse, meta);
export { PuraProse };

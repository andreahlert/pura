// Pure render for <pura-flex>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function flexTemplate(el = EMPTY_SHIM) {
  const html = `<div part="flex"><slot></slot></div>`;
  return { html, css: FLEX_CSS };
}

export const FLEX_CSS = `
  :host { display: block; }
  :host([inline]) { display: inline-block; }

  [part="flex"] {
    display: flex;
    flex-direction: row;
    gap: var(--_gap, 0);
  }
  :host([inline]) [part="flex"] { display: inline-flex; }

  /* direction */
  :host([direction="col"]) [part="flex"] { flex-direction: column; }
  :host([direction="row-reverse"]) [part="flex"] { flex-direction: row-reverse; }
  :host([direction="col-reverse"]) [part="flex"] { flex-direction: column-reverse; }

  /* wrap */
  :host([wrap]) [part="flex"] { flex-wrap: wrap; }

  /* align-items */
  :host([align="start"]) [part="flex"] { align-items: flex-start; }
  :host([align="center"]) [part="flex"] { align-items: center; }
  :host([align="end"]) [part="flex"] { align-items: flex-end; }
  :host([align="stretch"]) [part="flex"] { align-items: stretch; }
  :host([align="baseline"]) [part="flex"] { align-items: baseline; }

  /* justify-content */
  :host([justify="start"]) [part="flex"] { justify-content: flex-start; }
  :host([justify="center"]) [part="flex"] { justify-content: center; }
  :host([justify="end"]) [part="flex"] { justify-content: flex-end; }
  :host([justify="between"]) [part="flex"] { justify-content: space-between; }
  :host([justify="around"]) [part="flex"] { justify-content: space-around; }
  :host([justify="evenly"]) [part="flex"] { justify-content: space-evenly; }
`;

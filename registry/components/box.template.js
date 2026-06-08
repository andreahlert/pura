// Pure render for <pura-box>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function boxTemplate(el = EMPTY_SHIM) {
  const html = `<div part="box"><slot></slot></div>`;
  return { html, css: BOX_CSS };
}

export const BOX_CSS = `
  :host { display: var(--_display, block); }

  [part="box"] {
    display: inherit;
    box-sizing: border-box;
    /* spacing custom props default to 0/auto when unset */
    padding: var(--_pt, 0) var(--_pr, 0) var(--_pb, 0) var(--_pl, 0);
    margin: var(--_mt, 0) var(--_mr, 0) var(--_mb, 0) var(--_ml, 0);
    width: var(--_w, auto);
    height: var(--_h, auto);
  }

  /* ---- background ---- */
  :host([bg="bg"]) [part="box"] { background: var(--pura-bg); }
  :host([bg="subtle"]) [part="box"] { background: var(--pura-subtle); }
  :host([bg="primary"]) [part="box"] { background: var(--pura-primary); color: var(--pura-primary-fg); }
  :host([bg="transparent"]) [part="box"] { background: transparent; }

  /* ---- text color (explicit color wins over bg's implicit color) ---- */
  :host([color="fg"]) [part="box"] { color: var(--pura-fg); }
  :host([color="muted"]) [part="box"] { color: var(--pura-muted-fg); }
  :host([color="primary"]) [part="box"] { color: var(--pura-primary); }

  /* ---- border ---- */
  :host([border]) [part="box"] { border: 1px solid var(--pura-border); }
  :host([border="strong"]) [part="box"] { border-color: var(--pura-border-strong); }

  /* ---- radius ---- */
  :host([radius="sm"]) [part="box"] { border-radius: var(--pura-radius-sm); }
  :host([radius="md"]) [part="box"] { border-radius: var(--pura-radius); }
  :host([radius="lg"]) [part="box"] { border-radius: var(--pura-radius-lg); }
  :host([radius="full"]) [part="box"] { border-radius: var(--pura-radius-full); }

  /* ---- shadow ---- */
  :host([shadow="sm"]) [part="box"] { box-shadow: var(--pura-shadow-sm); }
  :host([shadow="md"]) [part="box"] { box-shadow: var(--pura-shadow); }
  :host([shadow="lg"]) [part="box"] { box-shadow: var(--pura-shadow-lg); }
  :host([shadow="none"]) [part="box"] { box-shadow: none; }
`;

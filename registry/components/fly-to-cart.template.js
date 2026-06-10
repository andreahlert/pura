// Pure render for <pura-fly-to-cart>. No DOM; safe on server (SSR/DSD) and client.
// The shadow markup is just a slot wrapper — the flying dot is created at click
// time as a fixed-position element animated with WAAPI (it has to travel across
// the page, outside any shadow root).
import { EMPTY_SHIM } from "../base.js";

export function flyToCartTemplate(el = EMPTY_SHIM) {
  const html = `<span part="content" class="content"><slot></slot></span>`;
  const css = `
    :host { display: inline-block; }
    .content { display: inline-block; }
  `;
  return { html, css };
}

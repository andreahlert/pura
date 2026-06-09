// Pure render for <pura-count-up>. No DOM; safe on server (SSR/DSD).
import { EMPTY_SHIM } from "../base.js";

// Format a number with fixed decimals, an optional thousands separator, and
// optional prefix/suffix. Pure so the server and client agree byte-for-byte.
export function formatCount(n, { decimals = 0, separator = "", prefix = "", suffix = "" } = {}) {
  let s = Number(n).toFixed(decimals);
  if (separator) {
    const [int, frac] = s.split(".");
    s = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator) + (frac ? "." + frac : "");
  }
  return `${prefix}${s}${suffix}`;
}

export function readOptions(el) {
  const num = (a, d) => {
    const n = parseFloat(el.getAttribute(a));
    return Number.isFinite(n) ? n : d;
  };
  return {
    to: num("to", 0),
    from: num("from", 0),
    decimals: Math.max(0, num("decimals", 0)),
    separator: el.getAttribute("separator") || "",
    prefix: el.getAttribute("prefix") || "",
    suffix: el.getAttribute("suffix") || "",
  };
}

export function countUpTemplate(el = EMPTY_SHIM) {
  const opts = readOptions(el);
  // Render the final value so server output is correct and accessible; the
  // client re-renders and tweens from `from` up to it.
  const initial = formatCount(opts.to, opts);
  const html = `<span class="value" part="value">${initial}</span>`;
  return { html, css: COUNT_UP_CSS };
}

export const COUNT_UP_CSS = `
  :host { display: inline-block; font-variant-numeric: tabular-nums; }
`;

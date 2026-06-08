// Pure render for <pura-swatch-picker>. No DOM; SSR/DSD + client safe.
// Builds the full swatch grid from the resolved color list (the `colors`
// attribute, the .colors property, or DEFAULT_COLORS). Under EMPTY_SHIM
// el._colorsProp/el._value are undefined, so the grid renders DEFAULT_COLORS
// with nothing selected.
import { EMPTY_SHIM } from "../base.js";

const DEFAULT_COLORS = [
  "#ef4444", "#f59e0b", "#eab308", "#22c55e", "#14b8a6", "#3b82f6",
  "#6366f1", "#8b5cf6", "#ec4899", "#64748b",
];

// Quote-safe escaping for color values (swatch order: & < > " via replaceAll).
function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const CSS = `
  :host { display: block; }
  .grid {
    display: grid;
    gap: var(--pura-space-2);
  }
  .swatch {
    width: var(--swatch-size, 1.75rem);
    aspect-ratio: 1; padding: 0; cursor: pointer;
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-sm);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
    transition: transform var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .swatch:hover { transform: scale(1.08); }
  .swatch:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--pura-bg), 0 0 0 4px var(--pura-ring);
  }
  .swatch[aria-checked="true"] {
    box-shadow: 0 0 0 2px var(--pura-bg), 0 0 0 4px var(--pura-accent);
  }
`;

export function swatchPickerTemplate(el = EMPTY_SHIM) {
  const attr = el.getAttribute("colors");
  const colors =
    (Array.isArray(el._colorsProp) && el._colorsProp.length)
      ? el._colorsProp
      : attr
        ? attr.split(",").map((s) => s.trim()).filter(Boolean)
        : DEFAULT_COLORS;
  const cols = parseInt(el.getAttribute("columns"), 10);
  const sizeRaw = el.getAttribute("size");
  const size = !sizeRaw ? "1.75rem" : /^\d+$/.test(sizeRaw) ? `${sizeRaw}px` : sizeRaw;
  const value = el._value || "";

  const swatches = colors
    .map((c, i) => {
      const sel = String(c).toLowerCase() === String(value).toLowerCase();
      return `<button type="button" class="swatch" part="swatch" role="radio"
          data-color="${esc(c)}" aria-checked="${sel ? "true" : "false"}"
          aria-label="${esc(c)}" tabindex="${sel ? 0 : -1}"
          style="background:${esc(c)}"></button>`;
    })
    .join("");

  const html = `<div class="grid" part="grid" role="radiogroup"
         style="grid-template-columns:repeat(${cols > 0 ? cols : "auto-fill"}, minmax(${size}, 1fr));--swatch-size:${size}">
         ${swatches}
       </div>`;
  return { html, css: CSS };
}

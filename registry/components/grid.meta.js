export default {
  "name": "grid",
  "tag": "pura-grid",
  "category": "Primitives",
  "title": "Grid",
  "role": "",
  "summary": "CSS grid container primitive for building themeable, responsive two-dimensional layouts.",
  "attributes": [
    {
      "name": "cols",
      "type": "number | string",
      "default": "",
      "desc": "Column tracks: a bare integer becomes repeat(n, 1fr), or pass a raw track list such as \"1fr 2fr\" or \"200px 1fr\". When omitted, falls back to a responsive auto-fit layout."
    },
    {
      "name": "rows",
      "type": "number | string",
      "default": "none",
      "desc": "Row tracks: a bare integer becomes repeat(n, 1fr), or pass a raw track list."
    },
    {
      "name": "gap",
      "type": "number | string",
      "default": "4",
      "desc": "Gap between items: a space scale value (1-6) maps to var(--pura-space-N), or any CSS length such as \"2rem\"."
    },
    {
      "name": "align",
      "type": "string",
      "default": "stretch",
      "desc": "align-items value (start, center, end, stretch, baseline...)."
    },
    {
      "name": "justify",
      "type": "string",
      "default": "stretch",
      "desc": "justify-items value (start, center, end, stretch...)."
    },
    {
      "name": "flow",
      "type": "string",
      "default": "row",
      "desc": "grid-auto-flow value (row, column, dense, \"row dense\"...)."
    },
    {
      "name": "min",
      "type": "string",
      "default": "16rem",
      "desc": "Minimum track size for the responsive auto-fit fallback, applied only when cols is not set."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

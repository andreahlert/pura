export default {
  "name": "bento",
  "tag": "pura-bento",
  "category": "Animation",
  "animation": true,
  "title": "Bento Grid",
  "role": "",
  "summary": "Bento-style feature grid: child cells declare col-span/row-span attributes on a dense CSS grid, enter with a staggered fade/rise keyed off :nth-child, and lift with a shadow highlight on hover. Pure CSS, fully SSR-safe.",
  "attributes": [
    {
      "name": "cols",
      "type": "number",
      "default": "3",
      "desc": "Column count, 1 to 8."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "var(--pura-space-4)",
      "desc": "Grid gap, any CSS length."
    },
    {
      "name": "row",
      "type": "string",
      "default": "9rem",
      "desc": "Minimum auto row height (grid-auto-rows lower bound)."
    },
    {
      "name": "stagger",
      "type": "number",
      "default": "80",
      "desc": "Per-cell entrance delay in ms, 0 to 1000."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "600",
      "desc": "Entrance animation duration in ms, 0 to 5000."
    },
    {
      "name": "static",
      "type": "boolean",
      "default": "false",
      "desc": "Skip the entrance animation entirely."
    },
    {
      "name": "no-hover",
      "type": "boolean",
      "default": "false",
      "desc": "Disable the hover lift and highlight."
    },
    {
      "name": "col-span",
      "type": "number",
      "default": "1",
      "desc": "Set on a child cell: columns the cell spans, up to cols."
    },
    {
      "name": "row-span",
      "type": "number",
      "default": "1",
      "desc": "Set on a child cell: rows the cell spans, 2 to 4."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

export default {
  "name": "list",
  "tag": "pura-list",
  "category": "Display",
  "title": "List",
  "role": "",
  "summary": "A list primitive wrapping real ul/ol semantics with configurable marker style, gap, and inline layout, expecting pura-list-item children in its default slot.",
  "attributes": [
    { "name": "ordered", "type": "boolean", "default": "", "desc": "Render an ol instead of ul when present" },
    { "name": "marker", "type": "string", "default": "", "desc": "Bullet style: disc, decimal, none, or check" },
    { "name": "gap", "type": "string", "default": "", "desc": "Vertical (or horizontal) spacing between items (1..6)" },
    { "name": "inline", "type": "boolean", "default": "", "desc": "Lay items out horizontally when present" }
  ],
  "events": [],
  "slots": ["default"],
  "i18nKeys": []
};

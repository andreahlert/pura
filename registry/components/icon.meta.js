export default {
  "name": "icon",
  "tag": "pura-icon",
  "category": "Display",
  "title": "Icon",
  "role": "",
  "summary": "A generic inline icon renderer that renders from either a slotted SVG or an SVG path d string attribute, using currentColor stroke so color follows CSS.",
  "attributes": [
    { "name": "path", "type": "string", "default": "", "desc": "SVG path d string to render as an inline icon" },
    { "name": "d", "type": "string", "default": "", "desc": "Alias for path: SVG path d string to render" },
    { "name": "size", "type": "string", "default": "1.25rem", "desc": "Width and height of the icon" },
    { "name": "stroke-width", "type": "number", "default": "2", "desc": "SVG stroke width" },
    { "name": "label", "type": "string", "default": "", "desc": "Accessible aria-label; when absent the icon is aria-hidden" }
  ],
  "events": [],
  "slots": ["default"],
  "i18nKeys": []
};

export default {
  "name": "sparkline",
  "tag": "pura-sparkline",
  "category": "Display",
  "animation": true,
  "title": "Sparkline",
  "role": "",
  "summary": "Inline mini line chart, with no axes, that fits inside a sentence or a table cell.",
  "attributes": [
    {
      "name": "values",
      "type": "string",
      "default": "\"\"",
      "desc": "Comma-separated numbers, e.g. \"3,7,4,9,5,8\". Spaces are tolerated and non-numeric entries are discarded; empty/invalid draws nothing."
    },
    {
      "name": "width",
      "type": "number",
      "default": "80",
      "desc": "Chart width in px. Accepts a plain number."
    },
    {
      "name": "height",
      "type": "number",
      "default": "24",
      "desc": "Chart height in px. Accepts a plain number."
    },
    {
      "name": "color",
      "type": "string",
      "default": "var(--pura-fg)",
      "desc": "Color of the line, dot, and fill. Any CSS color."
    },
    {
      "name": "fill",
      "type": "boolean",
      "default": "false",
      "desc": "Draws a translucent area under the line (only with more than one value)."
    },
    {
      "name": "dot",
      "type": "boolean",
      "default": "false",
      "desc": "Draws a dot on the last value of the series."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

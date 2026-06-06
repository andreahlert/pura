export default {
  "name": "meter",
  "tag": "pura-meter",
  "category": "Display",
  "title": "Meter",
  "role": "",
  "summary": "Labeled measurement bar for a scalar value within a known range, with semantic color by threshold.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "min",
      "desc": "Current measurement; clamped within [min, max]."
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Lower bound of the range."
    },
    {
      "name": "max",
      "type": "number",
      "default": "1",
      "desc": "Upper bound of the range; raised to min if authored lower than min."
    },
    {
      "name": "low",
      "type": "number",
      "default": "min",
      "desc": "Upper bound of the \"low\" segment; clamped to [min, max]."
    },
    {
      "name": "high",
      "type": "number",
      "default": "max",
      "desc": "Lower bound of the \"high\" segment; clamped to [min, max] and ordered (>= low)."
    },
    {
      "name": "optimum",
      "type": "number",
      "default": "(min + max) / 2",
      "desc": "Optimum point; decides which segment is success, which is warning, and which is danger."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Descriptive caption (e.g., \"Disk usage\"). Optional."
    },
    {
      "name": "value-text",
      "type": "string",
      "default": "numeric value",
      "desc": "Overrides the displayed value string (e.g., \"42 GB\")."
    },
    {
      "name": "hide-value",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the value text, leaving only the bar and the label."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

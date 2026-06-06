export default {
  "name": "progress-ring",
  "tag": "pura-progress-ring",
  "category": "Display",
  "title": "Progress Ring",
  "role": "",
  "summary": "Circular progress ring that shows the percentage in the center, with an animated indeterminate mode.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Progress from 0 to 100 (clamped). Ignored when indeterminate."
    },
    {
      "name": "size",
      "type": "number",
      "default": "64",
      "desc": "Ring diameter in px. A plain number or a px value."
    },
    {
      "name": "thickness",
      "type": "number",
      "default": "6",
      "desc": "Stroke width in px, capped at half the size."
    },
    {
      "name": "indeterminate",
      "type": "boolean",
      "default": "false",
      "desc": "Spins continuously and hides the percentage label (unknown progress)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"<value> percent\"",
      "desc": "Overrides the accessible name (aria-label)."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

export default {
  "name": "stat",
  "tag": "pura-stat",
  "category": "Display",
  "title": "Stat",
  "role": "",
  "summary": "Metric card with a prominent value, a label, and a colored delta with a trend arrow.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Descriptive caption for the metric (e.g. \"Revenue\")."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "The prominent number (e.g. \"$48.2k\", \"1,204\")."
    },
    {
      "name": "delta",
      "type": "string",
      "default": "",
      "desc": "Change text (e.g. \"+12%\", \"-3.4%\"). The delta line only appears when filled in."
    },
    {
      "name": "trend",
      "type": "\"up\" | \"down\" | \"flat\"",
      "default": "(inferred from the sign of the delta)",
      "desc": "Arrow direction and color. When omitted, it is inferred from the sign of the delta (+ = up, - = down, otherwise flat)."
    }
  ],
  "events": [],
  "slots": [
    "icon"
  ],
  "i18nKeys": []
};

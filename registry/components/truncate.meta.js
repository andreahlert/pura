export default {
  "name": "truncate",
  "tag": "pura-truncate",
  "category": "Utility",
  "title": "Truncate",
  "role": "",
  "summary": "Limits text to N lines with an ellipsis and a \"more\"/\"less\" button to expand it.",
  "attributes": [
    {
      "name": "lines",
      "type": "number",
      "default": "3",
      "desc": "Number of visible lines when collapsed (minimum 1)."
    },
    {
      "name": "expanded",
      "type": "boolean",
      "default": "false",
      "desc": "Present = starts expanded; reflected as state."
    },
    {
      "name": "more-label",
      "type": "string",
      "default": "more",
      "desc": "Label for the expand button."
    },
    {
      "name": "less-label",
      "type": "string",
      "default": "less",
      "desc": "Label for the collapse button."
    }
  ],
  "events": [
    "toggle"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};

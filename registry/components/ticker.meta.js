export default {
  "name": "ticker",
  "tag": "pura-ticker",
  "category": "Display",
  "animation": true,
  "title": "Ticker",
  "role": "",
  "summary": "A number that animates scrolling from the previous value up to the new one, with locale-aware thousands separators.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Target number; animates from the previous value when it changes."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "800",
      "desc": "Animation duration in ms (ignored under prefers-reduced-motion)."
    },
    {
      "name": "decimals",
      "type": "number",
      "default": "inferred from value",
      "desc": "Fixed number of decimal places; if omitted, inferred from the literal value."
    },
    {
      "name": "locale",
      "type": "string",
      "default": "document locale",
      "desc": "Intl locale used for grouping and separators."
    },
    {
      "name": "prefix",
      "type": "string",
      "default": "\"\"",
      "desc": "Text rendered before the number (e.g. \"$\")."
    },
    {
      "name": "suffix",
      "type": "string",
      "default": "\"\"",
      "desc": "Text rendered after the number (e.g. \"%\")."
    },
    {
      "name": "label",
      "type": "string",
      "default": "none",
      "desc": "Accessible label for the value (composes the aria-label)."
    }
  ],
  "events": [
    "ticker:start",
    "ticker:end"
  ],
  "slots": [],
  "i18nKeys": []
};

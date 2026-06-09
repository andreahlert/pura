export default {
  "name": "count-up",
  "tag": "pura-count-up",
  "category": "Display",
  "animation": true,
  "title": "Count Up",
  "role": "",
  "summary": "Animates a number from a start to a target with eased counting, starts on view, jumps to the final value under reduced motion.",
  "attributes": [
    {
      "name": "to",
      "type": "number",
      "default": "0",
      "desc": "Target number to count up (or down) to. Required."
    },
    {
      "name": "from",
      "type": "number",
      "default": "0",
      "desc": "Starting number."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "token --pura-duration-6",
      "desc": "Tween length in milliseconds."
    },
    {
      "name": "decimals",
      "type": "number",
      "default": "0",
      "desc": "Fixed decimal places."
    },
    {
      "name": "separator",
      "type": "string",
      "default": "",
      "desc": "Thousands separator, e.g. \",\"."
    },
    {
      "name": "prefix",
      "type": "string",
      "default": "",
      "desc": "String prepended to the number, e.g. \"$\"."
    },
    {
      "name": "suffix",
      "type": "string",
      "default": "",
      "desc": "String appended to the number, e.g. \"%\"."
    },
    {
      "name": "start",
      "type": "\"view\" | \"load\" | \"manual\"",
      "default": "view",
      "desc": "When to begin: on first intersection, immediately on load, or only via start()."
    }
  ],
  "events": [
    "pura-count-up"
  ],
  "slots": [],
  "i18nKeys": []
};

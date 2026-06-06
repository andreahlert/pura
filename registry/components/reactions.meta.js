export default {
  "name": "reactions",
  "tag": "pura-reactions",
  "category": "Display",
  "title": "Reactions",
  "role": "",
  "summary": "Bar of emoji pills where each click toggles the reaction and adjusts the counter.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "\"Reactions\"",
      "desc": "On <pura-reactions>: accessible label for the group (aria-label)."
    },
    {
      "name": "emoji",
      "type": "string",
      "default": "\"\"",
      "desc": "On <pura-reaction>: the emoji glyph displayed (e.g., \"👍\"). Empty if absent."
    },
    {
      "name": "count",
      "type": "integer",
      "default": "0",
      "desc": "On <pura-reaction>: current counter (reflected). Hidden when zero."
    },
    {
      "name": "active",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-reaction>: indicates the user reacted; pill highlighted with aria-pressed=true."
    },
    {
      "name": "label",
      "type": "string",
      "default": "(emoji)",
      "desc": "On <pura-reaction>: optional accessible label for the reaction (e.g., \"Like\"). Falls back to the emoji if absent."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-reaction>: makes the pill non-interactive."
    }
  ],
  "events": [
    "react"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

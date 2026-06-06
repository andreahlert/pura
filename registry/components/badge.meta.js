export default {
  "name": "badge",
  "tag": "pura-badge",
  "category": "Display",
  "title": "Badge",
  "role": "",
  "summary": "Compact label for indicating status, categories or counts.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"neutral\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
      "default": "neutral",
      "desc": "Defines the color scheme of the badge."
    },
    {
      "name": "dot",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows a colored dot before the content."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

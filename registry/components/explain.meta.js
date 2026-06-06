export default {
  "name": "explain",
  "tag": "pura-explain",
  "category": "Agent",
  "title": "Explain",
  "role": "",
  "summary": "Attaches a plain-language explanation to a piece of content, visible to humans in a popover and always readable by screen readers and agents.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "The plain-language explanation. Optional if a child with slot=\"explanation\" is provided. The text attribute takes priority when both are present."
    },
    {
      "name": "placement",
      "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
      "default": "bottom",
      "desc": "Position of the popover relative to the content. Unknown values are normalized to bottom."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Explanation",
      "desc": "Accessible label for the \"?\" trigger button."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected boolean; present while the popover is open. Can be set to open the popover programmatically."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "(default)",
    "explanation"
  ],
  "i18nKeys": []
};

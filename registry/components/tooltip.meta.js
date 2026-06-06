export default {
  "name": "tooltip",
  "tag": "pura-tooltip",
  "category": "Overlay",
  "title": "Tooltip",
  "role": "",
  "summary": "Floating hint that appears when you hover over or focus an element.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "\"\"",
      "desc": "Text shown inside the hint."
    },
    {
      "name": "placement",
      "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
      "default": "top",
      "desc": "Position of the hint relative to the trigger."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

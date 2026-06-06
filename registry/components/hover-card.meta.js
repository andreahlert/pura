export default {
  "name": "hover-card",
  "tag": "pura-hover-card",
  "category": "Overlay",
  "title": "Hover Card",
  "role": "",
  "summary": "Informational card that reveals rich content when you hover over or focus the trigger.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls/reflects the visibility of the card; present when open."
    },
    {
      "name": "placement",
      "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
      "default": "bottom",
      "desc": "Position of the card relative to the trigger."
    },
    {
      "name": "open-delay",
      "type": "number (ms)",
      "default": "150",
      "desc": "Delay in milliseconds before opening when user intent is detected."
    },
    {
      "name": "close-delay",
      "type": "number (ms)",
      "default": "150",
      "desc": "Delay in milliseconds before closing when leaving the trigger and the card."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "i18nKeys": []
};

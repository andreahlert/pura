export default {
  "name": "popover",
  "tag": "pura-popover",
  "category": "Overlay",
  "title": "Popover",
  "role": "",
  "summary": "Floating panel anchored to a trigger, with click-outside and ESC dismissal.",
  "attributes": [
    {
      "name": "placement",
      "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
      "default": "bottom",
      "desc": "Side of the trigger where the panel is positioned."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state of the panel; present when visible."
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

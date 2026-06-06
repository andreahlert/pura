export default {
  "name": "collapsible",
  "tag": "pura-collapsible",
  "category": "Disclosure",
  "title": "Collapsible",
  "role": "",
  "summary": "Lightweight show/hide region triggered by a clickable trigger.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows the content expanded."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the trigger, preventing opening or closing."
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

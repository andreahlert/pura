export default {
  "name": "accordion",
  "tag": "pura-accordion",
  "category": "Disclosure",
  "title": "Accordion",
  "role": "",
  "summary": "Expandable and collapsible sections to organize content into panels.",
  "attributes": [
    {
      "name": "single",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-accordion>: when present, keeps only one item open at a time."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "On <pura-accordion-item>: text shown in the panel's header/trigger."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-accordion-item>: when present, the item starts expanded (also reflected as the .open property)."
    }
  ],
  "events": [
    "open"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

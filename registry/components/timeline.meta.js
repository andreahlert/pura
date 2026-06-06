export default {
  "name": "timeline",
  "tag": "pura-timeline",
  "category": "Display",
  "title": "Timeline",
  "role": "",
  "summary": "Vertical timeline with connected markers for displaying events in sequence.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible name of the list (becomes aria-label) on <pura-timeline>; also reflected in the registry snapshot."
    },
    {
      "name": "variant",
      "type": "\"neutral\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
      "default": "neutral",
      "desc": "Sets the dot color of each <pura-timeline-item>."
    }
  ],
  "events": [],
  "slots": [
    "time",
    "title",
    "default"
  ],
  "i18nKeys": []
};

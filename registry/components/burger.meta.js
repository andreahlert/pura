export default {
  "name": "burger",
  "tag": "pura-burger",
  "category": "Navigation",
  "title": "Burger",
  "role": "button",
  "summary": "A hamburger menu toggle button that animates between a hamburger glyph and an X, dispatching a change event on every toggle.",
  "attributes": [
    { "name": "open", "type": "boolean", "default": "", "desc": "Reflects the toggled open state" },
    { "name": "size", "type": "string", "default": "1.5rem", "desc": "CSS length for the glyph box" },
    { "name": "label", "type": "string", "default": "", "desc": "Accessible label (i18n default \"Menu\")" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};

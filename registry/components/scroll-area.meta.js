export default {
  "name": "scroll-area",
  "tag": "pura-scroll-area",
  "category": "Navigation",
  "title": "Scroll Area",
  "role": "",
  "summary": "Scroll container with a thin scrollbar styled by the theme.",
  "attributes": [
    {
      "name": "height",
      "type": "string (CSS length)",
      "default": "18rem",
      "desc": "Sets the maximum height of the viewport (any CSS unit); without it, defaults to 18rem."
    },
    {
      "name": "horizontal",
      "type": "boolean",
      "default": "false",
      "desc": "When present, enables horizontal scrolling; otherwise horizontal overflow is hidden."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

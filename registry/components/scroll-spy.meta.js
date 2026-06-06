export default {
  "name": "scroll-spy",
  "tag": "pura-scroll-spy",
  "category": "Navigation",
  "title": "Scroll Spy",
  "role": "",
  "summary": "Table-of-contents navigation that automatically highlights the link of the visible section as the user scrolls the page.",
  "attributes": [
    {
      "name": "sections",
      "type": "string",
      "default": "",
      "desc": "CSS selector for the sections to observe. When absent, the sections are derived from the hrefs (hash) of the links in the slot."
    },
    {
      "name": "root",
      "type": "string",
      "default": "",
      "desc": "CSS selector for the scroll container. When absent, uses the viewport (root null)."
    },
    {
      "name": "offset",
      "type": "number",
      "default": "0",
      "desc": "Top offset in px that biases which section counts as current (e.g.: to account for a sticky header). It becomes the negative top of the IntersectionObserver's rootMargin."
    },
    {
      "name": "auto-scroll",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the active link is scrolled into view within the nav itself (respecting prefers-reduced-motion)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "On this page",
      "desc": "Accessible label (aria-label) for the navigation landmark."
    }
  ],
  "events": [
    "pura-scroll-spy:change"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};

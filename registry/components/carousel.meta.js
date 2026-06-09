export default {
  "name": "carousel",
  "tag": "pura-carousel",
  "category": "Layout",
  "animation": true,
  "title": "Carousel",
  "role": "",
  "summary": "Carousel with horizontal scroll-snap, navigation arrows, and dot indicators.",
  "attributes": [
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Allows wrapping from the last slide to the first and vice versa."
    },
    {
      "name": "hide-dots",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the row of dot indicators."
    },
    {
      "name": "hide-controls",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the next/previous arrow buttons."
    },
    {
      "name": "per-view",
      "type": "number",
      "default": "1",
      "desc": "Number of slides visible at the same time (sets the width of each slide)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"Carousel\"",
      "desc": "Accessible label (aria-label) for the carousel region."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

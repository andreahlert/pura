export default {
  "name": "scroll-progress",
  "tag": "pura-scroll-progress",
  "category": "Navigation",
  "animation": true,
  "title": "Scroll Progress",
  "role": "",
  "summary": "A thin bar fixed at the top of the viewport that fills from 0% to 100% as the page is scrolled.",
  "attributes": [
    {
      "name": "color",
      "type": "string",
      "default": "var(--pura-primary)",
      "desc": "Fill color of the bar (any valid CSS color). The track stays transparent."
    },
    {
      "name": "height",
      "type": "string",
      "default": "3px",
      "desc": "Thickness of the bar (any valid CSS length, e.g.: \"3px\", \"0.25rem\")."
    }
  ],
  "events": [
    "pura-scroll-progress"
  ],
  "slots": [],
  "i18nKeys": []
};

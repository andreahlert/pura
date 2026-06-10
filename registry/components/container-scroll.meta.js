export default {
  "name": "container-scroll",
  "tag": "pura-container-scroll",
  "category": "Animation",
  "animation": true,
  "title": "Container Scroll",
  "role": "",
  "summary": "The famous 3D flatten hero: a screenshot or card starts tilted back in perspective and flattens, grows and lifts to face-on as the page scrolls, tied 1:1 to a scroll-driven timeline. Zero per-frame JS.",
  "attributes": [
    {
      "name": "tilt",
      "type": "number",
      "default": "20",
      "desc": "Starting rotateX in degrees, 0..80."
    },
    {
      "name": "from",
      "type": "number",
      "default": "0.9",
      "desc": "Starting scale, 0.1..2."
    },
    {
      "name": "lift",
      "type": "number",
      "default": "24",
      "desc": "Final upward translateY in px; the header drifts up at twice this."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 60%",
      "desc": "animation-range for the scrub timeline."
    },
    {
      "name": "timeline",
      "type": "\"view\" | \"scroll\"",
      "default": "view",
      "desc": "view maps the element's own view progress; scroll maps the nearest scroll container."
    }
  ],
  "events": [],
  "slots": [
    "default",
    "header"
  ],
  "i18nKeys": []
};

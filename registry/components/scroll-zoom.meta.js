export default {
  "name": "scroll-zoom",
  "tag": "pura-scroll-zoom",
  "category": "Animation",
  "animation": true,
  "title": "Scroll Zoom",
  "role": "",
  "summary": "Apple-style scroll zoom: the slotted media starts small and rounded and grows to full bleed as you scroll, tied 1:1 to a scroll-driven timeline. Zero per-frame JS.",
  "attributes": [
    {
      "name": "from",
      "type": "number",
      "default": "0.5",
      "desc": "Starting scale, 0..1."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 65%",
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
    "default"
  ],
  "i18nKeys": []
};

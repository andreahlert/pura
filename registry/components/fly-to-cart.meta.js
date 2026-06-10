export default {
  "name": "fly-to-cart",
  "tag": "pura-fly-to-cart",
  "category": "Animation",
  "animation": true,
  "title": "Fly To Cart",
  "role": "",
  "summary": "The add-to-cart flight: click the slotted trigger and a dot launches from it, arcs across the page, and lands on the target, which pulses on impact. One WAAPI animation, no dependencies.",
  "attributes": [
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "CSS selector for the landing element (the cart icon). Without a match the click still fires land."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "700",
      "desc": "Flight time in milliseconds."
    },
    {
      "name": "size",
      "type": "number",
      "default": "14",
      "desc": "Dot diameter in pixels."
    }
  ],
  "events": ["land"],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

export default {
  "name": "coverflow",
  "tag": "pura-coverflow",
  "category": "Animation",
  "animation": true,
  "title": "Coverflow Carousel",
  "role": "",
  "summary": "Scroll-snap carousel where side slides rotate, scale and recede in 3D perspective around the centered slide, tied 1:1 to each slide's inline view progress. The pose updates live while dragging with zero per-frame JS.",
  "attributes": [
    {
      "name": "rotate",
      "type": "number",
      "default": "45",
      "desc": "Side slide rotateY angle in degrees, 0..90."
    },
    {
      "name": "scale",
      "type": "number",
      "default": "0.85",
      "desc": "Side slide scale, 0.1..1."
    },
    {
      "name": "depth",
      "type": "number",
      "default": "120",
      "desc": "Side slide translateZ push-back in px."
    },
    {
      "name": "perspective",
      "type": "number",
      "default": "1000",
      "desc": "Viewport perspective in px; lower values exaggerate the 3D effect."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Coverflow",
      "desc": "Accessible label for the carousel viewport."
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

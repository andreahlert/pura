export default {
  "name": "animated-beam",
  "tag": "pura-animated-beam",
  "category": "Animation",
  "animation": true,
  "title": "Animated Beam",
  "role": "",
  "summary": "A beam of light travels along an SVG path connecting two slotted anchor elements, the canonical integration-diagram visual. The client measures the anchors, draws a Bezier between them and sweeps a gradient pulse along the stroke; geometry recomputes on resize.",
  "attributes": [
    {
      "name": "from",
      "type": "string",
      "default": "[data-from]",
      "desc": "CSS selector for the start anchor, matched against the slotted light DOM."
    },
    {
      "name": "to",
      "type": "string",
      "default": "[data-to]",
      "desc": "CSS selector for the end anchor, matched against the slotted light DOM."
    },
    {
      "name": "curvature",
      "type": "number",
      "default": "0",
      "desc": "Vertical bow of the Bezier control point in px; positive bows up, negative bows down, 0 is a straight line."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "2000",
      "desc": "Time for one beam sweep, in ms."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "0",
      "desc": "Delay before the sweep starts, in ms."
    },
    {
      "name": "reverse",
      "type": "boolean",
      "default": "false",
      "desc": "The beam travels from the to anchor back to the from anchor."
    }
  ],
  "events": [
    "beam-draw"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

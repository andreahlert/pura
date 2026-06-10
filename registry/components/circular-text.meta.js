export default {
  "name": "circular-text",
  "tag": "pura-circular-text",
  "category": "Animation",
  "animation": true,
  "title": "Circular Text",
  "role": "",
  "summary": "Text laid on a circular SVG path, spinning continuously around its center: the classic hero badge / sticker seal. Pure CSS rotation, SSR-safe static circle, optional non-spinning center slot.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "PURA • WEB COMPONENTS • ",
      "desc": "The text laid around the circle. Include your own separator (bullet, star) at the end for a seamless loop."
    },
    {
      "name": "radius",
      "type": "number",
      "default": "80",
      "desc": "Circle radius in px (SVG user units)."
    },
    {
      "name": "repeat",
      "type": "number",
      "default": "1",
      "desc": "How many times the text repeats around the circle, 1..20."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "20",
      "desc": "Seconds per full revolution. Lower is faster."
    },
    {
      "name": "direction",
      "type": "\"cw\" | \"ccw\"",
      "default": "cw",
      "desc": "Spin direction: clockwise or counter-clockwise."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected state; present when the spin is paused."
    },
    {
      "name": "pause-on-hover",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the spin pauses while hovered or focused."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

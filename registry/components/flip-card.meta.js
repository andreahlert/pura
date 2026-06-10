export default {
  "name": "flip-card",
  "tag": "pura-flip-card",
  "category": "Animation",
  "animation": true,
  "title": "Flip Card",
  "role": "",
  "summary": "A two-faced card that turns 180 degrees in 3D perspective on hover, click or the flipped attribute, revealing the back face. Pure CSS rotation (preserve-3d + backface-visibility); reduced motion crossfades instead.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"hover\" | \"click\" | \"manual\"",
      "default": "hover",
      "desc": "hover flips on hover and focus-within; click makes the card a toggle button (Enter/Space too); manual flips only via the flipped attribute."
    },
    {
      "name": "flipped",
      "type": "boolean",
      "default": "false",
      "desc": "Shows the back face. Works in any trigger mode; toggle it from code."
    },
    {
      "name": "direction",
      "type": "\"right\" | \"left\" | \"up\" | \"down\"",
      "default": "right",
      "desc": "Flip axis and spin direction: right/left rotate around Y, up/down around X."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "600",
      "desc": "Flip time in ms."
    }
  ],
  "events": [
    "flip"
  ],
  "slots": [
    "front",
    "back"
  ],
  "i18nKeys": []
};

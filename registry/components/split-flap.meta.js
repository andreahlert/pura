export default {
  "name": "split-flap",
  "tag": "pura-split-flap",
  "category": "Animation",
  "animation": true,
  "title": "Split-Flap Text",
  "role": "",
  "summary": "Airport-style split-flap board: each character cell flips through intermediate glyphs on 3D rotating leaves until it locks on the target character, staggered like a departures board.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "Target text. Falls back to the slotted text. Changing the attribute flips the board to the new value."
    },
    {
      "name": "chars",
      "type": "string",
      "default": "space, A-Z, 0-9 and basic punctuation",
      "desc": "Custom glyph ring the flaps cycle through. With the default ring the text is uppercased."
    },
    {
      "name": "flip-duration",
      "type": "number",
      "default": "90",
      "desc": "Milliseconds per single flap step."
    },
    {
      "name": "stagger",
      "type": "number",
      "default": "60",
      "desc": "Milliseconds between consecutive cells starting to flip."
    },
    {
      "name": "steps",
      "type": "number",
      "default": "8",
      "desc": "Maximum intermediate flips per cell before locking on the target glyph."
    },
    {
      "name": "trigger",
      "type": "\"view\" | \"load\"",
      "default": "view",
      "desc": "view starts the flips when scrolled into view; load starts on connect."
    }
  ],
  "events": [
    "flip-start",
    "settled"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

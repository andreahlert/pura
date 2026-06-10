export default {
  "name": "confetti",
  "tag": "pura-confetti",
  "category": "Animation",
  "animation": true,
  "title": "Confetti",
  "role": "",
  "summary": "Celebration confetti burst fired by clicking the slotted trigger or by calling fire(): a cannon of particles scatters across the page on a canvas overlay with simple physics (gravity, drift, decay, tumble). Themeable palette, configurable angle and spread, zero dependencies.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"click\" | \"manual\"",
      "default": "click",
      "desc": "click fires a burst when the slotted trigger is clicked; manual only fires via the fire() method."
    },
    {
      "name": "count",
      "type": "number",
      "default": "80",
      "desc": "Particles per burst, capped at 500."
    },
    {
      "name": "angle",
      "type": "number",
      "default": "90",
      "desc": "Launch direction in degrees; 90 is straight up, 0 is right."
    },
    {
      "name": "spread",
      "type": "number",
      "default": "70",
      "desc": "Cone width in degrees around the launch angle."
    },
    {
      "name": "velocity",
      "type": "number",
      "default": "14",
      "desc": "Initial particle speed."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "2500",
      "desc": "Particle lifetime in milliseconds."
    },
    {
      "name": "colors",
      "type": "string",
      "default": "",
      "desc": "Comma-separated CSS colors. When empty the palette comes from the --pura-confetti-color-1..5 tokens with festive fallbacks."
    }
  ],
  "events": ["fire", "done"],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

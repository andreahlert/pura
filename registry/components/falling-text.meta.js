export default {
  "name": "falling-text",
  "tag": "pura-falling-text",
  "category": "Animation",
  "animation": true,
  "title": "Falling Text",
  "role": "",
  "summary": "On trigger (hover, click or in view) every word of the sentence lets go, falls under gravity, bounces and stacks into a pile on the container floor. Minimal in-house 2D physics over rAF, no engine. SSR keeps the sentence intact; reduced motion never drops anything.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"hover\" | \"click\" | \"view\"",
      "default": "hover",
      "desc": "What releases the words: pointer hover, a click on the stage, or scrolling into view."
    },
    {
      "name": "gravity",
      "type": "number",
      "default": "1",
      "desc": "Gravity multiplier. 1 equals 2200 px/s squared."
    },
    {
      "name": "restitution",
      "type": "number",
      "default": "0.45",
      "desc": "Bounce energy kept on each impact, 0..1."
    },
    {
      "name": "scatter",
      "type": "number",
      "default": "1",
      "desc": "Horizontal impulse multiplier at release. 0 drops words straight down."
    }
  ],
  "events": [
    "pura-falling-text:fall",
    "pura-falling-text:settle"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

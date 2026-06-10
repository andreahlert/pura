export default {
  "name": "click-spark",
  "tag": "pura-click-spark",
  "category": "Animation",
  "animation": true,
  "title": "Click Spark",
  "role": "",
  "summary": "Celebration micro-feedback: a burst of sparks (short lines or emojis) radiates from the exact click or touch point. Particles are spawned on pointerdown, animated with WAAPI and removed on finish, so the initial paint is untouched.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "8",
      "desc": "Sparks per burst."
    },
    {
      "name": "size",
      "type": "number",
      "default": "10",
      "desc": "Spark length in px; emoji font size in emoji mode."
    },
    {
      "name": "radius",
      "type": "number",
      "default": "28",
      "desc": "Travel distance from the click point, in px."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "500",
      "desc": "Burst time in ms."
    },
    {
      "name": "emoji",
      "type": "string",
      "default": "",
      "desc": "Space-separated emoji list; when set, sparks are emoji characters cycled by index instead of lines."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Suppresses bursts entirely."
    }
  ],
  "events": [
    "pura-click-spark"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

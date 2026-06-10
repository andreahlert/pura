export default {
  "name": "fireworks",
  "tag": "pura-fireworks",
  "category": "Animation",
  "animation": true,
  "title": "Fireworks",
  "role": "",
  "summary": "Fireworks show for big celebrations: rockets launch from the bottom of the viewport with a glowing trail and explode at their apex into spheres of sparks that fall with gravity and fade, on a full-viewport canvas overlay. Fired by click, by the fire() method, or automatically on connect.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"click\" | \"manual\" | \"auto\"",
      "default": "click",
      "desc": "click fires a show when the slotted trigger is clicked; manual only fires via the fire() method; auto fires one show when the element connects."
    },
    {
      "name": "rockets",
      "type": "number",
      "default": "6",
      "desc": "Rockets per show, capped at 20."
    },
    {
      "name": "count",
      "type": "number",
      "default": "60",
      "desc": "Sparks per explosion, capped at 200."
    },
    {
      "name": "interval",
      "type": "number",
      "default": "350",
      "desc": "Milliseconds between rocket launches."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "1800",
      "desc": "Spark lifetime in milliseconds."
    },
    {
      "name": "colors",
      "type": "string",
      "default": "",
      "desc": "Comma-separated CSS colors. When empty the palette comes from the --pura-fireworks-color-1..5 tokens with festive fallbacks."
    }
  ],
  "events": ["fire", "explode", "done"],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

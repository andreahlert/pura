export default {
  "name": "card-stack",
  "tag": "pura-card-stack",
  "category": "Animation",
  "animation": true,
  "title": "Card Stack",
  "role": "",
  "summary": "A pile of cards with decreasing offset and scale that trade places on an automatic cycle or by dragging the top card (Tinder style): past the threshold the card flies out with inertia and the next one rises; below it, it springs back.",
  "attributes": [
    {
      "name": "visible",
      "type": "number",
      "default": "3",
      "desc": "How many depths show behind the top card, 1..6."
    },
    {
      "name": "offset",
      "type": "number",
      "default": "14",
      "desc": "Pixels each depth steps down."
    },
    {
      "name": "scale",
      "type": "number",
      "default": "0.05",
      "desc": "Scale lost per depth, 0..0.2."
    },
    {
      "name": "autoplay",
      "type": "boolean",
      "default": "false",
      "desc": "Cycle the stack automatically."
    },
    {
      "name": "interval",
      "type": "number",
      "default": "4000",
      "desc": "Autoplay period in ms, min 800."
    },
    {
      "name": "threshold",
      "type": "number",
      "default": "80",
      "desc": "Horizontal travel in px, after inertia projection, that commits a swipe."
    },
    {
      "name": "spring",
      "type": "\"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\" | \"default\"",
      "default": "snappy",
      "desc": "Spring preset for the return and the FLIP re-rank."
    }
  ],
  "events": [
    "swipe",
    "change"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

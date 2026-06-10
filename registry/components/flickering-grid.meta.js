export default {
  "name": "flickering-grid",
  "tag": "pura-flickering-grid",
  "category": "Animation",
  "animation": true,
  "title": "Flickering Grid",
  "role": "",
  "summary": "A background grid of small squares that light up and dim at staggered, seed-deterministic times behind slotted content, faded by a gradient mask. Pure CSS keyframes, no animation runtime.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "24",
      "desc": "Grid columns, clamped 4..48."
    },
    {
      "name": "rows",
      "type": "number",
      "default": "14",
      "desc": "Grid rows, clamped 3..32."
    },
    {
      "name": "seed",
      "type": "number",
      "default": "1",
      "desc": "Integer that deterministically reshuffles the flicker pattern."
    },
    {
      "name": "mask",
      "type": "\"radial\" | \"top\" | \"bottom\" | \"none\"",
      "default": "radial",
      "desc": "Gradient mask that fades the field toward the edges."
    },
    {
      "name": "speed",
      "type": "\"slow\" | \"normal\" | \"fast\"",
      "default": "normal",
      "desc": "Scales every cell's flicker duration and delay."
    },
    {
      "name": "color",
      "type": "string",
      "default": "",
      "desc": "Flicker color; shorthand for the --pura-flickering-grid-color token."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

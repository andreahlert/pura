export default {
  "name": "interactive-grid",
  "tag": "pura-interactive-grid",
  "category": "Animation",
  "animation": true,
  "title": "Interactive Grid",
  "role": "",
  "summary": "A background grid of real cells that reacts to the pointer: the cell under the cursor lights up and fades out with a trail, and a click ripples a flash outward through neighboring cells. The static grid is server-rendered; interaction is a pure enhancement.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "12",
      "desc": "Grid columns, 1..64."
    },
    {
      "name": "rows",
      "type": "number",
      "default": "8",
      "desc": "Grid rows, 1..64."
    },
    {
      "name": "prelit",
      "type": "number",
      "default": "3",
      "desc": "Deterministically pre-lit pulsing cells for the static no-JS paint, 0..24."
    },
    {
      "name": "wave-step",
      "type": "number",
      "default": "40",
      "desc": "Milliseconds of click-wave delay per cell of distance from the clicked cell."
    },
    {
      "name": "no-wave",
      "type": "boolean",
      "default": "false",
      "desc": "Disable the click wave; hover trail only."
    }
  ],
  "events": [
    "pura-interactive-grid:wave"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

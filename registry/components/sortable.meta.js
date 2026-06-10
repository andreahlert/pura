export default {
  "name": "sortable",
  "tag": "pura-sortable",
  "category": "Animation",
  "animation": true,
  "title": "Sortable",
  "role": "",
  "summary": "Drag-to-reorder list: grab an item and the siblings open space with a FLIP tween at every index swap; drop emits a 'change' event with the new order. SSR paints the static semantic list.",
  "attributes": [
    {
      "name": "axis",
      "type": "\"y\" | \"x\"",
      "default": "y",
      "desc": "Drag direction. y for vertical lists (ArrowUp/Down), x for horizontal strips (ArrowLeft/Right)."
    },
    {
      "name": "handle",
      "type": "string",
      "default": "",
      "desc": "CSS selector inside each item that starts the drag. Empty: the whole item is draggable."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables pointer dragging and keyboard reordering."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "token --pura-duration-4",
      "desc": "FLIP and drop-snap duration in milliseconds. Overrides the token-derived default."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

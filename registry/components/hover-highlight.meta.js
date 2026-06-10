export default {
  "name": "hover-highlight",
  "tag": "pura-hover-highlight",
  "category": "Animation",
  "animation": true,
  "title": "Hover Highlight",
  "role": "",
  "summary": "A single highlight rectangle that slides and resizes smoothly from one item to another as hover or focus moves, Vercel docs style, for lists, menus and card grids.",
  "attributes": [
    {
      "name": "selector",
      "type": "string",
      "default": "",
      "desc": "CSS selector for the hoverable items inside the slot; empty means the direct slotted children."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "300",
      "desc": "Slide/resize time in ms."
    },
    {
      "name": "padding",
      "type": "number",
      "default": "0",
      "desc": "Px outset of the highlight around the item rect; negative values inset."
    },
    {
      "name": "easing",
      "type": "string",
      "default": "cubic-bezier(0.22, 1, 0.36, 1)",
      "desc": "Easing for the slide animation."
    }
  ],
  "events": [
    "highlight",
    "clear"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

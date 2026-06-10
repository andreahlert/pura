export default {
  "name": "parallax-columns",
  "tag": "pura-parallax-columns",
  "category": "Animation",
  "animation": true,
  "title": "Parallax Columns",
  "role": "",
  "summary": "Grid of images split into columns that translate in opposite directions as you scroll, each column scrubbing its own drift on a shared scroll-driven view timeline. The hero variant adds a perspective rotateX tilt and a fade on entry. Zero per-frame JS.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "3",
      "desc": "Number of columns, 2..6. Slotted children flow row by row; nth-child math assigns each one to a column track."
    },
    {
      "name": "shift",
      "type": "string",
      "default": "120px",
      "desc": "CSS length each column drifts from its resting position; neighbouring columns move in opposite directions."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 100%",
      "desc": "animation-range for the column scrub timeline."
    },
    {
      "name": "hero",
      "type": "boolean",
      "default": "false",
      "desc": "Hero Parallax variant: wraps the grid in perspective, tilting it with rotateX and fading it in over the entry range."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

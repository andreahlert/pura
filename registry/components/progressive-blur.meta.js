export default {
  "name": "progressive-blur",
  "tag": "pura-progressive-blur",
  "category": "Animation",
  "animation": true,
  "title": "Progressive Blur",
  "role": "",
  "summary": "Gradient blur on the edges of a scrollable container: content leaving the reading area dissolves into a progressive blur instead of cutting off hard. Stacked backdrop-filter layers clipped by gradient masks; 100% CSS, no listeners.",
  "attributes": [
    {
      "name": "edges",
      "type": "\"vertical\" | \"horizontal\" | \"top\" | \"bottom\" | \"left\" | \"right\" | \"all\"",
      "default": "vertical",
      "desc": "Which edges get the blur zone. vertical = top + bottom, horizontal = left + right."
    },
    {
      "name": "blur",
      "type": "number",
      "default": "12",
      "desc": "Maximum blur in px at the outer edge. The ramp halves per layer toward the content."
    },
    {
      "name": "size",
      "type": "string",
      "default": "4rem",
      "desc": "Depth of the blur zone. CSS length (px, rem, em, vh, vw, %) or a bare number treated as px."
    },
    {
      "name": "layers",
      "type": "number",
      "default": "5",
      "desc": "Number of stacked backdrop-filter layers, clamped to 2..8. More layers give a smoother ramp."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

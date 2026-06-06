export default {
  "name": "heading",
  "tag": "pura-heading",
  "category": "Primitives",
  "title": "Heading",
  "role": "",
  "summary": "A semantic heading primitive that renders a real h1-h6 tag for a correct document outline while keeping visual size fully independent and themeable.",
  "attributes": [
    {
      "name": "level",
      "type": "1 | 2 | 3 | 4 | 5 | 6",
      "default": "2",
      "desc": "Semantic heading level. Renders the matching h1-h6 tag and sets the default visual size when no size is given."
    },
    {
      "name": "size",
      "type": "xs | sm | md | lg | xl | 2xl | 3xl",
      "default": "(derived from level)",
      "desc": "Overrides the visual size independently of the semantic level."
    },
    {
      "name": "weight",
      "type": "400 | 500 | 600 | 700 | 800",
      "default": "700",
      "desc": "Font weight of the heading text."
    },
    {
      "name": "color",
      "type": "fg | muted | primary | accent | success | danger",
      "default": "fg",
      "desc": "Text color, mapped to a Pura color token."
    },
    {
      "name": "align",
      "type": "start | center | end | justify",
      "default": "start",
      "desc": "Horizontal text alignment."
    },
    {
      "name": "tracking",
      "type": "tight | normal | wide",
      "default": "tight",
      "desc": "Letter-spacing of the heading text."
    }
  ],
  "events": [],
  "slots": [
    "default — the heading text content"
  ],
  "i18nKeys": []
};

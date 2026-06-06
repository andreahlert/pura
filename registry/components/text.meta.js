export default {
  "name": "text",
  "tag": "pura-text",
  "category": "Primitives",
  "title": "Text",
  "role": "",
  "summary": "A typographic primitive for rendering body copy and inline text with consistent size, weight, color, and alignment tokens.",
  "attributes": [
    {
      "name": "size",
      "type": "xs | sm | base | lg | xl",
      "default": "base",
      "desc": "Font size scale, mapped to the --pura-text-* tokens."
    },
    {
      "name": "weight",
      "type": "normal | medium | semibold | bold",
      "default": "normal",
      "desc": "Font weight (400 / 500 / 600 / 700)."
    },
    {
      "name": "color",
      "type": "fg | muted | primary | accent | success | danger",
      "default": "fg",
      "desc": "Text color, mapped to the corresponding theme token."
    },
    {
      "name": "align",
      "type": "left | center | right",
      "default": "left",
      "desc": "Horizontal text alignment."
    },
    {
      "name": "leading",
      "type": "tight | normal | relaxed",
      "default": "normal",
      "desc": "Line-height (1.25 / 1.5 / 1.75)."
    },
    {
      "name": "truncate",
      "type": "boolean",
      "default": "false",
      "desc": "Clamps the text to a single line with an ellipsis."
    },
    {
      "name": "inline",
      "type": "boolean",
      "default": "false",
      "desc": "Renders a <span> and displays inline instead of a block <p>."
    },
    {
      "name": "as",
      "type": "p | span | div",
      "default": "p",
      "desc": "Explicit tag override for the rendered element."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

export default {
  "name": "box",
  "tag": "pura-box",
  "category": "Primitives",
  "title": "Box",
  "role": "",
  "summary": "A generic themeable container that maps layout and style attributes to design tokens.",
  "attributes": [
    {
      "name": "p",
      "type": "string",
      "default": "",
      "desc": "Padding on all sides. Scale 0-6 (--pura-space-N) or any CSS length."
    },
    {
      "name": "px",
      "type": "string",
      "default": "",
      "desc": "Horizontal padding (overrides p on the x axis). Scale 0-6 or any CSS length."
    },
    {
      "name": "py",
      "type": "string",
      "default": "",
      "desc": "Vertical padding (overrides p on the y axis). Scale 0-6 or any CSS length."
    },
    {
      "name": "m",
      "type": "string",
      "default": "",
      "desc": "Margin on all sides. Scale 0-6, any CSS length, or 'auto'."
    },
    {
      "name": "mx",
      "type": "string",
      "default": "",
      "desc": "Horizontal margin (overrides m on the x axis). Scale 0-6, any CSS length, or 'auto'."
    },
    {
      "name": "my",
      "type": "string",
      "default": "",
      "desc": "Vertical margin (overrides m on the y axis). Scale 0-6, any CSS length, or 'auto'."
    },
    {
      "name": "bg",
      "type": "string",
      "default": "",
      "desc": "Background color: bg | subtle | primary | transparent. The primary value also sets a readable foreground color."
    },
    {
      "name": "color",
      "type": "string",
      "default": "",
      "desc": "Text color: fg | muted | primary. Wins over the implicit color set by bg."
    },
    {
      "name": "border",
      "type": "string",
      "default": "",
      "desc": "Boolean for a 1px border, or 'strong' for a 1px stronger border."
    },
    {
      "name": "radius",
      "type": "string",
      "default": "",
      "desc": "Corner radius: sm | md | lg | full."
    },
    {
      "name": "shadow",
      "type": "string",
      "default": "",
      "desc": "Box shadow: sm | md | lg | none."
    },
    {
      "name": "w",
      "type": "string",
      "default": "",
      "desc": "Width: any CSS length or 'full' (100%)."
    },
    {
      "name": "h",
      "type": "string",
      "default": "",
      "desc": "Height: any CSS length or 'full' (100%)."
    },
    {
      "name": "display",
      "type": "string",
      "default": "block",
      "desc": "Any CSS display value (block | flex | inline-flex | grid | inline | none ...)."
    }
  ],
  "events": [],
  "slots": [
    "default - container contents"
  ],
  "i18nKeys": []
};

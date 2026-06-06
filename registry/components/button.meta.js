export default {
  "name": "button",
  "tag": "pura-button",
  "category": "Form",
  "title": "Button",
  "role": "button",
  "summary": "Actionable button with variants, sizes, and a loading state.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"primary\" | \"secondary\" | \"ghost\" | \"danger\"",
      "default": "primary",
      "desc": "Visual style of the button."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Size of the button."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the button and blocks clicks."
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "false",
      "desc": "Shows the spinner, sets aria-busy, and blocks clicks."
    },
    {
      "name": "full",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button span the full available width."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

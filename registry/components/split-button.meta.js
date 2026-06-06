export default {
  "name": "split-button",
  "tag": "pura-split-button",
  "category": "Overlay",
  "title": "Split Button",
  "role": "",
  "summary": "Primary action button coupled to a caret that opens a dropdown menu of secondary actions.",
  "attributes": [
    {
      "name": "variant",
      "type": "string",
      "default": "primary",
      "desc": "Visual style: primary, secondary, ghost, or danger."
    },
    {
      "name": "size",
      "type": "string",
      "default": "md",
      "desc": "Button size: sm, md, or lg."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables both buttons (primary and caret)."
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "false",
      "desc": "Shows a spinner on the primary button and makes both inert."
    },
    {
      "name": "placement",
      "type": "string",
      "default": "bottom",
      "desc": "Side the menu opens on: bottom or top."
    },
    {
      "name": "label",
      "type": "string",
      "default": "More actions",
      "desc": "Accessible label for the caret button and the menu."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state of the menu."
    },
    {
      "name": "full",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the component take the full width, with the primary button expanding."
    }
  ],
  "events": [
    "click",
    "select",
    "open",
    "close"
  ],
  "slots": [
    "default",
    "icon",
    "menu"
  ],
  "i18nKeys": []
};

export default {
  "name": "avatar-group",
  "tag": "pura-avatar-group",
  "category": "Display",
  "title": "Avatar Group",
  "role": "",
  "summary": "Overlapping stack of avatars that collapses the overflow into a \"+N\" button with a popover of the hidden members.",
  "attributes": [
    {
      "name": "max",
      "type": "number",
      "default": "0",
      "desc": "Maximum number of avatars shown before collapsing the rest into a \"+N\" bubble. 0 or absent shows all of them."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Size applied (passthrough) to each child <pura-avatar> and to the overflow bubble."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Avatar group",
      "desc": "Accessible name of the group (aria-label)."
    }
  ],
  "events": [
    "pura-overflow-toggle"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

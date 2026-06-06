export default {
  "name": "copy-region",
  "tag": "pura-copy-region",
  "category": "Agent",
  "title": "Copy Region",
  "role": "",
  "summary": "Wraps any region and makes it copyable with a single click, exposing itself as content extractable by agents.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Literal text to copy. When present, it wins over the slotted text (useful when the visible content differs from the payload)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Copy",
      "desc": "Accessible label (aria-label) for the copy button."
    },
    {
      "name": "timeout",
      "type": "number",
      "default": "1400",
      "desc": "Confirmation duration in ms. Finite values >= 0 are accepted; otherwise it uses 1400."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the region non-interactive: the button leaves the flow and copy() becomes a no-op."
    },
    {
      "name": "placement",
      "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
      "default": "top",
      "desc": "Position of the floating confirmation relative to the region. Invalid values are removed."
    }
  ],
  "events": [
    "copy",
    "error"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};

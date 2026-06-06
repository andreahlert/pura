export default {
  "name": "presence",
  "tag": "pura-presence",
  "category": "Display",
  "title": "Presence",
  "role": "",
  "summary": "Stack of overlapping avatars with a real-time online count and an overflow roster.",
  "attributes": [
    {
      "name": "max",
      "type": "number",
      "default": "0 (all)",
      "desc": "Maximum avatars shown before collapsing into a \"+N\" bubble. 0, absent, or non-positive shows all. When collapsing, it reserves a slot for the bubble."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Passed down to each child <pura-avatar> and adjusts the stack overlap (sm tighter, lg wider)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Online presence",
      "desc": "Accessible name (aria-label) of the presence stack."
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

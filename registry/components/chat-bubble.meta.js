export default {
  "name": "chat-bubble",
  "tag": "pura-chat-bubble",
  "category": "Display",
  "title": "Chat Bubble",
  "role": "",
  "summary": "A single chat message bubble, aligned according to who sent it.",
  "attributes": [
    {
      "name": "side",
      "type": "string",
      "default": "received",
      "desc": "Direction of the message: received (default, aligns left with a subtle background) or sent (aligns right with the primary color)."
    },
    {
      "name": "time",
      "type": "string",
      "default": "",
      "desc": "Optional timestamp shown below the message. Also populated in data-time and in the aria-label."
    },
    {
      "name": "tail",
      "type": "boolean",
      "default": "false",
      "desc": "When present, draws a small tail pointing toward the side of the speaker."
    }
  ],
  "events": [],
  "slots": [
    "(default)",
    "avatar"
  ],
  "i18nKeys": []
};

export default {
  "name": "chat-input",
  "tag": "pura-chat-input",
  "category": "Form",
  "title": "Chat Input",
  "role": "",
  "summary": "Chat composer with an auto-expanding textarea and a send button, where Enter sends and Shift+Enter inserts a line break.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Placeholder text for the textarea."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Blocks typing and sending; applies aria-disabled and disables the textarea and button."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current draft text; mirrored back to the host attribute on every keystroke."
    },
    {
      "name": "maxlength",
      "type": "number",
      "default": "",
      "desc": "Character limit passed through to the textarea (optional)."
    },
    {
      "name": "send-label",
      "type": "string",
      "default": "Send message",
      "desc": "Accessible label (aria-label) for the send button."
    }
  ],
  "events": [
    "send",
    "input"
  ],
  "slots": [
    "actions"
  ],
  "i18nKeys": []
};

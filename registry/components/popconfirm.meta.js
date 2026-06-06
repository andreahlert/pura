export default {
  "name": "popconfirm",
  "tag": "pura-popconfirm",
  "category": "Overlay",
  "title": "Popconfirm",
  "role": "dialog",
  "summary": "Confirmation popover anchored to a slotted trigger element, showing a message with Confirm and Cancel buttons built on the native Popover API.",
  "attributes": [
    { "name": "title", "type": "string", "default": "", "desc": "Question text shown in the popover (alias of message)." },
    { "name": "message", "type": "string", "default": "", "desc": "Question text shown in the popover (alias of title)." },
    { "name": "confirm-text", "type": "string", "default": "", "desc": "Label for the confirm button." },
    { "name": "cancel-text", "type": "string", "default": "", "desc": "Label for the cancel button." },
    { "name": "danger", "type": "boolean", "default": "", "desc": "Renders the confirm button with a danger style." },
    { "name": "placement", "type": "string", "default": "bottom", "desc": "Popover placement relative to the trigger: bottom | top | left | right." }
  ],
  "events": ["confirm", "cancel"],
  "slots": ["default"],
  "i18nKeys": []
};

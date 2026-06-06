export default {
  "name": "speed-dial",
  "tag": "pura-speed-dial",
  "category": "Overlay",
  "title": "Speed Dial",
  "role": "",
  "summary": "Floating action button (FAB) pinned to a corner of the viewport that fans out into secondary actions.",
  "attributes": [
    {
      "name": "position",
      "type": "string",
      "default": "bottom-end",
      "desc": "Viewport corner and fan-out direction: bottom-end, bottom-start, top-end, or top-start."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state of the action stack."
    },
    {
      "name": "hover",
      "type": "boolean",
      "default": "false",
      "desc": "When present, also expands on hover (clicking still toggles)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Ações rápidas",
      "desc": "Accessible label (aria-label) for the FAB button."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-speed-dial-action: disables the action (no click, no focus)."
    }
  ],
  "events": [
    "open",
    "close",
    "action"
  ],
  "slots": [
    "default",
    "icon"
  ],
  "i18nKeys": []
};

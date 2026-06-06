export default {
  "name": "floating-window",
  "tag": "pura-floating-window",
  "category": "Overlay",
  "title": "Floating Window",
  "role": "dialog",
  "summary": "A draggable, resizable floating window/panel with a title bar, close/minimize/maximize controls, and viewport containment.",
  "attributes": [
    { "name": "open", "type": "boolean", "default": "", "desc": "Whether the window is visible" },
    { "name": "x", "type": "number", "default": "80", "desc": "Initial horizontal position in px" },
    { "name": "y", "type": "number", "default": "80", "desc": "Initial vertical position in px" },
    { "name": "width", "type": "number", "default": "360", "desc": "Initial width in px" },
    { "name": "height", "type": "number", "default": "240", "desc": "Initial height in px" },
    { "name": "title", "type": "string", "default": "", "desc": "Window title bar text" },
    { "name": "modal", "type": "boolean", "default": "", "desc": "Dim the background behind the window" }
  ],
  "events": ["move", "resize", "close"],
  "slots": ["default"],
  "i18nKeys": []
};

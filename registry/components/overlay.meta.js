export default {
  "name": "overlay",
  "tag": "pura-overlay",
  "category": "Overlay",
  "title": "Overlay",
  "role": "",
  "summary": "Standalone dimming scrim and loading overlay layer, separate from dialog, with optional spinner and dismissable behavior.",
  "attributes": [
    { "name": "open", "type": "boolean", "default": "", "desc": "Controls visibility of the overlay." },
    { "name": "target", "type": "string", "default": "page", "desc": "\"page\" for fixed full-screen or \"parent\" for absolute covering the nearest positioned ancestor." },
    { "name": "blur", "type": "boolean", "default": "", "desc": "Applies a backdrop-filter blur to the scrim." },
    { "name": "spinner", "type": "boolean", "default": "", "desc": "Centers a spinner animation inside the overlay." },
    { "name": "message", "type": "string", "default": "", "desc": "Text shown under the spinner." },
    { "name": "dismissable", "type": "boolean", "default": "", "desc": "Clicking the scrim closes the overlay and dispatches a close event." }
  ],
  "events": ["close"],
  "slots": ["default"],
  "i18nKeys": []
};

export default {
  "name": "inspector",
  "tag": "pura-inspector",
  "category": "Utility",
  "title": "Inspector",
  "role": "",
  "summary": "A floating developer tool that enters inspect mode on click, highlighting pura elements on hover and opening a panel to edit component attributes live with localStorage persistence.",
  "attributes": [
    { "name": "position", "type": "string", "default": "bottom-left", "desc": "Corner of the trigger bubble: bottom-left, bottom-right, top-left, or top-right" },
    { "name": "hidden-in-prod", "type": "boolean", "default": "", "desc": "Informational attribute; the host app decides whether to mount the inspector" }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

export default {
  "name": "ripple",
  "tag": "pura-ripple",
  "category": "Utility",
  "title": "Ripple",
  "role": "",
  "summary": "Material-style touch ripple wrapper: a ripple expands from the pointer on press, CSS-only motion, reduced-motion aware.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Suppresses ripples entirely."
    },
    {
      "name": "centered",
      "type": "boolean",
      "default": "false",
      "desc": "Ripples emanate from the host center rather than the pointer position (good for icon buttons)."
    }
  ],
  "events": [
    "pura-ripple"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

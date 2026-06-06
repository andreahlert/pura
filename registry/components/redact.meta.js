export default {
  "name": "redact",
  "tag": "pura-redact",
  "category": "Agent",
  "title": "Redact",
  "role": "",
  "summary": "Hides sensitive content with blur until it's explicitly revealed, keeping the value out of the accessibility tree.",
  "attributes": [
    {
      "name": "reveal-on",
      "type": "\"click\" | \"hover\" | \"none\"",
      "default": "click",
      "desc": "Interaction that reveals the content. \"none\" makes it purely programmatic (reveal via .reveal())."
    },
    {
      "name": "revealed",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected boolean; present while the value is visible. Set it in markup to start already revealed."
    },
    {
      "name": "label",
      "type": "string",
      "default": "conteúdo oculto",
      "desc": "Accessible label announced while the content is hidden."
    },
    {
      "name": "blur",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Intensity of the blur that obscures the content while hidden."
    },
    {
      "name": "toggle",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the same interaction that reveals also hides again (click toggles)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Non-interactive; stays hidden and cannot be revealed by the user."
    }
  ],
  "events": [
    "reveal",
    "hide"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};

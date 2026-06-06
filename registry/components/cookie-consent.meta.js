export default {
  "name": "cookie-consent",
  "tag": "pura-cookie-consent",
  "category": "Overlay",
  "title": "Cookie Consent",
  "role": "",
  "summary": "Cookie consent banner pinned to the viewport, with accept, decline and per-category preferences, that remembers the visitor's choice.",
  "attributes": [
    {
      "name": "storage-key",
      "type": "string",
      "default": "pura-cookie-consent",
      "desc": "The localStorage key where the visitor's choice is stored."
    },
    {
      "name": "position",
      "type": "bottom | bottom-left | bottom-right | top",
      "default": "bottom",
      "desc": "Position of the banner. bottom/top span the width of the viewport; *-left / *-right render as a card."
    },
    {
      "name": "accept-label",
      "type": "string",
      "default": "Aceitar",
      "desc": "Label of the accept button."
    },
    {
      "name": "decline-label",
      "type": "string",
      "default": "Recusar",
      "desc": "Label of the decline button."
    },
    {
      "name": "settings-label",
      "type": "string",
      "default": "Preferências",
      "desc": "Label of the preferences/settings button."
    },
    {
      "name": "heading",
      "type": "string",
      "default": "",
      "desc": "Optional bold title shown above the message."
    },
    {
      "name": "no-settings",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the Preferences button when present."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected by the component; present while the banner is visible (do not set it manually)."
    }
  ],
  "events": [
    "accept",
    "decline",
    "settings",
    "change"
  ],
  "slots": [
    "(default)",
    "categories"
  ],
  "i18nKeys": []
};

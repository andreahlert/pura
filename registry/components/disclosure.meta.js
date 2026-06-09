export default {
  "name": "disclosure",
  "tag": "pura-disclosure",
  "category": "Layout",
  "animation": true,
  "title": "Disclosure",
  "role": "",
  "summary": "Show/hide region that animates height between 0 and auto using native interpolate-size, no grid hack or JS measuring. SSR-safe, reduced-motion aware.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Expanded when present."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Trigger is inert and toggling is blocked."
    }
  ],
  "events": [
    {
      "name": "disclosuretoggle",
      "detail": "{ open }",
      "desc": "Fired whenever the open state changes."
    }
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "i18nKeys": [
    "disclosure.toggle"
  ]
};

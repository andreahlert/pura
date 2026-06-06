export default {
  "name": "portal",
  "tag": "pura-portal",
  "category": "Agent",
  "title": "Portal",
  "role": "",
  "summary": "Teleports your content elsewhere in the DOM (the body by default) while keeping logical ownership, and restores it to its original place when removed.",
  "attributes": [
    {
      "name": "to",
      "type": "string",
      "default": "body",
      "desc": "Teleport destination. The keyword \"body\" (default) points to document.body; any other value is treated as a CSS selector resolved via document.querySelector. If it matches nothing, the content stays in place (graceful degradation)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the portal does NOT teleport: the content stays inline in its original position."
    }
  ],
  "events": [
    "pura-portal:mount",
    "pura-portal:unmount"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

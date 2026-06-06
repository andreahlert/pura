export default {
  "name": "live-region",
  "tag": "pura-live-region",
  "category": "Agent",
  "title": "Live Region",
  "role": "",
  "summary": "Managed ARIA live region that announces dynamic updates to screen readers and autonomous agents.",
  "attributes": [
    {
      "name": "live",
      "type": "\"polite\" | \"assertive\"",
      "default": "polite",
      "desc": "Politeness level of the announcement, reflected in aria-live. Any invalid value falls back to polite."
    },
    {
      "name": "visible",
      "type": "boolean",
      "default": "false",
      "desc": "Opt-in escape hatch: renders the announced text visibly (useful for authoring/debugging). By default the region is sr-only."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Optional aria-label applied to the region host."
    }
  ],
  "events": [
    "pura-live-region:announce"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

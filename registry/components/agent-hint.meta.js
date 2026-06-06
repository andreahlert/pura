export default {
  "name": "agent-hint",
  "tag": "pura-agent-hint",
  "category": "Agent",
  "title": "Agent Hint",
  "role": "",
  "summary": "Visually hidden hint that adds context readable by screen readers and AI agents to a nearby control.",
  "attributes": [
    {
      "name": "for",
      "type": "string",
      "default": "",
      "desc": "id of the control this hint describes. When set, it connects the target's aria-describedby to a stable internal id so the hint is announced for that control."
    },
    {
      "name": "role",
      "type": "string",
      "default": "note",
      "desc": "Accessibility role exposed on the host."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Optional aria-label for the hint region."
    },
    {
      "name": "level",
      "type": "\"info\" | \"tip\" | \"warning\"",
      "default": "info",
      "desc": "Machine-readable semantic weight. Surfaces as data-level and aria-roledescription (agent hint / agent tip / agent warning)."
    },
    {
      "name": "visible",
      "type": "boolean",
      "default": "false",
      "desc": "Opt-in escape hatch: renders the hint visibly (for debugging / authoring)."
    }
  ],
  "events": [
    "pura-agent-hint:change"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

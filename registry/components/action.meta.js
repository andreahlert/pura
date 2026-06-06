export default {
  "name": "action",
  "tag": "pura-action",
  "category": "Agent",
  "title": "Action",
  "role": "",
  "summary": "Agent-native wrapper that exposes a control (button) as an action discoverable and invocable by AI agents.",
  "attributes": [
    {
      "name": "intent",
      "type": "string",
      "default": "",
      "desc": "Human/agent-readable verb phrase describing the action, e.g. \"save document\". Mirrored as data-intent and used as the control's aria-label if it does not already have one."
    },
    {
      "name": "action-id",
      "type": "string",
      "default": "",
      "desc": "Stable identifier used as the key in the window.__puraActions registry and mirrored as data-agent-action on the control. Without it the action is not discoverable."
    },
    {
      "name": "params",
      "type": "json",
      "default": "",
      "desc": "JSON object describing the action's parameters. It is parsed (invalid JSON becomes null) and exposed in the event detail and in the registry entry."
    }
  ],
  "events": [
    "invoke"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

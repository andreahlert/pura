export default {
  "name": "intent",
  "tag": "pura-intent",
  "category": "Agent",
  "title": "Intent",
  "role": "",
  "summary": "Invisible wrapper that annotates a region of the page with a machine-readable goal for autonomous agents.",
  "attributes": [
    {
      "name": "goal",
      "type": "string",
      "default": "",
      "desc": "Human/agent-readable purpose of the region. Reflected in aria-label and data-intent on the host. Empty removes the aria-label and leaves data-intent empty."
    },
    {
      "name": "actions",
      "type": "string (JSON)",
      "default": "[]",
      "desc": "JSON array of sub-actions an agent can perform on the region, e.g.: [{\"name\":\"submit\",\"label\":\"Place order\"}]. Malformed JSON degrades to [] without throwing."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

export default {
  "name": "async",
  "tag": "pura-async",
  "category": "Agent",
  "title": "Async",
  "role": "",
  "summary": "Declarative async-state container that renders only the slot matching the current phase (idle, loading, error, empty, or ready).",
  "attributes": [
    {
      "name": "state",
      "type": "string",
      "default": "idle",
      "desc": "Current phase of the region. One of: idle | loading | error | empty | ready. A missing or unknown value is normalized to idle (renders nothing). It is the single source of truth; setState(s) only writes to this attribute."
    }
  ],
  "events": [
    "statechange"
  ],
  "slots": [
    "loading",
    "error",
    "empty",
    "default"
  ],
  "i18nKeys": []
};

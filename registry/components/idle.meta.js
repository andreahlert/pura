export default {
  "name": "idle",
  "tag": "pura-idle",
  "category": "Agent",
  "title": "Idle",
  "role": "",
  "summary": "Invisible inactivity detector that switches between the \"active\" and \"idle\" states after a period without user interaction.",
  "attributes": [
    {
      "name": "timeout",
      "type": "number",
      "default": "60000",
      "desc": "Inactivity window in ms before going idle. Non-numeric or negative values fall back to the default."
    },
    {
      "name": "events",
      "type": "string",
      "default": "mousemove keydown pointerdown wheel touchstart scroll",
      "desc": "Space-separated list of input events to observe. An empty attribute keeps the defaults."
    },
    {
      "name": "target",
      "type": "string",
      "default": "document",
      "desc": "Where to listen: \"document\" | \"window\" | \"self\" (host only, scoped activity)."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "desc": "When present, suspends the timer (always reported as active, no transitions) until it is removed."
    }
  ],
  "events": [
    "idle",
    "active",
    "pura-idle:change"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};

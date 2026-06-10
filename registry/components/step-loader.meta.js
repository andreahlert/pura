export default {
  "name": "step-loader",
  "tag": "pura-step-loader",
  "category": "Animation",
  "animation": true,
  "title": "Step Loader",
  "role": "",
  "summary": "Multi-step loader for long operations: a vertical checklist where each step spins while running and draws a check when done, with the current step highlighted. step drives the state; auto advances on a WAAPI timer.",
  "attributes": [
    {
      "name": "steps",
      "type": "string",
      "default": "",
      "desc": "Step labels separated by | (commas also work when no pipe is present)."
    },
    {
      "name": "step",
      "type": "number",
      "default": "0",
      "desc": "Index of the step currently running, 0-based. Earlier steps render as done; a value equal to the step count marks everything done."
    },
    {
      "name": "auto",
      "type": "boolean",
      "default": "false",
      "desc": "Advance automatically, one step per interval, on a WAAPI timer."
    },
    {
      "name": "interval",
      "type": "number",
      "default": "1500",
      "desc": "Milliseconds per step in auto mode."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "In auto mode, restart from the first step after everything completes."
    }
  ],
  "events": ["advance", "complete"],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

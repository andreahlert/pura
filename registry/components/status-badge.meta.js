export default {
  "name": "status-badge",
  "tag": "pura-status-badge",
  "category": "Animation",
  "animation": true,
  "title": "Status Badge",
  "role": "status",
  "summary": "A pill that morphs between async states (idle, loading, success, error): icon crossfade, color tween, self-drawing check/cross, and a FLIP width morph. Change the state attribute and it animates.",
  "attributes": [
    {
      "name": "state",
      "type": "\"idle\" | \"loading\" | \"success\" | \"error\"",
      "default": "idle",
      "desc": "Current state. Reactive: change it at any time and the badge morphs."
    },
    {
      "name": "idle-label",
      "type": "string",
      "default": "Submit",
      "desc": "Label for the idle state."
    },
    {
      "name": "loading-label",
      "type": "string",
      "default": "Loading",
      "desc": "Label for the loading state."
    },
    {
      "name": "success-label",
      "type": "string",
      "default": "Done",
      "desc": "Label for the success state."
    },
    {
      "name": "error-label",
      "type": "string",
      "default": "Failed",
      "desc": "Label for the error state."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

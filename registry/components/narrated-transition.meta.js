export default {
  "name": "narrated-transition",
  "tag": "pura-narrated-transition",
  "category": "Utility",
  "animation": true,
  "title": "Narrated Transition",
  "role": "",
  "summary": "Runs a state change inside the native View Transitions API and narrates it: captures before/after named state, diffs it, and emits a structured { from, to, reason, changed } account plus a screen-reader announcement.",
  "attributes": [
    {
      "name": "name",
      "type": "string",
      "default": "\"\"",
      "desc": "Applies view-transition-name to the host so it morphs as a shared element across page-level transitions."
    },
    {
      "name": "state",
      "type": "string",
      "default": "\"\"",
      "desc": "Optional initial state as a JSON object."
    }
  ],
  "events": [
    {
      "name": "transitionnarrate",
      "detail": "{ id, from, to, reason, changed, at }",
      "desc": "Fired after a transition or narrate(): changed is an array of { key, from, to }."
    }
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

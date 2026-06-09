export default {
  "name": "view-transition",
  "tag": "pura-view-transition",
  "category": "Utility",
  "animation": true,
  "title": "View Transition",
  "role": "",
  "summary": "Morph between UI states with the native View Transitions API: wrap a region, call transition(updateFn) to cross-fade or magic-move, degrades gracefully.",
  "attributes": [
    {
      "name": "name",
      "type": "string",
      "default": "",
      "desc": "Applies view-transition-name to the host so it morphs as a single shared element across page-level transitions."
    }
  ],
  "events": [
    "pura-view-transition"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

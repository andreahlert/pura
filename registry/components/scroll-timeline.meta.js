export default {
  "name": "scroll-timeline",
  "tag": "pura-scroll-timeline",
  "category": "Utility",
  "animation": true,
  "title": "Scroll Timeline",
  "role": "progressbar",
  "summary": "A section-scoped scroll progress that pauses on intent. Tracks how far this element has travelled through the viewport and freezes its advance the moment the reader hovers or focuses inside it, exposing the engaged state so an agent can tell a section is being attended to.",
  "attributes": [
    {
      "name": "intent",
      "type": "\"both\" | \"hover\" | \"focus\" | \"none\"",
      "default": "both",
      "desc": "Which gestures freeze the timeline. none disables pausing."
    },
    {
      "name": "height",
      "type": "length",
      "default": "3px",
      "desc": "Thickness of the progress fill."
    }
  ],
  "events": [
    {
      "name": "timeline",
      "detail": "{ progress, paused }",
      "desc": "Fired on each scroll progress change (0..100)."
    },
    {
      "name": "intent",
      "detail": "{ engaged, progress }",
      "desc": "Fired when intent (hover/focus) starts or ends."
    }
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

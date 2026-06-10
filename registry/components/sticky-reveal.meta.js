export default {
  "name": "sticky-reveal",
  "tag": "pura-sticky-reveal",
  "category": "Animation",
  "animation": true,
  "title": "Sticky Scroll Reveal",
  "role": "",
  "summary": "Feature walkthrough: a media panel sticks on one side while text steps scroll on the other; the active media crossfades as each step enters the viewport. Layout is pure CSS, activation is a single IntersectionObserver.",
  "attributes": [
    {
      "name": "side",
      "type": "\"right\" | \"left\"",
      "default": "right",
      "desc": "Which side the sticky media panel sits on (wide screens)."
    },
    {
      "name": "top",
      "type": "number",
      "default": "96",
      "desc": "Sticky top offset of the media frame, in px."
    },
    {
      "name": "no-dim",
      "type": "boolean",
      "default": "false",
      "desc": "Keep inactive steps at full opacity instead of dimming them."
    }
  ],
  "events": [
    "pura-sticky-reveal-change"
  ],
  "slots": [
    "step",
    "media"
  ],
  "i18nKeys": []
};

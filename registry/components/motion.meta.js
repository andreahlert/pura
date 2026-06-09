export default {
  "name": "motion",
  "tag": "pura-motion",
  "category": "Utility",
  "title": "Motion",
  "role": "",
  "summary": "Generic enter/exit motion wrapper: toggle the show attribute to animate any content in and out, CSS-only and reduced-motion aware.",
  "attributes": [
    {
      "name": "show",
      "type": "boolean",
      "default": "false",
      "desc": "Present = content visible (entered); absent = content removed (exited). Toggling at runtime runs the transition; rendered already-show snaps in with no flash."
    },
    {
      "name": "animation",
      "type": "\"fade\" | \"slide-up\" | \"slide-down\" | \"slide-left\" | \"slide-right\" | \"scale\" | \"fade-slide\"",
      "default": "fade",
      "desc": "Entrance/exit animation style. Invalid values fall back to fade."
    },
    {
      "name": "appear",
      "type": "boolean",
      "default": "false",
      "desc": "When present and show is set at mount, starts hidden and plays the enter animation on the first frame (opt-in mount animation)."
    }
  ],
  "events": [
    "pura-motion"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

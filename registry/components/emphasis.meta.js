export default {
  "name": "emphasis",
  "tag": "pura-emphasis",
  "category": "Utility",
  "title": "Emphasis",
  "role": "",
  "summary": "Attention-seeking animations (bounce, heartbeat, wiggle, tada, shake, pulse, flash) as a wrapper, CSS-only and reduced-motion aware.",
  "attributes": [
    {
      "name": "animation",
      "type": "\"bounce\" | \"heartbeat\" | \"wiggle\" | \"tada\" | \"shake\" | \"pulse\" | \"flash\"",
      "default": "pulse",
      "desc": "The emphasis preset. Invalid values fall back to pulse."
    },
    {
      "name": "trigger",
      "type": "\"hover\" | \"view\" | \"loop\" | \"manual\"",
      "default": "manual",
      "desc": "What plays the animation: hover (CSS), view (first intersection), loop (infinite), or manual via play()."
    }
  ],
  "events": [
    "pura-emphasis"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

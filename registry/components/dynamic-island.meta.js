export default {
  "name": "dynamic-island",
  "tag": "pura-dynamic-island",
  "category": "Animation",
  "animation": true,
  "title": "Dynamic Island",
  "role": "",
  "summary": "iOS-style Dynamic Island: a floating pill that morphs between named states (compact, expanded, player, timer) with a FLIP size animation on a real spring linear() easing and a blur crossfade between the named-slot contents.",
  "attributes": [
    {
      "name": "state",
      "type": "string",
      "default": "compact",
      "desc": "Active state name; must match an entry of states. Changing it triggers the morph."
    },
    {
      "name": "states",
      "type": "string",
      "default": "compact,expanded",
      "desc": "Comma-separated list of state names; each becomes a named slot and a pane."
    },
    {
      "name": "spring",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "snappy",
      "desc": "Spring preset for the size morph (sampled into a CSS linear() easing)."
    },
    {
      "name": "stiffness",
      "type": "number",
      "default": "",
      "desc": "Spring stiffness override."
    },
    {
      "name": "damping",
      "type": "number",
      "default": "",
      "desc": "Spring damping override."
    },
    {
      "name": "mass",
      "type": "number",
      "default": "",
      "desc": "Spring mass override."
    }
  ],
  "events": [
    "statechange"
  ],
  "slots": [
    "default",
    "compact",
    "expanded"
  ],
  "i18nKeys": []
};

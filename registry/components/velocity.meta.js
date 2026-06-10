export default {
  "name": "velocity",
  "tag": "pura-velocity",
  "category": "Animation",
  "animation": true,
  "title": "Velocity",
  "role": "",
  "summary": "Scroll-velocity lean: the slotted content skews proportionally to how fast the page is scrolling, then eases back upright when scrolling stops. The rAF loop only runs while moving; reduced motion never binds.",
  "attributes": [
    {
      "name": "max",
      "type": "number",
      "default": "6",
      "desc": "Maximum lean in degrees."
    },
    {
      "name": "factor",
      "type": "number",
      "default": "8",
      "desc": "Sensitivity: degrees of lean per px/ms of scroll speed."
    },
    {
      "name": "axis",
      "type": "\"y\" | \"x\"",
      "default": "y",
      "desc": "y = skewY (lean into vertical scroll, the classic). x = skewX."
    },
    {
      "name": "decay",
      "type": "number",
      "default": "0.12",
      "desc": "Settle factor per frame, 0..1. Higher = snaps back faster."
    }
  ],
  "events": [],
  "slots": [
    {
      "name": "default",
      "desc": "The content that leans (big display text is the classic)."
    }
  ],
  "i18nKeys": []
};

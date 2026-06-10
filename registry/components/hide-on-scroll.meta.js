export default {
  "name": "hide-on-scroll",
  "tag": "pura-hide-on-scroll",
  "category": "Animation",
  "animation": true,
  "title": "Hide-on-scroll Bar",
  "role": "",
  "summary": "Shy navbar: a sticky or fixed bar that slides out of view when scrolling down and reappears on scroll up, with a shrink variant that condenses the bar after a threshold. One passive scroll listener flips data attributes; CSS transitions do all the motion.",
  "attributes": [
    {
      "name": "threshold",
      "type": "number",
      "default": "80",
      "desc": "Scroll distance in px below which the bar always stays visible and expanded."
    },
    {
      "name": "tolerance",
      "type": "number",
      "default": "8",
      "desc": "Minimum scroll delta in px before a direction change is honored. Guards against trackpad jitter."
    },
    {
      "name": "shrink",
      "type": "boolean",
      "default": "false",
      "desc": "Condense the bar (tighter padding plus a shadow) once scrolled past the threshold."
    },
    {
      "name": "position",
      "type": "\"top\" | \"bottom\"",
      "default": "top",
      "desc": "Edge the bar sticks to. Bottom bars slide down to hide."
    },
    {
      "name": "fixed",
      "type": "boolean",
      "default": "false",
      "desc": "Use position fixed (full viewport width) instead of sticky."
    }
  ],
  "events": [
    "hide",
    "show"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

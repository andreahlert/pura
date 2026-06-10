export default {
  "name": "hover-underline",
  "tag": "pura-hover-underline",
  "category": "Animation",
  "animation": true,
  "title": "Hover Underline",
  "role": "",
  "summary": "Animated link underline: a bar grows from the left, center or right (or rises from the baseline) on hover and keyboard focus, for links and nav items. Pure CSS transition, zero per-frame JS.",
  "attributes": [
    {
      "name": "from",
      "type": "\"left\" | \"center\" | \"right\"",
      "default": "left",
      "desc": "Where the grow variant starts from (and shrinks back to)."
    },
    {
      "name": "variant",
      "type": "\"grow\" | \"reveal\"",
      "default": "grow",
      "desc": "grow scales the bar along the x axis; reveal rises it from the baseline."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "240",
      "desc": "Transition time in ms."
    },
    {
      "name": "active",
      "type": "boolean",
      "default": "false",
      "desc": "Keeps the underline shown, for the current nav item."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

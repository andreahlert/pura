export default {
  "name": "text-highlighter",
  "tag": "pura-text-highlighter",
  "category": "Animation",
  "animation": true,
  "title": "Text Highlighter",
  "role": "",
  "summary": "Animated marker pen: a highlighter-color sweep paints the slotted text from one side to the other when it enters the viewport, by growing a no-repeat gradient background from 0% to 100%. The text is never duplicated; SSR paints the full highlight with no JS required.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"view\" | \"scrub\" | \"load\"",
      "default": "view",
      "desc": "view sweeps once when scrolled into view; scrub ties the sweep 1:1 to a scroll-driven timeline; load sweeps once on connect."
    },
    {
      "name": "direction",
      "type": "\"right\" | \"left\"",
      "default": "right",
      "desc": "Which way the pen sweeps across the text."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "900",
      "desc": "Sweep duration in ms (view/load triggers)."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "0",
      "desc": "Sweep delay in ms (view/load triggers); stagger multiple highlights with it."
    },
    {
      "name": "timeline",
      "type": "\"view\" | \"scroll\"",
      "default": "view",
      "desc": "Scrub only: view maps the element's own view progress; scroll maps the nearest scroll container."
    },
    {
      "name": "range",
      "type": "string",
      "default": "entry 0% cover 50%",
      "desc": "animation-range for the scrub timeline."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

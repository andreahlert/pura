export default {
  "name": "text-fill",
  "tag": "pura-text-fill",
  "category": "Animation",
  "animation": true,
  "title": "Text Fill",
  "role": "",
  "summary": "Scroll-driven text fill: the slotted text starts as a faint base and fills with color as you scroll, by sliding the boundary of a glyph-clipped gradient. Tied 1:1 to a scroll-driven timeline by default, no per-frame JS; SSR shows the text in its normal color.",
  "attributes": [
    {
      "name": "direction",
      "type": "\"right\" | \"left\" | \"down\" | \"up\"",
      "default": "right",
      "desc": "Which way the fill sweeps across the text."
    },
    {
      "name": "trigger",
      "type": "\"scrub\" | \"view\" | \"load\"",
      "default": "scrub",
      "desc": "scrub ties the fill 1:1 to a scroll-driven timeline; view fills once when scrolled into view; load fills once on connect."
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
      "default": "cover 0% cover 60%",
      "desc": "animation-range for the scrub (e.g., \"cover 0% cover 50%\")."
    },
    {
      "name": "preset",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "default",
      "desc": "Spring profile for view/load easing. Or set stiffness/damping/mass directly."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

export default {
  "name": "clip-reveal",
  "tag": "pura-clip-reveal",
  "category": "Animation",
  "animation": true,
  "title": "Clip Reveal",
  "role": "",
  "summary": "clip-path wipe reveal: the slotted content is revealed by an inset() sliding open from one edge or a circle() irising out from the center, by default scrubbed 1:1 by a scroll-driven timeline. The awwwards image-wipe, done natively with no per-frame JS.",
  "attributes": [
    {
      "name": "direction",
      "type": "\"up\" | \"down\" | \"left\" | \"right\" | \"circle\"",
      "default": "up",
      "desc": "Which way the wipe opens. up reveals bottom-to-top edge first; circle irises out from the center."
    },
    {
      "name": "trigger",
      "type": "\"scrub\" | \"view\" | \"load\"",
      "default": "scrub",
      "desc": "scrub ties the wipe 1:1 to a scroll-driven timeline; view wipes once when scrolled into view; load wipes once on connect."
    },
    {
      "name": "timeline",
      "type": "\"view\" | \"scroll\"",
      "default": "view",
      "desc": "Scrub only. view maps the element's own view progress; scroll maps the nearest scroll container."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 50%",
      "desc": "animation-range for the scrub timeline. Default completes the wipe as the element reaches viewport center, then holds."
    },
    {
      "name": "preset",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "default",
      "desc": "Spring easing for view/load triggers. Or set stiffness/damping/mass directly."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

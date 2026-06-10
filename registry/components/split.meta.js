export default {
  "name": "split",
  "tag": "pura-split",
  "category": "Animation",
  "animation": true,
  "title": "Split Text",
  "role": "",
  "summary": "SplitText: splits slotted text into lines, words or characters, each in a clipping mask, and reveals them with a staggered spring rise. The gsap SplitText hero move, native and zero-runtime; the original text stays as the accessible copy.",
  "attributes": [
    {
      "name": "by",
      "type": "\"line\" | \"word\" | \"char\"",
      "default": "word",
      "desc": "Unit to split and stagger. Line splitting measures layout and survives wrapping."
    },
    {
      "name": "stagger",
      "type": "number",
      "default": "40",
      "desc": "Milliseconds between consecutive units (defaults to 90 for line)."
    },
    {
      "name": "trigger",
      "type": "\"view\" | \"load\"",
      "default": "view",
      "desc": "view reveals when scrolled into view; load reveals on connect."
    },
    {
      "name": "effect",
      "type": "\"rise\" | \"scatter\" | \"wave\"",
      "default": "rise",
      "desc": "rise is the clip-masked rise from below; scatter flies units in from seeded random offsets and rotations; wave fades units in and bobs them on an infinite phase-shifted sine."
    },
    {
      "name": "preset",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "default",
      "desc": "Spring profile for the rise. Or set stiffness/damping/mass directly."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

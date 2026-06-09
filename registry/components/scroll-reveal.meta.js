export default {
  "name": "scroll-reveal",
  "tag": "pura-scroll-reveal",
  "category": "Utility",
  "animation": true,
  "title": "Scroll Reveal",
  "role": "",
  "summary": "Scrubs a reveal to the element's progress through the viewport using the native scroll-driven CSS timeline (animation-timeline: view()), no IntersectionObserver and no per-frame JS.",
  "attributes": [
    {
      "name": "animation",
      "type": "\"fade\" | \"slide-up\" | \"slide-down\" | \"slide-left\" | \"slide-right\" | \"zoom\" | \"blur\"",
      "default": "fade",
      "desc": "Entrance style scrubbed across the scroll range. Invalid values fall back to fade."
    },
    {
      "name": "distance",
      "type": "number",
      "default": "28",
      "desc": "Pixels the slide variants travel from their offset start to rest."
    },
    {
      "name": "range",
      "type": "\"enter\" | \"cover\" | \"early\" | string",
      "default": "enter",
      "desc": "Preset scroll window the reveal scrubs over, or any raw CSS animation-range value (e.g. \"entry 0% exit 0%\")."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

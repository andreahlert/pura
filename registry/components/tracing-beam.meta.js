export default {
  "name": "tracing-beam",
  "tag": "pura-tracing-beam",
  "category": "Animation",
  "animation": true,
  "title": "Tracing Beam",
  "role": "",
  "summary": "A vertical gradient beam with a glowing dot draws itself down a rail beside the content, 1:1 with reading progress, changelog/timeline style. The track is generated and sized from the content height; the draw is pure CSS on a scroll-driven timeline, no per-frame JS.",
  "attributes": [
    {
      "name": "side",
      "type": "\"left\" | \"right\"",
      "default": "left",
      "desc": "Which side of the content the beam rail sits on."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 100%",
      "desc": "animation-range for the scrub (e.g., \"cover 0% cover 85%\")."
    },
    {
      "name": "timeline",
      "type": "\"view\" | \"scroll\"",
      "default": "view",
      "desc": "view rides the element's own view progress; scroll rides the nearest scroll container."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

export default {
  "name": "stream-cascade",
  "tag": "pura-stream-cascade",
  "category": "Utility",
  "animation": true,
  "title": "Stream Cascade",
  "role": "",
  "summary": "Staggered entrance for streamed content. A parse-time CSS nth-child cascade (served as Declarative Shadow DOM) fades each child up a step after the last, with zero JS coordination, plus a cascadeitem event per live-appended child.",
  "attributes": [
    {
      "name": "animation",
      "type": "\"fade\" | \"slide-up\" | \"slide-left\" | \"zoom\" | \"blur\"",
      "default": "fade",
      "desc": "Entrance style for each child. Invalid values fall back to fade."
    },
    {
      "name": "step",
      "type": "number",
      "default": "60",
      "desc": "Milliseconds between each child's entrance in the parse-time cascade."
    }
  ],
  "events": [
    {
      "name": "cascadeitem",
      "detail": "{ index, total }",
      "desc": "Fired for each child appended after connect (live streaming)."
    }
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

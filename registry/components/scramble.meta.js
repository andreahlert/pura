export default {
  "name": "scramble",
  "tag": "pura-scramble",
  "category": "Animation",
  "animation": true,
  "title": "Scramble",
  "role": "",
  "summary": "ScrambleText decode: the text resolves out of random glyph noise, locking in character by character from the left. Deterministic seeded noise, accessible by design (aria-label carries the real text, the animated span is aria-hidden), full text under SSR and reduced motion.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "\"\"",
      "desc": "The string to decode. Also what SSR and no-JS render."
    },
    {
      "name": "chars",
      "type": "\"upper\" | \"lower\" | \"digits\" | \"binary\" | \"blocks\" | string",
      "default": "upper",
      "desc": "Glyph pool for the noise. A named set, or any custom string of 2+ characters."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "35",
      "desc": "Milliseconds per tick."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Characters locked in per tick."
    },
    {
      "name": "trigger",
      "type": "\"view\" | \"load\" | \"hover\" | \"manual\"",
      "default": "view",
      "desc": "view decodes when scrolled into view; load on connect; hover re-decodes on every pointerenter; manual waits for play()."
    },
    {
      "name": "from",
      "type": "\"left\" | \"right\" | \"center\" | \"edges\"",
      "default": "left",
      "desc": "Lock direction: left is the classic prefix decode; center resolves center-out; edges resolves edges-in; right decodes right-to-left."
    }
  ],
  "events": [
    {
      "name": "pura-scramble",
      "detail": "{ id: string, text: string }",
      "desc": "Fires when a decode finishes."
    }
  ],
  "slots": [],
  "i18nKeys": []
};

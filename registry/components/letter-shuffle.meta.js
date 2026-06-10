export default {
  "name": "letter-shuffle",
  "tag": "pura-letter-shuffle",
  "category": "Animation",
  "animation": true,
  "title": "Letter Shuffle",
  "role": "",
  "summary": "The letters of the text physically trade places and slide back along the X axis into the correct order, FLIP-style with WAAPI. Unlike scramble, which swaps glyphs in place, here the letters move. Deterministic seeded permutation; SSR, no-JS and reduced motion render the final text.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "\"\"",
      "desc": "The string to shuffle. Also what SSR and no-JS render, already in the correct order."
    },
    {
      "name": "trigger",
      "type": "\"view\" | \"load\" | \"hover\" | \"manual\"",
      "default": "view",
      "desc": "view shuffles when scrolled into view; load on connect; hover replays on every pointerenter; manual waits for play()."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "600",
      "desc": "Slide time per letter, in milliseconds."
    },
    {
      "name": "stagger",
      "type": "number",
      "default": "25",
      "desc": "Milliseconds between consecutive letters starting their slide."
    },
    {
      "name": "seed",
      "type": "number",
      "default": "derived from text",
      "desc": "Integer seed for the deterministic permutation. Same seed, same shuffle."
    }
  ],
  "events": [
    "pura-letter-shuffle"
  ],
  "slots": [],
  "i18nKeys": []
};

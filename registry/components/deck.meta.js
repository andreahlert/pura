export default {
  "name": "deck",
  "tag": "pura-deck",
  "category": "Animation",
  "animation": true,
  "title": "Deck",
  "role": "",
  "summary": "Sticky card deck: each slotted card sticks near the top of the viewport while the next scrolls up and over it, earlier cards peeking out above the pile and receding slightly. Pure CSS stacking (position: sticky), no per-frame JS; scrolling does all the work.",
  "attributes": [
    {
      "name": "top",
      "type": "number",
      "default": "96",
      "desc": "Sticky top of the first card, in px."
    },
    {
      "name": "peek",
      "type": "number",
      "default": "14",
      "desc": "How many px each later card's sticky top steps down, exposing the cards beneath."
    },
    {
      "name": "gap",
      "type": "number",
      "default": "24",
      "desc": "Flow margin between cards, i.e. how far apart they start before piling."
    },
    {
      "name": "no-depth",
      "type": "boolean",
      "default": "false",
      "desc": "Disable the recede scale on covered cards."
    }
  ],
  "events": [],
  "slots": [
    {
      "name": "default",
      "desc": "The cards. Each direct child becomes one card in the pile."
    }
  ],
  "i18nKeys": []
};

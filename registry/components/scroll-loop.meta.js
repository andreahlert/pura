export default {
  "name": "scroll-loop",
  "tag": "pura-scroll-loop",
  "category": "Animation",
  "animation": true,
  "title": "Infinite Scroll Loop",
  "role": "",
  "summary": "Infinite looping scroll: reaching the end of the content wraps around and continues from the start with no visible seam, the circular-gallery pattern of awwwards portfolios. Unlike pura-infinite-scroll nothing is loaded; the same content repeats forever.",
  "attributes": [
    {
      "name": "axis",
      "type": "\"y\" | \"x\"",
      "default": "y",
      "desc": "Scroll axis of the loop."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Turns the loop off; content scrolls normally and ends."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Looping scroll gallery",
      "desc": "Accessible name of the scroll region."
    }
  ],
  "events": [
    "loop"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

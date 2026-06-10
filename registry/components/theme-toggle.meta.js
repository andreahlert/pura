export default {
  "name": "theme-toggle",
  "tag": "pura-theme-toggle",
  "category": "Animation",
  "animation": true,
  "title": "Animated Theme Toggle",
  "role": "",
  "summary": "Light/dark switch where the new theme expands as a circle from the button (View Transitions API + clip-path) instead of swapping abruptly. Plugs straight into pura's data-theme + tokens.css infra; falls back to an instant swap.",
  "attributes": [
    {
      "name": "duration",
      "type": "number",
      "default": "500",
      "desc": "Circular reveal time in ms."
    },
    {
      "name": "easing",
      "type": "string",
      "default": "ease-in-out",
      "desc": "Easing for the circular reveal."
    }
  ],
  "events": [
    "toggle"
  ],
  "slots": [],
  "i18nKeys": []
};

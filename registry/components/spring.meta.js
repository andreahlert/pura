export default {
  "name": "spring",
  "tag": "pura-spring",
  "category": "Animation",
  "animation": true,
  "title": "Spring",
  "role": "",
  "summary": "The spring primitive: samples a damped harmonic oscillator once and serializes it into a CSS linear() easing string, a native zero-runtime spring with real overshoot. Exports spring() for the rest of pura's motion components; the element itself is a poke-able demo token.",
  "attributes": [
    {
      "name": "preset",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "default",
      "desc": "Named spring profile. Ignored for any of stiffness/damping/mass you set explicitly."
    },
    {
      "name": "stiffness",
      "type": "number",
      "default": "170",
      "desc": "Spring constant. Higher is faster and snappier."
    },
    {
      "name": "damping",
      "type": "number",
      "default": "26",
      "desc": "Resistance. Lower overshoots and wobbles more; higher settles flat."
    },
    {
      "name": "mass",
      "type": "number",
      "default": "1",
      "desc": "Inertia of the moving body. Higher is slower and heavier."
    },
    {
      "name": "travel",
      "type": "number",
      "default": "190",
      "desc": "Demo only: pixels the token travels between rest and end."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

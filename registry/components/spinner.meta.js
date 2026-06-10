export default {
  "name": "spinner",
  "tag": "pura-spinner",
  "category": "Display",
  "title": "Spinner",
  "role": "",
  "summary": "Animated loading indicator in four variants and three sizes.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"ring\" | \"dots\" | \"pulse\" | \"ripple\"",
      "default": "ring",
      "desc": "Loading style: ring (spinning arc), dots (jumping dots), pulse (pulsing dots), or ripple (expanding rings)."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Spinner size: sm (small), md (medium), or lg (large)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Loading",
      "desc": "Accessible label (aria-label) announced by screen readers."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

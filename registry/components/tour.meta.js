export default {
  "name": "tour",
  "tag": "pura-tour",
  "category": "Overlay",
  "title": "Tour",
  "role": "",
  "summary": "Step-by-step guided tour that highlights page elements with a spotlight and coachmarks.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects the tour's running state; present in the initial markup, it starts the tour automatically on connect."
    },
    {
      "name": "index",
      "type": "number",
      "default": "0",
      "desc": "Current step (reflected). Changing the attribute while the tour is running navigates to that step via goTo()."
    }
  ],
  "events": [
    "tour-start",
    "tour-step",
    "tour-end"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};

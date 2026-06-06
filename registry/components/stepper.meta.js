export default {
  "name": "stepper",
  "tag": "pura-stepper",
  "category": "Navigation",
  "title": "Stepper",
  "role": "",
  "summary": "Step indicator with numbered circles that shows completed, current and upcoming progress.",
  "attributes": [
    {
      "name": "steps",
      "type": "string",
      "default": "\"\"",
      "desc": "Step labels separated by commas, e.g.: \"Account, Shipping, Payment\". Spaces are trimmed and empty items discarded."
    },
    {
      "name": "active",
      "type": "number",
      "default": "0",
      "desc": "Zero-based index of the current step. Steps with a lower index are completed, the equal one is current and the higher ones are upcoming."
    },
    {
      "name": "orientation",
      "type": "string",
      "default": "\"horizontal\"",
      "desc": "Direction of the indicator: \"horizontal\" (default) or \"vertical\"."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};

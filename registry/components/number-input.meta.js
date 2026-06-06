export default {
  "name": "number-input",
  "tag": "pura-number-input",
  "category": "Form",
  "title": "Number Input",
  "role": "",
  "summary": "A numeric field with increment and decrement buttons that clamps, snaps to the step, and exposes the value as a number.",
  "attributes": [
    {
      "name": "min",
      "type": "number",
      "default": "",
      "desc": "Minimum allowed value. Sets the lower clamp bound and the origin for snapping to the step; it also enables the Home key to jump to the minimum."
    },
    {
      "name": "max",
      "type": "number",
      "default": "",
      "desc": "Maximum allowed value. Sets the upper clamp bound; enables the End key to jump to the maximum."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Increment for the buttons and arrows. PageUp/PageDown use step x 10. The value is snapped to the nearest multiple of step starting from min (or 0)."
    },
    {
      "name": "value",
      "type": "number",
      "default": "",
      "desc": "Current value. It is reflected back into the attribute after clamp/snap. It can be read/written via the .value property as a Number."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the field and the step buttons."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Number\"",
      "desc": "Accessible label applied to the group (role=group) that wraps the field and the buttons."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};

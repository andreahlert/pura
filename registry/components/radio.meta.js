export default {
  "name": "radio",
  "tag": "pura-radio",
  "category": "Form",
  "title": "Radio",
  "role": "radio",
  "summary": "Single radio button with a slotted label; group multiple radios by shared name attribute.",
  "attributes": [
    { "name": "checked", "type": "boolean", "default": "", "desc": "Whether this radio is selected." },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the radio button." },
    { "name": "name", "type": "string", "default": "", "desc": "Group name shared across related radio buttons." },
    { "name": "value", "type": "string", "default": "", "desc": "Value emitted in the change event detail when this radio is selected." }
  ],
  "events": ["change"],
  "slots": ["default"],
  "i18nKeys": []
};

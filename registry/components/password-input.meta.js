export default {
  "name": "password-input",
  "tag": "pura-password-input",
  "category": "Form",
  "title": "Password Input",
  "role": "",
  "summary": "Password field with a show/hide reveal toggle and an optional strength meter.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "Current value of the password input." },
    { "name": "placeholder", "type": "string", "default": "", "desc": "Placeholder text for the input." },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the input and reveal toggle." },
    { "name": "meter", "type": "boolean", "default": "", "desc": "Shows a password strength meter and label below the input." },
    { "name": "name", "type": "string", "default": "", "desc": "Name attribute forwarded to the internal input element for form submission." }
  ],
  "events": ["input"],
  "slots": [],
  "i18nKeys": []
};

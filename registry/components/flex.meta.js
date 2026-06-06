export default {
  "name": "flex",
  "tag": "pura-flex",
  "category": "Primitives",
  "title": "Flex",
  "role": "",
  "summary": "A flexbox layout container for arranging child elements in a row or column.",
  "attributes": [
    {
      "name": "direction",
      "type": "\"row\" | \"col\" | \"row-reverse\" | \"col-reverse\"",
      "default": "row",
      "desc": "Main axis direction of the flex container (flex-direction)."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "0",
      "desc": "Spacing between children. Use the space scale 1 to 6 (resolves to a design token) or any CSS length such as \"2rem\" or \"12px\"."
    },
    {
      "name": "align",
      "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\"",
      "default": "",
      "desc": "Cross-axis alignment of children (align-items)."
    },
    {
      "name": "justify",
      "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\"",
      "default": "",
      "desc": "Main-axis distribution of children (justify-content)."
    },
    {
      "name": "wrap",
      "type": "boolean",
      "default": "false",
      "desc": "When present, allows children to wrap onto multiple lines (flex-wrap)."
    },
    {
      "name": "inline",
      "type": "boolean",
      "default": "false",
      "desc": "When present, renders the container as inline-flex instead of flex."
    }
  ],
  "events": [],
  "slots": [
    "default — flex children"
  ],
  "i18nKeys": []
};

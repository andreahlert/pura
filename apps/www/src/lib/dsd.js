import { buttonTemplate } from "../../../../registry/components/button.template.js";
import { renderDSD } from "../../../../registry/base.js";

export function ssrButton(attrs = {}) {
  return renderDSD("pura-button", buttonTemplate(attrs), attrs);
}

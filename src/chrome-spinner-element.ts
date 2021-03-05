import { BaseSpinnerElement } from "./base-spinner-element";
import chromeSVG from "../assets/infinite-loop/chrome.svg";
import { defaultStyle } from "./utils";

export default class ChromeSpinnerElement extends BaseSpinnerElement {
  constructor() {
    super();
  }

  protected init() {
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = defaultStyle + chromeSVG;
    this.shadowRoot!.appendChild(template.content);
    this.animationNames = ["rotating"];
    this.collectAnimatedElements();
  }

  protected collectAnimatedElements() {
    const ele = this.shadowRoot!.getElementById("chrome") as SVGElement | null;
    if (ele) {
      this.animatedElements.push(ele);
    }
  }
}

if (!window.customElements.get("chrome-spinner")) {
  // window.ChromeSpinnerElement = ChromeSpinnerElement;
  window.customElements.define("chrome-spinner", ChromeSpinnerElement);
}

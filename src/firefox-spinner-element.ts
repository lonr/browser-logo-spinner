import { BaseSpinnerElement } from "./base-spinner-element";
import firefoxSVG from "../assets/infinite-loop/firefox.svg";
import { defaultStyle } from "./utils";

export default class FirefoxSpinnerElement extends BaseSpinnerElement {
  constructor() {
    super();
  }

  protected init() {
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = defaultStyle + firefoxSVG;
    this.shadowRoot!.appendChild(template.content);
    this.animationNames = ["rotating"];
    this.collectAnimatedElements();
    this.collectAnimations();
    if (!this.loading) {
      this.pause();
    }
  }

  protected collectAnimatedElements() {
    const ele = this.shadowRoot!.getElementById("fox") as SVGElement | null;
    if (ele) {
      this.animatedElements.push(ele);
    }
  }
}

if (!window.customElements.get("firefox-spinner")) {
  window.customElements.define("firefox-spinner", FirefoxSpinnerElement);
}

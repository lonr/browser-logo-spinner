import { BaseSpinnerElement } from "./base-spinner-element";
import safariSVG from "../assets/infinite-loop/safari.svg";
import { defaultStyle } from "./utils";

export default class SafariSpinnerElement extends BaseSpinnerElement {
  constructor() {
    super();
  }

  protected init() {
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = defaultStyle + safariSVG;
    this.shadowRoot!.appendChild(template.content);
    this.animationNames = ["rotating"];
    this.collectAnimatedElements();
    this.collectAnimations();
    if (!this.loading) {
      this.pause();
    }
  }

  protected collectAnimatedElements() {
    const ele = this.shadowRoot!.getElementById("hand") as SVGElement | null;
    if (ele) {
      this.animatedElements.push(ele);
    }
  }
}

if (!window.customElements.get("safari-spinner")) {
  window.customElements.define("safari-spinner", SafariSpinnerElement);
}

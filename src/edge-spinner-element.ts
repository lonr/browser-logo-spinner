import { BaseSpinnerElement } from "./base-spinner-element";
import edgeSVG from "../assets/infinite-loop/edge.svg";
import { defaultStyle } from "./utils";

export default class EdgeSpinnerElement extends BaseSpinnerElement {
  constructor() {
    super();
  }

  protected init() {
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = defaultStyle + edgeSVG;
    this.shadowRoot!.appendChild(template.content);
    this.animationNames = ["rotating"];
    this.collectAnimatedElements();
    this.collectAnimations();
    if (!this.loading) {
      this.pause();
    }
  }

  protected collectAnimatedElements() {
    const ele = this.shadowRoot!.getElementById("edge") as SVGElement | null;
    if (ele) {
      this.animatedElements.push(ele);
    }
  }
}

if (!window.customElements.get("edge-spinner")) {
  window.customElements.define("edge-spinner", EdgeSpinnerElement);
}

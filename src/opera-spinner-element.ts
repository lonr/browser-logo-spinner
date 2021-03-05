import { BaseSpinnerElement } from "./base-spinner-element";
import operaSVG from "../assets/infinite-loop/opera.svg";
import { defaultStyle } from "./utils";

export default class OperaSpinnerElement extends BaseSpinnerElement {
  constructor() {
    super();
  }

  protected init() {
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = defaultStyle + operaSVG;
    this.shadowRoot!.appendChild(template.content);
    this.animationNames = ["left", "right", "switch"];
    this.collectAnimatedElements();
    this.collectAnimations();
    if (!this.loading) {
      this.pause();
    }
  }

  protected collectAnimatedElements() {
    let ele = this.shadowRoot!.getElementById("rightPart") as SVGElement | null;
    if (ele) {
      this.animatedElements.push(ele);
    }
    ele = this.shadowRoot!.getElementById("leftPart") as SVGElement | null;
    if (ele) {
      this.animatedElements.push(ele);
    }
  }

  protected pauseTimeoutID: number | null = null;
  protected schedulePauseFunc() {
    // the animation should always exist
    // there're two switch animations actually
    const switchAnimation = this.animations.filter(
      (animation) => animation?.animationName === "switch"
    )[0];
    // the animation should always be running or paused
    const progress = switchAnimation.effect?.getComputedTiming()
      .progress as number;
    const duration = switchAnimation.effect?.getTiming().duration as number;
    let delay = 0;
    // 0.19 === 0.38 / 2
    if (progress < 0.19) {
      delay = (0.19 - progress) * duration;
    } else {
      delay = (1.19 - progress) * duration;
    }
    this.fasten();
    this.pauseTimeoutID = window.setTimeout(
      this.pauseFunc,
      delay / this.fasterRate
    );
  }

  protected removePauseFunc() {
    window.clearTimeout(this.pauseTimeoutID ?? undefined);
    this.pauseTimeoutID = null;
  }
}

if (!window.customElements.get("opera-spinner")) {
  window.customElements.define("opera-spinner", OperaSpinnerElement);
}

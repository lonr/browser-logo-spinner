import { getBrowserName } from "./utils";

let UABrowser = getBrowserName().toLowerCase();
if (UABrowser === "other") {
  UABrowser = "chrome";
}

export default class BrowserLogoSpinnerElement extends HTMLElement {
  private childSpinnerElement!: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    const browser = this.getAttribute("browser") ?? UABrowser;
    template.innerHTML = `<style>:host { display: inline-block; }</style><${browser}-spinner id="childElement"></${browser}-spinner>`;
    this.shadowRoot!.appendChild(template.content);
    this.childSpinnerElement = this.shadowRoot!.getElementById("childElement")!;
  }

  static get observedAttributes() {
    return ["loading", "delay", "faster-rate"];
  }

  // keep attrs syncing with childSpinnerElement
  attributeChangedCallback(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    if (newVal === null) {
      this.childSpinnerElement.removeAttribute(attrName);
    } else {
      this.childSpinnerElement.setAttribute(attrName, newVal);
    }
  }

  get loading() {
    return this.hasAttribute("loading");
  }

  set loading(val) {
    if (val) {
      this.setAttribute("loading", "");
    } else {
      this.removeAttribute("loading");
    }
  }

  get fasterRate() {
    return parseFloat(this.getAttribute("faster-rate") ?? "2") || 2;
  }

  get delay() {
    return parseInt(this.getAttribute("delay") ?? "0") || 0;
  }
}

if (!window.customElements.get("browser-logo-spinner")) {
  window.customElements.define(
    "browser-logo-spinner",
    BrowserLogoSpinnerElement
  );
}

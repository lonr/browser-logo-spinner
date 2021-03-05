export class BaseSpinnerElement extends HTMLElement {
  snipping: boolean = false;
  animatedElements: SVGElement[] = [];
  animations: Animation[] = [];
  protected animationNames: string[] = [];

  constructor() {
    super();
    this.init();
  }

  protected init() {
    throw new Error("Sub Class need to implement this method");
  }

  connectedCallback() {
    // Animations are ready once appending the element to DOM
    this.collectAnimations();
    if (!this.loading) {
      this.pause();
    }
  }

  static get observedAttributes() {
    return ["loading"];
  }

  attributeChangedCallback(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    if (attrName === "loading") {
      if (newVal === null) {
        this.handleLoaded();
      } else {
        this.handleLoading();
      }
    }
  }

  protected collectAnimatedElements() {
    throw new Error("Sub Class need to implement this method");
  }

  protected collectAnimations() {
    let a = (this.animations = this.animatedElements
      .flatMap((ele) => ele.getAnimations())
      .filter(
        (animation) =>
          animation.animationName &&
          this.animationNames.includes(animation.animationName)
      ));
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
    return parseInt(this.getAttribute("delay") ?? "200") || 200;
  }

  /// run command to all animations
  protected command(callback: (animation: Animation) => void) {
    this.animations.forEach((animation) => {
      callback(animation);
    });
  }

  protected pause() {
    this.command((animation) => {
      animation.pause();
    });
    this.snipping = false;
  }

  protected play() {
    this.command((animation) => {
      animation.play();
    });
    this.snipping = true;
  }

  protected fasten() {
    this.command((animation) => {
      animation.playbackRate = this.fasterRate;
    });
  }

  protected resetPlaybackRate() {
    this.command((animation) => {
      animation.playbackRate = 1;
    });
  }

  protected status: "starting" | "stopping" | null = null;

  // used to remove listener
  protected pauseFunc = () => {
    this.pause();
    this.removePauseFunc();
    this.resetPlaybackRate();
  };

  protected schedulePauseFunc() {
    this.fasten();
    this.animatedElements.forEach((ele) => {
      ele.addEventListener("animationiteration", this.pauseFunc);
    });
  }

  protected removePauseFunc() {
    this.animatedElements.forEach((ele) => {
      ele.removeEventListener("animationiteration", this.pauseFunc);
    });
  }

  protected handleLoaded() {
    if (this.status === "stopping") {
      return;
    } else {
      if (this.status === "starting") {
        this.playTimeoutID && window.clearTimeout(this.playTimeoutID);
        this.playTimeoutID = null;
      }
      this.schedulePauseFunc();
    }
  }

  protected playTimeoutID: number | null = null;
  protected handleLoading() {
    if (this.status === "starting") {
      return;
    } else {
      if (this.status === "stopping") {
        this.removePauseFunc();
      }
      this.playTimeoutID = window.setTimeout(() => {
        this.play();
        this.status = null;
        this.playTimeoutID = null;
      }, this.delay);
      this.status = "starting";
    }
  }
}

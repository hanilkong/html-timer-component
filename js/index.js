class customEl extends HTMLElement {
  constructor() {
    super();
    this.timerTemplate = document.querySelector(".timer-template");
    this.initTime = this.getAttribute("time");
    this.time = this.initTime * 1000;
    this.target = Date.now() + this.time;
    this.interval = 0;
    this.sec = String(Math.floor(this.time / 1000)).padStart(2, "0");
    this.mil = String(Math.floor((this.time % 1000) / 10)).padStart(2, "0");

    this.setTime(this.time);
    this.event();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.interval);
  }

  event() {
    this.querySelector(".play").addEventListener("click", () => {
      this.onPlayClickHandle();
    });
    this.querySelector(".reset").addEventListener("click", () => {
      this.onResetClickHandle();
    });
    this.querySelector(".stop").addEventListener("click", () => {
      this.onStopClickHandle();
    });
  }

  onResetClickHandle() {
    this.time = this.initTime * 1000;
    this.target = Date.now() + this.time;
    this.setTime(this.time);
    this.renderTime();
  }

  onStopClickHandle() {
    cancelAnimationFrame(this.interval);
    this.target = Date.now() + this.time;
  }

  onPlayClickHandle() {
    this.target = Date.now() + this.time;
    this.start();
    return;
  }

  setTime(time) {
    this.sec = String(Math.floor(time / 1000)).padStart(2, "0");
    this.mil = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
    return;
  }

  renderTime() {
    this.querySelector(".time").innerText = `${this.sec} : ${this.mil}`;
    return;
  }

  start() {
    this.time = Math.max(0, this.target - Date.now());
    console.log(
      "🚀 ~ file: index.js:67 ~ customEl ~ start ~ this.time:",
      this.time
    );
    this.setTime(this.time);
    this.interval = requestAnimationFrame(() => this.start());
    if (this.time >= 0) {
      this.renderTime();
    }
    if (this.time === 0) {
      cancelAnimationFrame(this.interval);
      return;
    }
  }

  render() {
    return () => {
      let clone = this.timerTemplate.content.cloneNode(true);
      this.attachShadow({ mode: "open" }).appendChild(clone);
      this.renderTime();
    };
  }
}
customElements.define("timer-component", customEl);

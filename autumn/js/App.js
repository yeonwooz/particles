import {randomNumBetween} from "../../utils.js";
import Background from "./Background.js";
import Rain from "./Rain.js";

export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;
  static bgColor = "#000000";

  constructor() {
    this.background = new Background({img: document.querySelector("#bg-img")});
    window.addEventListener("resize", this.resize.bind(this)); // bind to the App instead of window
    this.rains = [];
  }

  resize() {
    // console.log(this);
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width =
      innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;

    App.canvas.style.width = `${width}px`;
    App.canvas.style.height = `${width * (3 / 4)}px`;
  }

  createRain() {
    const x = randomNumBetween(App.width * 0.2, App.width * 0.8);
    const vy = App.height * randomNumBetween(0.01, 0.015) * -1;
    const colorDeg = randomNumBetween(0, 360);
    this.rains.push(new Rain(x, vy, colorDeg));
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < App.interval) {
        return;
      }
      this.background.draw();

      App.ctx.fillStyle = App.bgColor + "40"; // #0000010
      App.ctx.fillRect(0, 0, App.width, App.height);

      // App.ctx.clearRect(0, 0, App.width, App.height);
      // App.ctx.fillRect(50, 50, 100, 100);

      if (Math.random() < 0.03) {
        this.createRain();
      }
      this.rains.forEach((rain, idx) => {
        rain.update();
        rain.draw();

        if (rain.vy > -0.7) {
          this.rains.splice(idx, 1);
        }
      });

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}

import {randomNumBetween} from "../../utils.js";
import Background from "./Background.js";
import Mouse from "./Mouse.js";
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

    this.mouse = new Mouse(App.canvas);
    this.windVector = 0;
    this.rains = [];
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width = innerWidth > innerHeight ? innerHeight : innerWidth;

    App.canvas.style.width = `${width}px`;
    App.canvas.style.height = `${width * (3 / 4)}px`;
  }

  createRain() {
    const x = randomNumBetween(App.width * -0.01, App.width * 0.99);
    const vy = App.height * randomNumBetween(0.015, 0.02) * -1;
    const colorDeg = 187;
    this.rains.push(new Rain(x, vy, colorDeg, this.windVector));
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

      const mouseXPos = this.mouse.pos.x;

      this.windVector = mouseXPos * 2 - innerWidth;

      App.ctx.fillStyle = App.bgColor + "50"; // #0000010
      App.ctx.fillRect(0, 0, App.width, App.height);

      if (Math.random() < 0.9) {
        this.createRain();
      }
      this.rains.forEach((rain, idx) => {
        rain.update(this.windVector);
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

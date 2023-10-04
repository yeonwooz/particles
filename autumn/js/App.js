import {randomNumBetween} from "../../utils.js";
import Background from "./Background.js";
import Leaf from "./Leaf.js";
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
    this.background = new Background({
      img: document.querySelector("#autumn-forest"),
    });
    window.addEventListener("resize", this.resize.bind(this)); // bind to the App instead of window

    this.leafImages = [
      document.querySelector("#yellow-leaf-1"),
      document.querySelector("#yellow-leaf-2"),
      document.querySelector("#yellow-leaf-3"),
      document.querySelector("#red-leaf"),
    ];
    this.mouse = new Mouse(App.canvas);
    this.windVector = 0;
    this.rains = [];
    this.leaves = [];
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width = Math.min(innerWidth, innerHeight);

    App.canvas.style.width = `${width}px`;
    App.canvas.style.height = `${width * (3 / 4)}px`;
  }

  createRain() {
    const x = randomNumBetween(App.width * -0.01, App.width * 0.99);
    const vy = App.height * randomNumBetween(0.015, 0.02) * -1;
    const colorDeg = 180;
    this.rains.push(new Rain(x, vy, colorDeg, this.windVector));
  }

  createLeaf() {
    const x = randomNumBetween(App.width * -0.01, App.width * 0.99);
    const vy = App.height * randomNumBetween(0.001, 0.003) * -1;

    const idx = Math.floor(randomNumBetween(1, 5)) % 4;
    this.leaves.push(new Leaf(x, vy, this.windVector, this.leafImages[idx]));
  }

  render() {
    let delta;
    let then = performance.now();

    const frame = (now) => {
      requestAnimationFrame(frame);
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

        if (rain.vy < -50) {
          this.rains.splice(idx, 1);
        }
      });

      if (Math.random() < 0.05) {
        this.createLeaf();
      }

      this.leaves.forEach((leaf, idx) => {
        leaf.update(this.windVector);
        leaf.draw();
        if (leaf.vy < -50) {
          this.leaves.splice(idx, 1);
        }
      });

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}

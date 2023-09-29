import CanvasOption from "./CanvasOption.js";
import Particle from "./Particle.js";
import {hypotenuse, randomNumBetween} from "../utils.js";
import Tail from "./Tail.js";
class Canvas extends CanvasOption {
  constructor() {
    super();

    this.tails = [];
    this.particles = [];
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasHeight}px`;

    // this.createParticles();

    // setInterval(() => {
    //   this.createParticles();
    // }, 2000);
  }

  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
    const color = "255,255,255";
    this.tails.push(new Tail(x, vy, color));
  }

  createParticles(currentX, currentY, currentColor) {
    const PARTICLE_NUM = 400;

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r =
        randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);

      const opacity = randomNumBetween(0.6, 0.9);
      this.particles.push(
        new Particle(currentX, currentY, vx, vy, opacity, currentColor),
      );
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) {
        return;
      }

      // this.ctx.fillRect(100, 100, 200, 200);
      this.ctx.fillStyle = this.bgColor + "40"; // #0000010
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // this.particles.forEach((particle, index) => {
      //   particle.update();
      //   particle.draw();

      //   if (particle.opacity < 0) {
      //     this.particles.splice(index, 1);
      //   }
      // });

      if (Math.random() < 0.03) {
        this.createTail();
      }
      this.tails.forEach((tail, idx) => {
        tail.update();
        tail.draw();

        if (tail.vy > -0.7) {
          this.tails.splice(idx, 1);
          this.createParticles(tail.x, tail.y, tail.color);
        }
      });
      // this.tails = this.tails.filter(tail => tail.vy <= -1);

      this.particles.forEach((particle, idx) => {
        particle.update();
        particle.draw();

        if (particle.opacity < 0) {
          this.particles.splice(idx, 1);
        }
      });

      // filter the array to prevent the omission the next element of a sliced one
      // => Bad Performance..?
      // this.particles = this.particles.filter(particle => particle.opacity >= 0);

      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});

import CanvasOption from "./CanvasOption.js";
import Particle from "./Particle.js";
import {randomNumBetween} from "../utils.js";
class Canvas extends CanvasOption {
  constructor() {
    super();

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

    this.createParticles();

    setInterval(() => {
      this.createParticles();
    }, 2000);
  }

  createParticles() {
    const PARTICLE_NUM = 40;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r = randomNumBetween(0, 3);
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);

      this.particles.push(new Particle(x, y, vx, vy));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      window.requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) {
        return;
      }

      // this.ctx.fillRect(100, 100, 200, 200);
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // this.particles.forEach((particle, index) => {
      //   particle.update();
      //   particle.draw();

      //   if (particle.opacity < 0) {
      //     this.particles.splice(index, 1);
      //   }
      // });

      this.particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // filter the array to prevent the omission the next element of a sliced one
      // => Bad Performance..?
      this.particles = this.particles.filter(particle => particle.opacity >= 0);

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

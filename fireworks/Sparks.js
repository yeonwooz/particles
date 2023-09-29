import CanvasOptions from "./CanvasOption.js";

export default class Spark extends CanvasOptions {
  constructor(x, y, opacity) {
    super();
    this.x = x;
    this.y = y;
    this.opacity = opacity;
  }

  update() {
    this.opacity -= 0.01;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255,255,0, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

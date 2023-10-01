import CanvasOption from "../../boilerplate/js/CanvasOption.js";
import {randomNumBetween} from "../../utils.js";

export default class Rain extends CanvasOption {
  constructor(x, vy, colorDeg) {
    super();
    this.x = x;
    this.angle = randomNumBetween(0, 2);
    this.y = 0;
    this.vy = vy;
    this.colorDeg = colorDeg;
    this.friction = 1.015;
    this.opacity = 1;
  }

  update() {
    this.vy *= this.friction;
    this.y -= this.vy;
  }

  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

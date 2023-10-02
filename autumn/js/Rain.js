import CanvasOption from "../../boilerplate/js/CanvasOption.js";
import {randomNumBetween} from "../../utils.js";

export default class Rain extends CanvasOption {
  constructor(x, vy, colorDeg) {
    super();
    this.x = x;
    this.y = 0;
    this.vy = vy;
    this.colorDeg = colorDeg;
    this.acc = 1.05;
    this.opacity = 0.3;
  }

  update() {
    this.vy *= this.acc;
    this.y -= this.vy;
  }

  draw() {
    this.ctx.strokeStyle = `hsla(${this.colorDeg}, 40%, 76%, ${this.opacity})`;
    this.ctx.lineWidth = randomNumBetween(1, 2);
    this.ctx.lineCap = "round";

    // https://zetcode.com/gfx/html5canvas/transparency/

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    const rainLength = randomNumBetween(10, 200);
    this.ctx.lineTo(this.x, this.y - rainLength);

    // this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

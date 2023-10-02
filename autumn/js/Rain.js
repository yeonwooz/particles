import CanvasOption from "../../boilerplate/js/CanvasOption.js";

export default class Rain extends CanvasOption {
  constructor(x, vy, colorDeg) {
    super();
    this.x = x;
    this.y = 0;
    this.vy = vy;
    this.colorDeg = colorDeg;
    this.acc = 1.05;
    this.opacity = 1;
  }

  update() {
    this.vy *= this.acc;
    this.y -= this.vy;
  }

  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 40%, 76%, ${this.opacity})`;

    // https://zetcode.com/gfx/html5canvas/transparency/
    this.ctx.globalAlpha = 0.3;

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

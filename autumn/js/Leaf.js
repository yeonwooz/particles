import CanvasOption from "../../boilerplate/js/CanvasOption.js";

export default class Leaf extends CanvasOption {
  constructor(x, vy, windVector, img) {
    super();
    this.x = x;
    this.y = 0;
    this.vy = vy;
    this.acc = 1.001;
    this.windVector = windVector;
    this.img = img;
  }

  update(curWindVector) {
    this.vy *= this.acc;
    this.y -= this.vy;
    this.windVector = Math.floor(curWindVector / 100);
    this.x += this.windVector;
  }

  draw() {
    const width = 70;
    const height = 70;
    this.ctx.drawImage(this.img, this.x, this.y - height, width, height);
  }
}

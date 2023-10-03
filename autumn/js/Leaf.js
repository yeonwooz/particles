import CanvasOption from "../../boilerplate/js/CanvasOption.js";

export default class Leaf extends CanvasOption {
  constructor(x, vy, img) {
    super();
    this.x = x;
    this.y = 0;
    this.vy = vy;
    this.acc = 1.001;
    this.img = img;
  }

  update() {
    this.vy *= this.acc;
    this.y -= this.vy;
  }

  draw() {
    const width = 70;
    const height = 70;
    this.ctx.drawImage(
      this.img,
      this.x - width,
      this.y - height,
      width,
      height,
    );
  }
}

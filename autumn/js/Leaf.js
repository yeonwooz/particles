import CanvasOption from "../../boilerplate/js/CanvasOption.js";

export default class Leaf extends CanvasOption {
  constructor(x, vy) {
    this.x = x;
    this.y = 0;
    this.vy = vy;
    this.acc = 1.01;
  }

  update() {
    this.vy *= this.acc;
    this.y -= this.vy;
    
  }
}

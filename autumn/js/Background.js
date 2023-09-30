import App from "./App.js";

export default class Background {
  constructor({img}) {
    this.img = img;
  }

  update() {}

  draw() {
    App.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
  }
}

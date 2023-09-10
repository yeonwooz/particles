import {particles} from "./index.js";

const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();

let gui = new dat.GUI();

const f1 = gui.addFolder("Gooey Effect");
const f2 = gui.addFolder("Particle Property");

f1.add(controls, "blurValue", 0, 100).onChange(value => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});

f1.add(controls, "alphaChannel", 1, 200).onChange(value => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`,
  );
});

f1.add(controls, "alphaOffset", -40, 40).onChange(value => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`,
  );
});

// 마지막 인자는 간격(step)
f2.add(controls, "acc", 1, 1.5, 0.01).onChange(value => {
  particles.forEach(particle => {
    particle.acc = value;
  });
});

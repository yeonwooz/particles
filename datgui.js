const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
})();

let gui = new dat.GUI();

gui.add(controls, "blurValue", 0, 100).onChange(value => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});

gui.add(controls, "alphaChannel", 1, 200).onChange(value => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`,
  );
});

gui.add(controls, "alphaOffset", -40, 40).onChange(value => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`,
  );
});

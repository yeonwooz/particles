const canvas = document.querySelector("canvas");
console.log(canvas);

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio; // 해상도 비율|

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasWidth}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

ctx.fillRect(10, 10, 50, 50); // start-x, start-y, rect width, rect height

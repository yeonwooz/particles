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

ctx.beginPath();
ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360); // center's x, center's y, radius, startAngle(radians), endAngle(radians)
/*
180 도 = PI 라디안,
1도 = (PI / 180) 라디안
*/

ctx.fillStyle = "red";
ctx.fill();
// ctx.stroke();
ctx.closePath();

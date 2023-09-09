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

/*
 이 원을 하나의 파티클로 취급하자.
 여러개의 파티클을 관리해보자
*/
class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); // center's x, center's y, radius, startAngle(radians), endAngle(radians)
    /*
        180 도 = PI 라디안,
        1도 = (PI / 180) 라디안
    */

    ctx.fillStyle = "red";
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;

const particle = new Particle(x, y, radius);
particle.draw();

const animate = () => {
  window.requestAnimationFrame(animate); // 매 프레임마다 실행되는 무한 재귀함수
  console.log("animate");
};

animate();

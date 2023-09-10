const canvas = document.querySelector("canvas");
console.log(canvas);

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio; // 해상도 비율|

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

/*
 이 원을 하나의 파티클로 취급하자.
 여러개의 파티클을 관리해보자
*/
class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03;
  }

  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); // center's x, center's y, radius, startAngle(radians), endAngle(radians)
    /*
        180 도 = PI 라디안,
        1도 = (PI / 180) 라디안
    */

    ctx.fillStyle = "orange";
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;

// const particle = new Particle(x, y, radius);
export const particles = [];
const TOTAL = 10;
const randumNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

for (let i = 0; i < TOTAL; i++) {
  const x = randumNumBetween(0, canvasWidth);
  const y = randumNumBetween(0, canvasHeight);
  const radius = randumNumBetween(20, 70);
  const vy = randumNumBetween(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}
// console.log(particles);

/*
fps 보정
*/
let interval = 1000 / 60; // 60fps 기준 (1초에 60프레임)
let now, delta;
let then = Date.now();

const animate = () => {
  window.requestAnimationFrame(animate); // 매 프레임마다 실행되는 무한 재귀함수 -> 재생횟수가 디스플레이 fps 에 의존함
  now = Date.now();
  delta = now - then;

  if (delta < interval) {
    return;
  }

  console.log("clear");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 파티클의 y를 1px 이동시키기

  particles.forEach(particle => {
    particle.update();
    particle.draw();

    if (particle.y + particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randumNumBetween(0, canvasWidth);
      particle.radius = randumNumBetween(50, 100);
      particle.vy = randumNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
};

animate();

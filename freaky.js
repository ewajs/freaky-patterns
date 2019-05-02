class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  rotate(angle, x, y) {
    let d, theta;
    d = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    theta = Math.atan((this.y - y) / (this.x - x));
    let rotatedX =
      Math.cos(angle) * (this.x - x) - Math.sin(angle) * (this.y - y) + x;

    let rotatedY =
      Math.sin(angle) * (this.x - x) + Math.cos(angle) * (this.y - y) + y;
    return new Circle(rotatedX, rotatedY, this.r);
  }

  translate(x, y) {
    return new Circle(this.x + x, this.y + y, this.r);
  }
}

var RADIUS = 2;
var N_CIRCLES = 3000;
var time = 0;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var circles = [];

for (let i = 0; i < N_CIRCLES; i++) {
  let x = Math.random() * 500;
  let y = Math.random() * 500;
  circles.push(new Circle(x, y, RADIUS));
}

function drawAndRotate() {
  // Clear the canvas
  console.log("Looping... " + time);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let j = 0; j < circles.length; j++) {
    circles[j].draw(ctx);
    circles[j].rotate(0.2, time, time).draw(ctx);
  }
  time++;
  if (time < 500) {
    window.setTimeout(drawAndRotate, 100);
  }
}

drawAndRotate();

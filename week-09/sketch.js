let rec;
let x, y, dx, dy;

function setup() {
  rec = new p5.SpeechRec('en-US', parseResult)
  rec.continuous = true;
  rec.interimResults = true;
  rec.start();
  createCanvas(800, 800);
  reset();
}

function draw() {
  fill(255, 255, 0)
  stroke(255)
  ellipse(x, y, 10)
  x += dx
  y += dy
  if (x > width) x = 0; else if (x < 0) x = width;
  if (y > height) y = 0; else if (y < 0) y = height;
}

function parseResult() {
  const word = rec.resultString.split(' ').pop();
  switch (word) {
    case "up":
      dx = 0;
      dy -= 1;
      break;
    case "down":
      dx = 0;
      dy += 1;
      break;
    case "left":
      dx -= 1;
      dy = 0;
      break;
    case "right":
      dx += 1;
      dy = 0;
      break;
    case "stop":
      dx = 0;
      dy = 0;
      break;
    case "clear":
    case "reset":
    case "restart":
      reset();
      break;
    default:
      break;
  }
}

function reset() {
  x = width / 2;
  y = height / 2;
  dx = 0;
  dy = 0;
  background(40);
}
// Exercise 1 template
// Feel freee to modify it or create your own template

// playback controls
let player;

function setup() {
  createCanvas(800, 600);
  background(180);
  console.log("bar")
  player = new Player();
}

function draw() {
  player.draw()
}
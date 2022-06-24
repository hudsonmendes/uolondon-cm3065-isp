// Exercise 1 template
// Feel freee to modify it or create your own template

// playback controls
let sound;

let player;
let pipeline;

function preload() {
  sound = loadSound('./assets/sound.mp3');
}

function setup() {
  createCanvas(800, 600);
  background(235);

  pipeline = new Pipeline({ sound });
  player = new Player({ sound });
  player.setup()
  player.addEventListener(pipeline.handleEvent);
}

function draw() {
  player.draw()
}
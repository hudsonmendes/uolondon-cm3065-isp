// Exercise 1 template
// Feel freee to modify it or create your own template

// playback controls
let sound;

function preload() {
  sound = loadSound('./assets/sound.mp3');
}

function setup() {
  createCanvas(800, 600);
  background(235);
  
  player = new Player({sound});
  player.setup()
}

function draw() {
  player.draw()
}
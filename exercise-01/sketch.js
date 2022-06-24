// Exercise 1 template
// Feel freee to modify it or create your own template

// playback controls
let player;

let gui;
let chain;

function preload() {
  player = loadSound('./assets/sound.mp3');
}

function setup() {
  createCanvas(800, 600);
  background(235);

  gui = new GUI({ player });
  gui.setup()

  player.disconnect();
  chain = new Chain();
  gui.addEventListener(chain.handleEvent);
}

function draw() {
  gui.draw()
  chain.process(player);
}
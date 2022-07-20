let rec;
let colour;
let colourName;

function setup() {
  rec = new p5.SpeechRec('pt-BR', parseResult)
  rec.continuous = true;
  rec.interimResults = true;
  rec.start();
  createCanvas(800, 800);
  reset();
}

function draw() {
  if (colour) {
    const { r, g, b, t } = colour
    background(r, g, b)
    stroke(t)
    fill(t)
    textSize(42)
    textAlign(CENTER)
    text(colourName, width / 2, height / 2)
  }
}

function parseResult() {
  const word = rec.resultString.split(' ').pop();
  colourName = word.toLowerCase()
  switch (word) {
    case "vermelho":
    case "red":
      colour = { r: 255, g: 0, b: 0, t: 255 }
      break;
    case "verde":
    case "green":
      colour = { r: 0, g: 255, b: 0, t: 0 }
      break;
    case "azul":
    case "blue":
      colour = { r: 0, g: 0, b: 255, t: 255 }
      break;
    case "amarelo":
    case "yellow":
        colour = { r: 255, g: 255, b: 0, t: 0 }
        break;
    case "laranja":
    case "orange":
        colour = { r: 255, g: 127, b: 0, t: 0 }
        break;
    case "prata":
    case "silver":
        colour = { r: 180, g: 180, b: 180, t: 0 }
        break;
    case "preto":
    case "black":
        colour = { r: 0, g: 0, b: 0, t: 255 }
        break;
    case "branco":
    case "white":
        colour = { r: 255, g: 255, b: 255, t: 0 }
        break;
    case "limpar":
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
  background(255);
  colourName = undefined
  colour = undefined
}
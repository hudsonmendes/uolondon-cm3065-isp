// =====================================================================================================================
// TASK 1
// =====================================================================================================================
// (1) The DJ sends you three sounds (Ex2_sound1.wav, Ex2_sound2.wav and Ex2_sound3.wav)
// (2) you have to select Meyda audio features that could help represent these sounds visually in an appropriate manner.
// (3) For example, if the ‘brightness’ of one of the sounds radically changes over time
//
// TASK 2
// =====================================================================================================================
// (1) creating the aforementioned web-based application for audio, use g Kalte_Ohren_(_Remix_).mp3
// (2) Kalte Ohren ( Remix ) by Dysfunction_AL (c) copyright 2019 Licensed under a Creative Commons Attribution (3.0) license. http://dig.ccmixter.org/files/destinazione_altrove/59536 Ft: Starfrosch, Kara Square

var soundFile

// playback
var btnPlayStop
var isPlaying

// visualisation
var analyzer
var spectrumAmpMax

function preload() {
    soundFormats("mp3", "wav")
    soundFile = loadSound("files/Ex2_sound1.wav")
}

function setup() {
    createCanvas(1000, 600)
    background(0)
    setupMeyda()
    setupPlayback()
}

function setupMeyda() {
    analyzer = new Meyda.createMeydaAnalyzer({
        audioContext: getAudioContext(),
        source: soundFile,
        bufferSize: 512,
        featureExtractors: ["amplitudeSpectrum"],
        callback: handleMeydaCallback,
    })
}

function setupPlayback() {
    // playback
    isPlaying = false
    btnPlayStop = setupButton({
        text: !isPlaying ? "play" : "stop",
        color: !isPlaying ? "green" : "red",
        pos: { x: width - 60, y: 10 },
    })
    btnPlayStop.mousePressed(() => {
        if (isPlaying) {
            analyzer.stop()
            soundFile.stop()
            isPlaying = false
        } else {
            soundFile.loop()
            analyzer.start()
            isPlaying = true
        }
        btnPlayStop.html(!isPlaying ? "play" : "stop")
        btnPlayStop.style("background-color", !isPlaying ? "green" : "red")
    })
}

function setupButton({ text, color, pos: { x, y } }) {
    btn = createButton(text)
    btn.style("background-color", color)
    btn.style("border", "solid 1px #fff")
    btn.style("border-radius", "5px")
    btn.style("color", "#fff")
    btn.style("padding", "5px 10px")
    btn.style("cursor", "pointer")
    btn.position(x, y)
    return btn
}

function draw() {
    // put drawing code here
}

function handleMeydaCallback(features) {
    // spectrum
    let spectrum = features.amplitudeSpectrum
    if (spectrum) drawSpectrum(spectrum)
}

function drawSpectrum(spectrum) {
    background(0)
    const spectrumWidth = width / spectrum.length
    const spectrumMax = spectrum.reduce((a, b) => Math.max(a, b), 0)
    if (!spectrumAmpMax || spectrumAmpMax < spectrumMax) spectrumAmpMax = spectrumMax
    for (let i = 0; i < spectrum.length; i++) {
        const amp = spectrum[i]
        const y = map(amp, 0, spectrumAmpMax * (2 / 3), height / 2, 0)
        const z = map(amp, 0, spectrumAmpMax, 255, 128)
        const h = height / 2 - y
        fill(0, 143, 17, z)
        rect(i * spectrumWidth, y, spectrumWidth, h)
        fill(255, 0, 0, z)
        rect(i * spectrumWidth, height / 2, spectrumWidth, h)
    }
}

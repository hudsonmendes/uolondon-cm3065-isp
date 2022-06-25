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
var spectrumReported
var spectralSpreadHistogram

// scalers
var spectrumAmpMax
var spectralSpreadBoxes

function preload() {
    soundFormats("mp3", "wav")
    soundFile = loadSound("files/Kalte_Ohren_(_Remix_).mp3")
    //soundFile = loadSound("files/Ex2_sound1.wav")
}

function setup() {
    createCanvas(1000, 600)
    background(0)
    setupMeyda()
    setupPlayback()
}

function setupMeyda() {
    spectrumAmpMax = 25

    spectralSpreadBoxes = [1, 5]
    spectralSpreadHistogram = {}
    for (let i = 0; i < max(spectralSpreadBoxes); i++) spectralSpreadHistogram[i] = 0

    analyzer = new Meyda.createMeydaAnalyzer({
        audioContext: getAudioContext(),
        source: soundFile,
        bufferSize: 512,
        featureExtractors: ["amplitudeSpectrum", "spectralSpread"],
        callback: handleMeydaCallback,
    })
}

function setupPlayback() {
    // playback
    isPlaying = false
    const textColour = (playing) => (!playing ? "#008F11" : "black")
    const bgColour = (playing) => (!playing ? "black" : "#008F11")
    btnPlayStop = setupButton({
        text: !isPlaying ? "play" : "stop",
        c: textColour(isPlaying),
        bg: bgColour(isPlaying),
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
        btnPlayStop.style("color", textColour(isPlaying))
        btnPlayStop.style("background-color", bgColour(isPlaying))
    })
}

function setupButton({ text, c, bg, pos: { x, y } }) {
    btn = createButton(text)
    btn.style("background-color", bg)
    btn.style("border", `solid 1px ${c}`)
    btn.style("border-radius", "5px")
    btn.style("color", c)
    btn.style("padding", "5px 10px")
    btn.style("cursor", "pointer")
    btn.position(x, y)
    return btn
}

function draw() {
    // put drawing code here
    background(0)

    if (spectrumReported) {
        drawSpectrum(spectrumReported)
        spectrumReported = null
    }

    if (spectralSpreadHistogram) {
        drawSpectralSpreadHistogram(spectralSpreadHistogram)
    }
}

function drawSpectrum(spectrum) {
    const spectrumWidth = width / spectrum.length
    for (let i = 0; i < spectrum.length; i++) {
        const amp = spectrum[i]
        const y = map(amp, 0, spectrumAmpMax * (2 / 3), height / 2, 0)
        const z = map(amp, 0, spectrumAmpMax, 255, 128)
        const h = height / 2 - y
        fill(0, 143, 17, z)
        rect(i * spectrumWidth, y, spectrumWidth, h)
        fill(0, 143, 17, min(z, 128))
        rect(i * spectrumWidth, height / 2, spectrumWidth, h)
    }
}

function drawSpectralSpreadHistogram(histogram) {
    let n = spectralSpreadBoxes[0]
    let maxCount = 0
    for (let nBoxes in histogram)
        if (maxCount < histogram[nBoxes]) {
            n = nBoxes
            maxCount = histogram[nBoxes]--
        }
    const h = 200
    const w = h / 2
    const wfull = n * w
    const x0 = (width - wfull) / 2
    const y = (height - h) / 2
    fill(0, 143, 17, 128)
    for (let i = 0; i < n; i++) {
        x = i * w
        rect(x0 + x, y, w, h)
    }
}

function handleMeydaCallback(features) {
    // spectrum
    const spectrum = features.amplitudeSpectrum
    if (spectrum && !spectrumReported) spectrumReported = spectrum

    // spectralSpread
    const spectralSpread = features.spectralSpread
    if (spectralSpread) {
        const [spectralSpreadBoxesMin, spectralSpreadBoxesMax] = spectralSpreadBoxes
        const spectralSpreadBox = parseInt(spectralSpread / 10)
        const spectralSpreadBoxBounded = max(spectralSpreadBoxesMin, min(spectralSpreadBoxesMax - 1, spectralSpreadBox))
        spectralSpreadHistogram[spectralSpreadBoxBounded] += 1
    }
}

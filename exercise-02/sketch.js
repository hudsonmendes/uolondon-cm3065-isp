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
var rmsReported
var spectrumReported
var spectralSpreadHistogram
var spectralCrestReported

// scalers
var rmsMax
var spectrumAmpMax
var spectralSpreadBoxes
var spectralCrestMax

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
    spectralSpreadBoxes = 7
    spectralSpreadHistogram = new Array(spectralSpreadBoxes).fill(0)

    analyzer = new Meyda.createMeydaAnalyzer({
        audioContext: getAudioContext(),
        source: soundFile,
        bufferSize: 512,
        featureExtractors: ["rms", "amplitudeSpectrum", "spectralSpread", "spectralCrest"],
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

    drawTitle(`
        Kalte Ohren ( Remix ) by Dysfunction_AL
        (c) copyright 2019 Licensed under a Creative Commons Attribution (3.0) license.
        http://dig.ccmixter.org/files/destinazione_altrove/59536
        Ft: Starfrosch, Kara Square`)

    if (rmsReported) {
        drawRMSBass(rmsReported, spectralCrestReported)
    }

    if (spectralSpreadHistogram) {
        drawSpectralSpreadHistogram(spectralSpreadHistogram)
    }

    if (spectrumReported) {
        drawSpectrum(spectrumReported)
        spectrumReported = null
    }
}

function drawTitle(title) {
    try {
        push()
        translate(width / 2, height / 2)
        noStroke()
        fill(0, 143, 17, 192)
        textSize(16)
        textAlign(CENTER)
        text(title, 0, -height / 2.5)
    } finally {
        pop()
    }
}

function drawRMSBass(rms, spectralCrest) {
    const w = width * 1.5
    const h = map(rms, 0, rmsMax, 100, height / 3)
    try {
        push()
        translate(width / 2, height)
        const spectralCrestCutOff = spectralCrestMax / 3
        const r = map(spectralCrest <= spectralCrestCutOff ? spectralCrest : 0, 0, spectralCrestCutOff, 0, 255)
        const g = map(spectralCrestCutOff < spectralCrest <= spectralCrestCutOff ? spectralCrest : 0, spectralCrestCutOff, spectralCrestMax, 0, 143)
        stroke(r, g, 17, 192)
        strokeWeight(1)
        fill(r, g, 17, 128)
        ellipseMode(CENTER)
        ellipse(0, 0, w, h)
    } finally {
        pop()
    }
}

function drawSpectralSpreadHistogram(histogram, rotation = undefined) {
    const n = spectralSpreadBoxes
    const wfull = min(width, height) * 0.75
    const w = wfull / n
    const calculatePos = (i) => parseInt((i + 1) / 2) * (i % 2 !== 0 ? -1 : 1)
    const piall = [...Array(n).keys()].map(calculatePos).sort((a, b) => a - b)
    push()
    try {
        translate(width / 2, height / 2)
        if (rotation) rotate(rotation % (2 * PI))
        const m = max(histogram)
        const x0 = -w / 2
        for (let i = 0; i < n; i++) {
            const iprime = piall[i]
            const c = histogram[i]
            if (c > 0 && c === m) histogram[i]--
            if (m > 0) {
                const h = 200 * (c / m)
                if (!isNaN(h) && h > 0) {
                    const x = x0 + w * iprime
                    const y = -h / 2
                    stroke(0, 143, 17, 192)
                    strokeWeight(1)
                    fill(0, 143, 17, 128)
                    rect(x, y, w, h)
                }
            }
        }
    } finally {
        pop()
    }
}

function drawSpectrum(spectrum) {
    const spectrumWidth = width / spectrum.length
    for (let i = 0; i < spectrum.length; i++) {
        const amp = spectrum[i]
        const y = map(amp, 0, spectrumAmpMax * (2 / 3), height / 2, 0)
        const z = map(amp, 0, spectrumAmpMax, 255, 128)
        const h = height / 2 - y
        stroke(0)
        strokeWeight(1)
        fill(0, 143, 17, z)
        rect(i * spectrumWidth, y, spectrumWidth, h)
        fill(0, 143, 17, min(z, 128))
        rect(i * spectrumWidth, height / 2, spectrumWidth, h)
    }
}

function handleMeydaCallback(features) {
    // rms
    const rms = features.rms
    if (rms) {
        rmsReported = rms
        if (!rmsMax || rmsMax < rms) rmsMax = rms
    }

    // spectrum
    const spectrum = features.amplitudeSpectrum
    if (spectrum && !spectrumReported) {
        spectrumReported = spectrum
    }

    // spectralSpread
    const spectralSpread = features.spectralSpread
    if (spectralSpread) {
        const spectralSpreadBox = parseInt(spectralSpread / 10)
        const spectralSpreadBoxBounded = max(0, min(spectralSpreadBoxes - 1, spectralSpreadBox))
        spectralSpreadHistogram[spectralSpreadBoxBounded]++
    }

    // spectralCrest
    const spectralCrest = features.spectralCrest
    if (spectralCrest) {
        spectralCrestReported = spectralCrest
        if (!spectralCrestMax || spectralCrestMax < spectralCrest) spectralCrestMax = spectralCrest
    }
}

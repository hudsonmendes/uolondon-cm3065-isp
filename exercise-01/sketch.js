// Exercise 1 template
// Feel freee to modify it or create your own template

// playback controls
var pauseButton
var playButton
var stopButton
var skipStartButton
var skipEndButton
var loopButton
var recordButton

// low-pass filter
var lp_cutOffSlider
var lp_resonanceSlider
var lp_dryWetSlider
var lp_outputSlider

// dynamic compressor
var dc_attackSlider
var dc_kneeSlider
var dc_releaseSlider
var dc_ratioSlider
var dc_thresholdSlider
var dc_dryWetSlider
var dc_outputSlider

// master volume
var mv_volumeSlider

// reverb
var rv_durationSlider
var rv_decaySlider
var rv_dryWetSlider
var rv_outputSlider
var rv_reverseButton

// waveshaper distortion
var wd_amountSlider
var wd_oversampleSlider
var wd_dryWetSlider
var wd_outputSlider

// coordination
var effect
var player

// recording
var recorder
var recording
var outFile

// filters
var lowpassFilter
var waveshaperDistortion
var dynamicCompressor
var reverbFilter

// enums
const distortionOversampling = {
    0: "none",
    1: "2x",
    2: "4x",
}

function preload() {
    soundFormats("wav", "mp3")
    player = loadSound("assets/poem")
    outFile = new p5.SoundFile()
}

function setup() {
    createCanvas(800, 600)
    background(180)
    setupGUI()
    setupChain()
    setupRecorder()
    refreshEffects()
}

function setupGUI() {
    // Playback controls
    pauseButton = createButton("pause")
    pauseButton.position(10, 20)
    pauseButton.mousePressed(() => player.pause())
    playButton = createButton("play")
    playButton.position(70, 20)
    playButton.mousePressed(() => player.play())
    stopButton = createButton("stop")
    stopButton.position(120, 20)
    stopButton.mousePressed(() => player.stop())
    skipStartButton = createButton("skip to start")
    skipStartButton.position(170, 20)
    skipStartButton.mousePressed(() => player.jump(0))
    skipEndButton = createButton("skip to end")
    skipEndButton.position(263, 20)
    skipEndButton.mousePressed(() => player.jump(player.duration()))
    loopButton = createButton("loop")
    loopButton.position(352, 20)
    loopButton.mousePressed(() => player.loop())
    recordButton = createButton("record")
    recordButton.position(402, 20)
    recordButton.mousePressed(() => {
        if (!recording) {
            recording = true
            recorder.record(outFile)
            recordButton.html("stop")
        } else {
            recording = false
            recorder.stop()
            save(outFile, "output.wav")
            recordButton.html("record")
        }
    })

    // Important: you may have to change the slider parameters (min, max, value and step)

    // low-pass filter
    textSize(14)
    text("low-pass filter", 10, 80)
    textSize(10)
    lp_cutOffSlider = createSlider(10, 22050, 22050, 10)
    lp_cutOffSlider.position(10, 110)
    text("cutoff frequency", 10, 105)
    lp_resonanceSlider = createSlider(0.001, 1000, 1000, 0.01)
    lp_resonanceSlider.position(10, 155)
    text("resonance", 10, 150)
    lp_dryWetSlider = createSlider(0, 1, 0, 0.01)
    lp_dryWetSlider.position(10, 200)
    text("dry/wet", 10, 195)
    lp_outputSlider = createSlider(0, 1, 1, 0.01)
    lp_outputSlider.position(10, 245)
    text("output level", 10, 240)

    // dynamic compressor
    textSize(14)
    text("dynamic compressor", 210, 80)
    textSize(10)
    dc_attackSlider = createSlider(0, 1, 0.003, 0.001)
    dc_attackSlider.position(210, 110)
    text("attack", 210, 105)
    dc_kneeSlider = createSlider(0, 40, 30, 1)
    dc_kneeSlider.position(210, 155)
    text("knee", 210, 150)
    dc_releaseSlider = createSlider(0, 1, 0.25, 0.01)
    dc_releaseSlider.position(210, 200)
    text("release", 210, 195)
    dc_ratioSlider = createSlider(0, 20, 12, 1)
    dc_ratioSlider.position(210, 245)
    text("ratio", 210, 240)
    dc_thresholdSlider = createSlider(-100, 0, 0, 1)
    dc_thresholdSlider.position(360, 110)
    text("threshold", 360, 105)
    dc_dryWetSlider = createSlider(0, 1, 0, 0.01)
    dc_dryWetSlider.position(360, 155)
    text("dry/wet", 360, 150)
    dc_outputSlider = createSlider(0, 1, 1, 0.01)
    dc_outputSlider.position(360, 200)
    text("output level", 360, 195)

    // master volume
    textSize(14)
    text("master volume", 560, 80)
    textSize(10)
    mv_volumeSlider = createSlider(0, 1, 0.5, 0.01)
    mv_volumeSlider.position(560, 110)
    text("level", 560, 105)

    // reverb
    textSize(14)
    text("reverb", 10, 305)
    textSize(10)
    rv_durationSlider = createSlider(0, 10, 0, 0.1)
    rv_durationSlider.position(10, 335)
    text("duration", 10, 330)
    rv_decaySlider = createSlider(0, 100, 100, 1)
    rv_decaySlider.position(10, 380)
    text("decay", 10, 375)
    rv_dryWetSlider = createSlider(0, 1, 0, 0.01)
    rv_dryWetSlider.position(10, 425)
    text("dry/wet", 10, 420)
    rv_outputSlider = createSlider(0, 1, 1, 0.01)
    rv_outputSlider.position(10, 470)
    text("output level", 10, 465)
    rv_reverseButton = createButton("reverb reverse")
    rv_reverseButton.position(10, 510)

    // waveshaper distortion
    textSize(14)
    text("waveshaper distortion", 210, 305)
    textSize(10)
    wd_amountSlider = createSlider(0, 1, 0, 0.01)
    wd_amountSlider.position(210, 335)
    text("distortion amount", 210, 330)
    wd_oversampleSlider = createSlider(0, 2, 0, 1)
    wd_oversampleSlider.position(210, 380)
    text("oversample", 210, 375)
    wd_dryWetSlider = createSlider(0, 1, 0, 0.01)
    wd_dryWetSlider.position(210, 425)
    text("dry/wet", 210, 420)
    wd_outputSlider = createSlider(0, 1, 1, 0.01)
    wd_outputSlider.position(210, 470)
    text("output level", 210, 465)

    // spectrums
    textSize(14)
    text("spectrum in", 560, 200)
    text("spectrum out", 560, 345)
}

function setupChain() {
    lowpassFilter = new p5.LowPass()
    waveshaperDistortion = new p5.Distortion()
    dynamicCompressor = new p5.Compressor()
    reverbFilter = new p5.Reverb()
    masterVolume = new p5.Gain()

    // chain
    player.disconnect()
    lowpassFilter.disconnect()
    lowpassFilter.process(player)
    waveshaperDistortion.disconnect()
    waveshaperDistortion.process(lowpassFilter)
    dynamicCompressor.disconnect()
    dynamicCompressor.process(waveshaperDistortion)
    reverbFilter.disconnect()
    reverbFilter.process(dynamicCompressor)
    masterVolume.disconnect()
    masterVolume.setInput(reverbFilter)
    masterVolume.connect()
}

function setupRecorder() {
    recorder = new p5.SoundRecorder()
    recorder.setInput(masterVolume)
    recording = false
}

function draw() {
    refreshEffects()
}

function refreshEffects() {
    lowpassFilter.set(lp_cutOffSlider.value(), lp_resonanceSlider.value())
    lowpassFilter.drywet(lp_dryWetSlider.value())
    lowpassFilter.amp(lp_outputSlider.value())

    waveshaperDistortion.set(wd_amountSlider.value(), distortionOversampling[wd_oversampleSlider.value()])
    waveshaperDistortion.drywet(wd_dryWetSlider.value())
    waveshaperDistortion.amp(wd_outputSlider.value())

    dynamicCompressor.set(dc_attackSlider.value(), dc_kneeSlider.value(), dc_ratioSlider.value(), dc_thresholdSlider.value(), dc_releaseSlider.value())
    dynamicCompressor.drywet(dc_dryWetSlider.value())
    dynamicCompressor.amp(dc_outputSlider.value())

    reverbFilter.set(rv_durationSlider.value(), rv_decaySlider.value(), false)
    reverbFilter.drywet(rv_dryWetSlider.value())
    reverbFilter.amp(rv_outputSlider.value())

    masterVolume.amp(mv_volumeSlider.value())
}

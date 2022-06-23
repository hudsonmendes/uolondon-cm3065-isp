class Player extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // controls
        this.playback = new PlaybackUI();
        this.lowPass = new LowpassUI();
        this.dynamicCompressor = new DynamicCompressorUI()
        this.volume = new VolumeUI();
        this.reverb = new ReverbUI();
        this.waveShaper = new WaveShaperUI()
    }

    draw() {
        this.playback.draw();
        this.lowPass.draw();
        this.dynamicCompressor.draw();
        this.volume.draw();
        this.reverb.draw();
        this.waveShaper.draw();
    }
}
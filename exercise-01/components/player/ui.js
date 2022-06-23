class Player extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // controls
        this.playback = new Playback();
        this.lowPass = new LowPass();
        this.dynamicCompressor = new DynamicCompressor()
        this.volume = new Volume();
        this.reverb = new Reverb();
        this.waveShifter = new WaveShifter()
    }

    draw() {
        this.playback.draw();
        this.lowPass.draw();
        this.dynamicCompressor.draw();
        this.volume.draw();
        this.reverb.draw();
        this.waveShifter.draw();
    }
}
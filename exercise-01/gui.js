class GUI extends Drawable {
    constructor({ player }) {
        super();
        // binds
        this.draw = this.draw.bind(this);
        // attributes
        this.player = player;
        // controls
        this.playback = new Playback({ player });
        this.lowPass = new Lowpass();
        this.dynamicCompressor = new DynamicCompressor();
        this.volume = new Volume();
        this.reverb = new Reverb();
        this.waveShaper = new WaveShaper();
    }

    get isPlaying() {
        return this.player && this.player.isPlaying();
    }

    setup() {
        this.playback.setup();

        this.lowPass.setup();

        this.dynamicCompressor.setup();
        this.dynamicCompressor.addEventListener(this.propagateEvent);

        this.volume.setup();
        this.volume.addEventListener(this.propagateEvent);

        this.reverb.setup();

        this.waveShaper.setup();
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

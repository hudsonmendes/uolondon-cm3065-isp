class GUI extends Drawable {
    constructor({ sound: player }) {
        super();
        // binds
        this.draw = this.draw.bind(this);
        // attributes
        this.sound = player;
        // controls
        this.playback = new PlaybackUI({ player });
        this.lowPass = new LowpassUI();
        this.dynamicCompressor = new DynamicCompressorUI()
        this.volume = new VolumeUI();
        this.reverb = new ReverbUI();
        this.waveShaper = new WaveShaperUI()
    }

    get isPlaying() {
        return this.sound && this.sound.isPlaying();
    }

    setup() {
        this.playback.setup();

        this.lowPass.setup();

        this.dynamicCompressor.setup();

        this.volume.setup();
        this.volume.addEventListener('volumeChanged', this.propagateEvent);

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

    listenToAnyEvent(listeners) {

    }
}
class Chain {
    constructor() {
        // binds
        this.attach = this.attach.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        // attributes
        this.player = null;
        this.volumeLevel = Volume.defaultLevel;
        // filters
        this.lowpassFilter = new p5.LowPass();
        this.waveshaperFilter = new p5.Distortion();
        this.dynamicCompressor = new p5.Compressor();
        this.reverbFilter = new p5.Reverb();
    }

    attach(player) {
        if (!this.player) {
            this.player = player
            this.lowpassFilter.process(this.player);
            this.waveshaperFilter.process(this.player);
            this.dynamicCompressor.process(this.player);
            this.reverbFilter.process(this.player);
        }
    }

    disconnect() {
        this.player.disconnect();
        this.player = null;
    }

    handleEvent(event) {
        if (event.type == "volumeChanged" && this.player)
            this.player.setVolume(this.volumeLevel)
    }
}
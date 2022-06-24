class Chain {
    constructor() {
        // binds
        this.attach = this.attach.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        // attributes
        this.player = null;
        // filters
        this.lowpassFilter = new p5.LowPass();
        this.waveshaperFilter = new p5.Distortion();
        this.dynamicCompressor = new p5.Compressor();
        this.reverbFilter = new p5.Reverb();
    }

    attach(player) {
        if (!this.player) {
            this.player = player;
            this.lowpassFilter.process(this.player);
            this.waveshaperFilter.process(this.player);
            this.dynamicCompressor.process(this.player);
            this.reverbFilter.process(this.player);
            this.player.setVolume(Volume.defaultLevel);
        }
    }

    disconnect() {
        this.player.disconnect();
        this.player = null;
    }

    handleEvent(event) {
        switch (event.type) {
            case "volumeChanged":
                this.player.setVolume(event.volumeLevel);
                break;
            case "attackChanged":
                this.dynamicCompressor.set("attack", event.attack);
                break;
            case "releaseChanged":
                this.dynamicCompressor.set("release", event.release);
                break;
            case "kneeChanged":
                this.dynamicCompressor.set("knee", event.knee);
                break;
            case "ratioChanged":
                this.dynamicCompressor.set("ratio", event.ratio);
                break;
            case "thresholdChanged":
                this.dynamicCompressor.set("threshold", event.threshold);
                break;
        }
    }
}

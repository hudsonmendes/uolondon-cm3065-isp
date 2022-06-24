class Chain {
    constructor() {
        // binds
        this.attach = this.process.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        // attributes
        this.volumeLevel = 0.5;
        // filters
        this.reverbFilter = new p5.Reverb();
    }

    process(x) {
        this.reverbFilter.process(x);
        x.setVolume(this.volumeLevel)
        return x;
    }

    handleEvent(event) {
        if (event.type == "volumeChanged")
            this.volumeLevel = event.volumeLevel;
    }
}
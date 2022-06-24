class Pipeline extends Filter {
    constructor({ sound }) {
        super();
        // attributes
        this.sound = sound;
        // filters
        this.volumeFilter = VolumeFilter({ sound })
    }

    process(x) {
        var x = self.volume.process(x)
        return x;
    }

    handleEvent(event) {
        if (event.type == "volumeChanged")
            this.volumeFilter.volume = event.volume;
    }
}
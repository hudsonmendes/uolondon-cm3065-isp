class Pipeline extends Filter {
    constructor() {
        this.volme = VolumeFilter()
    }

    process(x) {
        var x = self.volume.process(x)
        return x;
    }
}
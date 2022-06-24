class VolumeFilter extends Filter {

    constructor() {
        super();
        this._volume = 1;
    }

    /**
     * @param {float} value - volume value, ranging from 0 to 1 (or clipped)
     */
    set volume(value) {
        this._volume = between(value, 0, 1);
    }

    process(x) {
        x.setVolume(this.volume);
    }

}
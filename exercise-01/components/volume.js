class VolumeUI extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this);
        this.handleVolumeChanged = this.handleVolumeChanged.bind(this);
        // master volume
        this.mv_volumeSlider = null;
    }

    setup() {
        // master volume
        textSize(14);
        text('master volume', 560, 80);
        textSize(10);

        text('level', 560, 105)
        this.mv_volumeSlider = createSlider(0, 1, 0.5, 0.01);
        this.mv_volumeSlider.position(560, 110);
        this.mv_volumeSlider.input(this.handleVolumeChanged);
    }

    draw() {
    }

    handleVolumeChanged(e) {
        this.dispatchEvent({
            type: 'volumeChanged',
            target: e.target,
            volumeLevel: this.mv_volumeSlider.value()
        });
    }
}
class Volume extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // master volume
        this.mv_volumeSlider = null;
    }

    draw() {
        // master volume
        textSize(14);
        text('master volume', 560, 80);
        textSize(10);
        this.mv_volumeSlider = createSlider(0, 1, 0.5, 0.01);
        this.mv_volumeSlider.position(560, 110);
        text('level', 560, 105)
    }
}
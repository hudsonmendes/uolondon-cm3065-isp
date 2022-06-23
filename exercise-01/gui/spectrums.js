class Spectrums extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
    }

    draw() {
        // spectrums
        textSize(14);
        text('spectrum in', 560, 200);
        text('spectrum out', 560, 345);
    }
}
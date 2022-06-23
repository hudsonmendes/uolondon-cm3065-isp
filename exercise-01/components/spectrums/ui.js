class Spectrums extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // controls
        this.spectrumIn = new Spectrum({ title: 'spectrum in', x: 560, y: 200 });
        this.spectrumOut = new Spectrum({ title: 'spectrum out', x: 560, y: 345 });
    }

    draw() {
        this.spectrumIn.draw();
        this.spectrumOut.draw();
    }
}
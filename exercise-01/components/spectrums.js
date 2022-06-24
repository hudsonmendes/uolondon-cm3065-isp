class Spectrums extends Drawable {
    constructor() {
        super();
        // binds
        this.draw = this.draw.bind(this)
        // controls
        this.spectrumIn = new SpectrumUI({ title: 'spectrum in', x: 560, y: 200 });
        this.spectrumOut = new SpectrumUI({ title: 'spectrum out', x: 560, y: 345 });
    }

    setup() {
        this.spectrumIn.setup();
        this.spectrumOut.setup();
    }

    draw() {
        this.spectrumIn.draw();
        this.spectrumOut.draw();
    }
}

class Spectrum extends Drawable {
    constructor({ title, x, y }) {
        super()
        // binds
        this.draw = this.draw.bind(this)
        // attributes
        this.title = title
        this.x = x
        this.y = y
    }

    setup() {
        // spectrums
        textSize(14);
        text(this.title, this.x, this.y);
    }

    draw() {
    }
}
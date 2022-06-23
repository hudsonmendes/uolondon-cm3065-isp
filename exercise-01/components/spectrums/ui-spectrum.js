class Spectrum extends Drawable {
    constructor({title, x, y}) {
        super()
        // binds
        this.draw = this.draw.bind(this)
        // attributes
        this.title = title
        this.x = x
        this.y = y
    }

    draw() {
        // spectrums
        textSize(14);
        text(this.title, this.x, this.y);
    }
}
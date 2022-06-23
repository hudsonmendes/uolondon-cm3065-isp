class Drawable {
    constructor() {
        if (new.target === Drawable)
            throw new TypeError('Cannot construct abstract class');
    }

    draw() {
        throw new Error('draw() not implemented');
    }
}
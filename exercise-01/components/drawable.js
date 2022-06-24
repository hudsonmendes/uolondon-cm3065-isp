class Drawable {
    constructor() {
        if (new.target === Drawable)
            throw new TypeError('Cannot construct abstract class');
    }

    setup() {
        throw new Error('setup() not implemented');
    }

    draw() {
        throw new Error('draw() not implemented');
    }
}
class Step {
    constructor() {
        if (new.target === Step)
            throw new TypeError('Cannot construct abstract class');
    }

    process(input) {
        throw new Error('draw() not implemented');
    }
}
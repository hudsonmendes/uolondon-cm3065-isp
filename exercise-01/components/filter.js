export default class Fitler {
    constructor() {
        if (new.target === Fitler)
            throw new TypeError('Cannot construct abstract class');
    }

    process(input) {
        throw new Error('draw() not implemented');
    }
}
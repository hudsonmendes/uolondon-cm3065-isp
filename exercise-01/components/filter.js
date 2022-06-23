class Filter {
    constructor() {
        if (new.target === Filter)
            throw new TypeError('Cannot construct abstract class');
    }

    process(input) {
        throw new Error('draw() not implemented');
    }
}
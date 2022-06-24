class Filter {
    constructor() {
        if (new.target === Filter)
            throw new TypeError('Cannot construct abstract class');
    }

    process(x) {
        throw new Error('process() not implemented');
    }
}
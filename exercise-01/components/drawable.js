class Drawable {
    constructor() {
        if (new.target === Drawable)
            throw new TypeError('Cannot construct abstract class');
        // binds
        this.addEventListener = this.addEventListener.bind(this);
        this.removeEventListener = this.addEventListener.bind(this);
        this.dispatchEvent = this.dispatchEvent.bind(this);
        this.propagateEvent = this.propagateEvent.bind(this);
        // attributes
        this.listeners = {};
    }

    setup() {
        throw new Error('setup() not implemented');
    }

    draw() {
        throw new Error('draw() not implemented');
    }

    addEventListener(type, listener) {
        if (!this.listeners[type])
            this.listeners[type] = [];
        this.listeners.push(listener);
        return this;
    }

    removeEventListener(type, listener) {
        if (!this.listeners[type])
            return this;
        this.listeners[type].splice(this.listeners[type].indexOf(listener), 1);
    }

    dispatchEvent(event) {
        if (!this.listeners[type.type])
            return;
        this.listeners[type.type].forEach(listener => listener(event));
    }

    propagateEvent(event) {
        this.dispatchEvent(event);
    }
}
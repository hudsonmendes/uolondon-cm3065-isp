const BROADCAST = 'broadcast'

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

    addEventListener(listener) {
        this.addEventListener(BROADCAST, listener);
    }

    addEventListener(type, listener) {
        if (!this.listeners[type])
            this.listeners[type] = [];
        if (type !== BROADCAST)
            this.listeners[type].push(listener);
        this.listeners[BROADCAST].push(listener);
        return this;
    }

    removeEventListener(listener) {
        this.removeEventListener(BROADCAST, listener);
    }

    removeEventListener(type, listener) {
        if (!this.listeners[type])
            return this;
        if (type !== BROADCAST)
            this.listeners[type].splice(this.listeners[type].indexOf(listener), 1);
        this.listeners[BROADCAST].splice(this.listeners[type].indexOf(listener), 1);
    }

    dispatchEvent(event) {
        if (!this.listeners[type.type])
            return;
        if (type !== BROADCAST)
            this.listeners[type.type].forEach(listener => listener(event));
        this.listeners[BROADCAST].forEach(listener => listener(event));
    }

    propagateEvent(event) {
        this.dispatchEvent(event);
    }
}
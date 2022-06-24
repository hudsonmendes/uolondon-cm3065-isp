const BROADCAST = 'broadcast'

class Drawable {
    constructor() {
        if (new.target === Drawable)
            throw new TypeError('Cannot construct abstract class');
        // binds
        this.getEventListenerFor = this.getEventListenerFor.bind(this);
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

    getEventListenerFor(type) {
        if (!this.listeners[type])
            this.listeners[type] = [];
        return this.listeners[type]
    }

    addEventListener(type, listener) {
        if (!listener) {
            listener = type;
            type = BROADCAST;
        }
        if (type && listener) {
            this.getEventListenerFor(BROADCAST).push(listener);
            if (type !== BROADCAST)
                this.getEventListenerFor(type).push(listener);
        }
        return this;
    }

    removeEventListener(type, listener) {
        if (!type) {
            listener = type;
            type = BROADCAST;
        }
        if (type && listener) {
            this.getEventListenerFor(BROADCAST).splice(this.listeners[type].indexOf(listener), 1);
            if (type !== BROADCAST)
                this.getEventListenerFor(type).splice(this.listeners[type].indexOf(listener), 1);
        }
    }

    dispatchEvent(event) {
        this.getEventListenerFor(BROADCAST).forEach(listener => listener(event));
        if (event.type !== BROADCAST)
            this.getEventListenerFor(event.type).forEach(listener => listener(event));
    }

    propagateEvent(event) {
        this.dispatchEvent(event);
    }
}
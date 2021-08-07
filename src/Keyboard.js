/*
import Keyboard from 'Keyboard.js';

const keyboard = new Keyboard();
*/



// keyboard.on('a').handlers;
// keyboard.on('a').status;
// keyboard.on('a')
// keyboard.on('a')
// keyboard.on('a').repeat(); // returns this for chaining
// keyboard.on('a').down() // returns this for chaining
// keyboard.on('a').up(); // Returns this for chaining
// keyboard.on(ctrl('a')).down();
// keyboard.on(alt('d')).up();

// keyboard.on() // Precisa ser uma função ou uma string
// keyboard.on().down() // Precisa ser uma função. 


class Handler {
    constructor() {

    };

    repeat() {};
    down() {};
    up() {};
};

class Keyboard {
    constructor() {
        this.repeat = new Map();
        this.down = new Map();
        this.up = new Map();

        document.addEventListener('keyup', event => {
            emit(event, this.up)
        });

        document.addEventListener('keydown', event => {
            if (event.repeat)
                emit(event, this.repeat);
                emit(event, this.down);
        }); 

        function emit() {

        };
    };

    on(f) {

        function filter(func) {
            if (typeof func == 'function')
                return func;

            if (typeof func == 'string')
                return event => event.key === func;

            throw new TypeError('The filter must be either a function or a string');
        };
    };

    static ctrl() {};
    static shift() {};
    static alt() {};
    static meta() {};
    static alphabet() {};
    static numbers() {};
};













function KeyboardEventEmitter() {
    const keydown = new Map();
    const keyup = new Map();

    document.addEventListener('keydown', event => emit(event, keydown.values()));
    document.addEventListener('keyup', event => emit(event, keyup.values()));

    function emit(event, filters) {
        for (const { filter, listeners } of filters)
            if (filter(event))

                for (const listener of listeners.keys())
                    listener(event);
    };

    function verify(key, filters) {

        // All filters must be functions.
        const filter = key instanceof Function? key : e => e.key == key

        if (!filters.has(key))
             filters.set(key, { filter, listeners: new Map() });
    };

    function on(key) {

        const down = listener => add(listener, keydown);
        const up = listener => add(listener, keyup);

        function add(listener, filters) {
            verify(key, filters);

            const { listeners } = filters.get(key)
            listeners.set(listener);
        };
    
        return {
            down,
            up,
        }
    };

    function remove(key) {

        const down = callback => pull(callback, keydown);
        const up = callback => pull(callback, keyup);
        const both = callback => (down(callback), up(callback));

        function pull(callback, filters) {
            verify(key, filters);

            const { callbacks } = filters.get(key);
            callbacks.delete(callback)
        };

        return {
            down,
            up,
            both,
        }
    };

    return { 
        on,
        remove
    }
};
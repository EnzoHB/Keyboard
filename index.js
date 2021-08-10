"use strict";

// --------------------- Data Structure ----------------------- //

// Each map holds a key that is either a string or a function.
// This key maps to an object that has "filter" and "listeners"
// See: "get"

const keyup = new Map();
const keydown = new Map();

// --------------------- Emitters ----------------------- //

document.addEventListener('keydown', event => emit(event, keydown.values()));
document.addEventListener('keyup', event => emit(event, keyup.values()));

// --------------------- "Emit" Function ----------------------- //

// When the standard keydown and keyup events are emitted, we iterate
// through our map testing if "filter" returns true. If so, 
// all listeners are executed.

function emit(event, handlers) {
    for (const { filter, listeners } of handlers)
        if (filter(event))

            for (const listener of listeners)
                listener(event);
};


// --------------------- "On" Function ----------------------- //

// This function is responsible for getting the key and the
// listener and ADDING them to the Data Structure of listeners. 

function on(key) {

    const down = listener => add(listener, keydown);
    const up = listener => add(listener, keyup);

    function add(listener, filters) {
        get(key, filters).listeners.
        add(listener);
        
        return { down, up };
    };  return { down, up };
};


// --------------------- "Remove" Function ----------------------- //

// This function is responsible for getting the key and the
// listener and REMOVING them from the Data Structure of listeners. 

function remove(key) {

    const down = listener => del(listener, keydown);
    const up = listener => del(listener, keyup);

    function del(listener, filters) {
        get(key, filters).listeners.delete(listener);

        return { down, up };
    };  return { down, up };
};


// --------------------- "Toggle" Function ----------------------- //

// This function wraps around "on" and "remove" and provide the 
// ability to enable and disable listeners.

function toggle(key) {

    const oHandler = on(key);
    const rHandler = remove(key);

    function down(listener) {
        return (
            oHandler.
            down(listener),
            controls(listener, 'down')
        );
    };

    function up(listener) {
        return (
            oHandler.
            up(listener),
            controls(listener, 'up')
        );
    };

    function controls(listener, n) {
        const disable = () => { rHandler[n](listener) };
        const enable = () => { oHandler[n](listener) };
    
        return { disable, enable };
    };
    
    return { down, up };
};


// --------------------- "Once" Function ----------------------- //

// This function wraps around "on" and "remove" and provide the 
// ability to use a listener one single time and then disable it.

function once(key) {

    const oHandler = on(key);
    const rHandler = remove(key);

    function down(listener) {
        oHandler.down(listener);
        oHandler.down(remove);

        function remove() {
            rHandler.down(listener);
            rHandler.down(remove);
        };

        return { down, up };
    };

    function up(listener) {
        oHandler.up(listener);
        oHndler.up(remove);

        function remove() {
            rHandler.up(listener);
            rHandler.up(remove);
        };

        return { down, up };
    };

    return { down, up };
};


// --------------------- "createFilter" Function ----------------------- //

// Keys can be either functions or strings, however filters must be functions.
// If the filter is a function, we return it. Otherwise, we create a function
// that tests if the event.key equals the key.

function createFilter(key) {
    if (typeof key == 'function')
        return key;

    if (typeof key == 'string')
        return event => event.key === key;

    throw new TypeError('The filter must be either a string or a function');
};


// --------------------- "get" Function ----------------------- //

// Get acts like a safe wrapper for Map.get(). You pass a key and
// a map (filters) and it checks if the key exists. If it doesn't,
// "get" creates a object and then returns it.    

function get(key, filters) {

    const filter = createFilter(key)
    const listeners = new Set();

    if (!filters.has(key))
        !filters.set(key, { filter, listeners });

    return filters.get(key);
};

// --------------------- "shortcut" Function ----------------------- //

// Gets a property name and a key. Creates a filter and compares it 
// with the property. Utility function used in "Modifiers"

function shortcut(name, key) {
    return event => event[name] && filter(key)(event);
};


// --------------------- "Alphabet" Filter ----------------------- //

// We get the Unicode code point for a key and, if between the range
// of lower case ( from 65 to 90 ) and upper case ( from 97 to 122 ) 
// letters, we return true;

function alphabet({ key }) {
    const code = key.codePointAt();

    if (
        key.length == 1 && (
            code >= 65 &&
            code <= 90 ||
            code >= 97 &&
            code <= 122
        )
    )
    return true;
    return false;
};


// --------------------- "Numbers" Filter ----------------------- //

// We get the Unicode code point for a key and, if between the range
// of numbers ( from 48 to 57 ), we return true;

function numbers({ key }) {
    const code = key.codePointAt();

    if (
        key.length == 1 && (
            code >= 48 &&
            code <= 57
        )
    )
    return true;
    return false;
};


// --------------------- "Sequence" Filter ----------------------- //

// Using a closure, we keep track of keys typed so far. If the tracker
// matches the desired, we return it.   

function sequence(string) {
    let tracker = '';

    return ( { key } ) => {
        key != string[tracker.length]?
        tracker = '' :
        tracker += key;
            
            if (string == tracker)
                return string;
    };
};


// --------------------- "Modifiers" Filters ----------------------- //

// Modifiers are alt, meta, ctrl and shift. Pressing them
// while pressing others keys "modifies" the input.

const alt = key => shortcut('altKey', key);
const meta = key => shortcut('metaKey', key);
const ctrl = key => shortcut('ctrlKey', key);
const shift = key => shortcut('shiftKey', key);


// --------------------- Other Filters ----------------------- //

const any = ({ key }) => true;
const space = ({ key }) => key == ' ';
const arrows = ({ key }) => key.startsWith('Arrow');


// --------------------- Wrapper ----------------------- //

// Creates a huge object that wraps around every public 
// function and filter for the final object.

export default {
    on,
    once,
    toggle,
    remove,
    alphabet,
    numbers,
    sequence,
    alt,
    meta,
    ctrl,
    shift,
    any,
    space,
    arrows
};

/* --------------------- End ----------------------- */
import createFilter from "../util/create.js";

const keydown = new Map();
const keyup = new Map();

// "remove" needs them 
export { keydown, keyup };

document.addEventListener('keydown', event => emit(event, keydown.values()));
document.addEventListener('keyup', event => emit(event, keyup.values()));

function emit(event, handlers) {
    for (const { filter, listeners } of handlers)
        if (filter(event))

            for (const listener of listeners)
                listener(event);
};

function on(key) {

    const down = listener => add(listener, keydown);
    const up = listener => add(listener, keyup);

    function add(listener, filters) {
        get(key, filters).listeners.
        add(listener);
        
        return { down, up };
    };  return { down, up };
};

// "remove" also needs it;
export 
function get(key, filters) {

    const filter = createFilter(key)
    const listeners = new Set();

    if (!filters.has(key))
        !filters.set(key, { filter, listeners });

    return filters.get(key);
};

export default {
    on
};
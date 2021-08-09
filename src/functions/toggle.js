import o from "./on.js";
import r  from "./remove.js";

const { on } = o;
const { remove } = r;

function toggle(key) {   
    const handler = on(key);

    const after = (name, listener) => ({
        disable() { remove(key)[name](listener) },
        enable() { on(key)[name](listener) }
    });

    const down = listener => (
        handler.down(listener),
        after('down', listener)
    );

    const up = listener => (
        handler.up(listener),
        after('up', listener)
    );
    
    return { down, up };
};

export default {
    toggle
};
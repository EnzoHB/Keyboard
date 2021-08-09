import filter from './create.js';

const alt = key => shortcut('altKey', key);
const meta = key => shortcut('metaKey', key);
const ctrl = key => shortcut('ctrlKey', key);
const shift = key => shortcut('shiftKey', key);

export default {
    alt,
    meta,
    ctrl,
    shift
};

function shortcut(name, key) {
    return event => event[name] && filter(key)(event);
};
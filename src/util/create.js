export default

function createFilter(key) {
    if (typeof key == 'function')
        return key;

    if (typeof key == 'string')
        return event => event.key === key;

    throw new TypeError('The filter must be either a string or a function');
};
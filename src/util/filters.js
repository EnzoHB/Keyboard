// Lower Case letters range from 65 to 90;
// Upper case letters range from 97 to 122;
function alphabet({ key }) {
    const code = key.charCodeAt();

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

// Numbers range from 48 to 57
function numbers({ key }) {
    const code = key.charCodeAt();

    if (
        key.length == 1 && (
            code >= 48 &&
            code <= 57
        )
    )
    return true;
    return false;
};

// Arrows always start with "Arrow";
function arrows({ key }) {
    return key.startsWith('Arrow');
};

const space = ({ key }) => key == ' ';
const any = () => true;

export default {
    alphabet,
    numbers,
    arrows,
    space,
    any
};
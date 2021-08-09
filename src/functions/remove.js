import { keydown, keyup } from "./on.js";
import { get } from "./on.js";

function remove(key) {

    const down = listener => del(listener, keydown);
    const up = listener => del(listener, keyup);

    function del(listener, filters) {
        get(key, filters).listeners.delete(listener);

        return { down, up };
    };  return { down, up };
};

export default {
    remove,
}
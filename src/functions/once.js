import o from "./on.js";
import r from './remove.js';
 
const { on } = o;

function once(key) {
    const handler = on(key);
    
    function down(listener) {
        handler.down(wrap);

        function wrap(event) {
            listener(event);

        };
    };
};
// Wrapper;

import filters from "./util/filters.js";
import modifiers from "./util/modifiers.js";
import remove from "./functions/remove.js";
import on from "./functions/on.js";
import toggle from "./functions/toggle.js";

const keyboard = Object.assign(on, remove, toggle, filters, modifiers);

export default keyboard;
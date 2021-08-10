# Keyboard JS
**A wrapper around the odd DOM Event Listeners syntax**

I wrote this simple wrapper that provides some useful funcionality for dealing with keyboard input in the browser with a more familiar and chained syntax using JavaScript. The code is written in ES6 and is also well self-commented. Feel free to make any improvements.

## Basic usage
It's pretty straight forward.
```
import keyboard from 'keyboard.js';

const { on, ctrl } = keyboard;
const save = ctrl('s');

on(save).
down(saveState).
down(saveUserData).
up(notify);

```

## One more thing
More usage examples are available in the Wiki Page. Also, if you found a bug, don't be shy and open an issue. I'll check as soon as possible. 

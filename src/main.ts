import { runLoop } from "./engine";
import { initialize as gameInit } from "./game";
import { KeyBindings } from "./input";
import { isCanvas, isCustomEvent } from "./util";

document.addEventListener('ef.start', (ev: Event) => {

    if (!isCustomEvent(ev)) {
        console.warn('ignoring malformed start event: ', ev);
        return;
    }

    const selectDisplay = (ev.detail.displaySelector);

    let canvas: HTMLCanvasElement;
    const display = document.querySelector(selectDisplay);
    if (!isCanvas(display)) {
        console.error(`unable to find canvas element (${selectDisplay})`);
        return;
    } else {
        canvas = display;
    }

    const bindings: KeyBindings = {
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'ArrowUp': 'throttle',
    };

    console.info('... initializing game');
    const { update, draw } = gameInit();

    console.info('... starting game loop');
    runLoop(canvas, bindings, update, draw);
});

console.info('waiting for game start event');

import { runLoop } from "./engine";
import { KeyBindings } from "./input";
import { mainMenu } from "./menu";
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
    const stage = mainMenu(bindings);

    console.info('... starting game loop');
    runLoop(canvas, bindings, stage);
});

console.info('waiting for game start event');

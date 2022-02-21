import { Stage } from "./engine";
import { initialize as gameInit } from "./game";
import { Controller, KeyBindings } from "./input";

function mainMenu(bindings: KeyBindings): Stage {

    const instructions = [
        'Welcome to Eschew Ferocity.',
        '',
    ];
    for (const [k, v] of Object.entries(bindings)) {
        instructions.push(`${v} : ${k}`.toUpperCase());
    }
    instructions.push('');
    instructions.push(`Press throttle to go!`.toUpperCase());

    return {
        update(_: number, input: Controller) {
            if (input.throttle) {
                console.info('... initializing game');
                return gameInit();
            }
            return null;
        },
        draw(canvas: HTMLCanvasElement) {
            const ctx = canvas.getContext('2d');
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            let line = 0;
            for (const i of instructions) {
                ctx.fillText(i, canvas.width / 2, canvas.height / 2 + line * 10);
                line += 1;
            }
            ctx.restore();
        },
    }
}

export { mainMenu }

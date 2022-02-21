import * as dbg from "./debug";
import { Controller, KeyBindings, makeController } from "./input";

const SECONDS = 1000;

type Stage = {
    update: (dt: number, input: Controller) => Stage,
    draw: (canvas: HTMLCanvasElement) => void,
}

function runLoop(
    canvas: HTMLCanvasElement,
    bindings: KeyBindings,
    { update, draw }: Stage,
): void {

    let t0: number;
    let t1: number;

    const input = makeController(bindings);

    function step(t: number): void {
        const dt = (t - t1) / SECONDS;
        t1 = t;

        dbg.inc('time', dt);
        dbg.inc('frames');

        for (const [k, v] of Object.entries(input)) {
            dbg.set(k, Number(v));
        }

        const timeU = dbg.timer('update');
        const stage = update(dt, input);
        timeU();

        if (stage) {
            update = stage.update;
            draw = stage.draw;
        }

        const timeD = dbg.timer('draw');
        draw(canvas);
        timeD();

        dbg.show(canvas);

        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame((t: number) => {
        t0 = t;
        t1 = t;
        console.info(`... entering game loop with t0=${t0}`);
        step(t);
    });
}

export {
    runLoop,
    Stage,
}

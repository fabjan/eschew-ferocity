import * as dbg from "./debug";

const SECONDS = 1000;

function runLoop(
    canvas: HTMLCanvasElement,
    update: (dt: number) => void,
    draw: (canvas: HTMLCanvasElement) => void,
): void {

    let t0: number;
    let t1: number;

    function step(t: number): void {
        const dt = (t - t1) / SECONDS;
        t1 = t;

        dbg.inc('time', dt);
        dbg.inc('frames');

        const timeU = dbg.timer('update');
        update(dt);
        timeU();

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
}

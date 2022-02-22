const DEBUG_SHOW = true;

const debugInfo: Record<string, number[]> = {};
const debugFrames = 120;

// this is probably definitely not very performant
function put(name: string, v: number): void {
    if (!debugInfo[name]) {
        debugInfo[name] = [];
    }
    debugInfo[name].push(v);
    debugInfo[name] = debugInfo[name].slice(-debugFrames);
}

function timer(name: string) {
    const t0 = performance.now();
    return () => (put(name, performance.now() - t0));
}

function set(name: string, n: number) {
    put(name, n);
}

function show(canvas: HTMLCanvasElement) {
    if (!DEBUG_SHOW) {
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'right';
    let lines = 1;
    for (const [k, vs] of Object.entries(debugInfo)) {
        lines++;
        const y = 10 * lines
        ctx.fillText(`${k}: ${vs[vs.length - 1] | 0}`, 80 - 10, y);
        let f = 0;
        for (const v of vs) {
            ctx.fillRect(80 + f * 2, y, 2, -1 - 2 * v);
            f++;
        }
    }
    ctx.restore();
}

export {
    timer,
    set,
    show,
}

const DEBUG_SHOW = true;

const debugInfo = {};

function timer(name: string) {
    const t0 = performance.now();
    return () => (debugInfo[name] = performance.now() - t0);
}

function inc(name: string, n = 1) {
    debugInfo[name] = (debugInfo[name] || 0) + n;
}

function set(name: string, n: number) {
    debugInfo[name] = n;
}

function show(canvas: HTMLCanvasElement) {
    if (!DEBUG_SHOW) {
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = 'yellow';
    let lines = 1;
    for (const [k, v] of Object.entries(debugInfo)) {
        lines++;
        ctx.fillText(`${k}: ${Number(v) | 0}`, 10, 10 * lines);
    }
    ctx.restore();
}

export {
    timer,
    inc,
    set,
    show,
}

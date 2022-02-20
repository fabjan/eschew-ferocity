import { drawShip } from "./sprites";

function initialize() {

    const ships = [{
        x: 0,
        y: 0,
        dx: 16,
        dy: 10,
        dir: 0,
        spin: 0.314,
    }];

    function update(dt: number): void {
        if (!dt) {
            return;
        }

        for (const s of ships) {
            s.x += (s.dx * dt);
            s.y += (s.dy * dt);
            s.dir += (s.spin * dt);
        }
    }

    function draw(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        ctx.save();

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const s of ships) {
            drawShip(ctx, s);
        }

        ctx.restore();
    }

    return {
        update,
        draw,
    };
}

export {
    initialize,
}

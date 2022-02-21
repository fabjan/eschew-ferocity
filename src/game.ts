import { Controller } from "./input";
import { drawShip } from "./sprites";

function initialize() {

    const ships = [{
        x: 0,
        y: 0,
        dx: 16,
        dy: 10,
        dir: 0,
    }];

    function update(dt: number, input: Controller): void {
        if (!dt) {
            return;
        }

        let spin;
        for (const s of ships) {

            if (input.throttle) {
                s.dy += Math.cos(s.dir);
                s.dx -= Math.sin(s.dir);
            }

            s.x += (s.dx * dt);
            s.y += (s.dy * dt);

            spin = 0;
            if (input.left) {
                spin = -3.14;
            } else if (input.right) {
                spin = 3.14;
            }
            s.dir += (spin * dt);
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

const sw = 20;
const sh = 30;

type Ship = { x: number, y: number, dir: number };

function drawShip(ctx: CanvasRenderingContext2D, s: Ship) {
    ctx.save();
    ctx.fillStyle = 'hotpink';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.dir)
    ctx.beginPath();
    ctx.lineTo(sw, 0);
    ctx.lineTo(sw / 2, sh);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

export {
    drawShip,
}

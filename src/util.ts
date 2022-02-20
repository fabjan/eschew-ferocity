export function isCanvas(x: object): x is HTMLCanvasElement {
    return x['tagName'] === 'CANVAS';
}

export function isCustomEvent(e: Event): e is CustomEvent {
    return !!e['detail'];
}

type Controller = {
    left: boolean,
    right: boolean,
    throttle: boolean,
}

type Action = keyof Controller;

type KeyBindings = Record<string, Action>;

function makeController(bindings: KeyBindings): Controller {

    const input: Controller = {
        left: false,
        right: false,
        throttle: false,
    }

    function handleKey(e: KeyboardEvent): boolean {
        const action = bindings[e.key];
        if (!action) {
            return false;
        }
        e.preventDefault();
        input[action] = e.type === 'keydown';
    }

    document.addEventListener('keydown', (e) => handleKey(e));
    document.addEventListener('keyup', (e) => handleKey(e));

    return input;
}

export { KeyBindings, Controller, makeController };

export class CanvasRender {
    constructor() {
        console.log("CanvasRender ctor");
    }

    init(canvas, gameState, width, height) {
        if (this._gameState && this._canvas) {
            console.log("Double call to CanvasRender.init!");
            return false;
        }
        console.log(`CanvasRender init x:${width}, y:${height}\n`, canvas);
        this._gameState = gameState;
        this._canvas = canvas;
        this._width = width;
        this._height = height;
        return true;
    }

    destroy() {
        // Release context here
    }

    resize(width, height) {
        console.log(`Resize: ${width}, ${height}`);
        this._width = width;
        this._height = height;
    }

    render() {
        if (!this._canvas) {
            console.error("Render started but has no canvas!!!");
            return;
        }
        console.log("render");
    }
}

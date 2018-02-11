const BLOCK_WIDTH = 32;
const BLOCK_HEIGHT = 32;

const QUART_CIRC = Math.PI / 2;

export class CanvasRender
{
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
        this._context = canvas.getContext('2d');
        this._width = width;
        this._height = height;
        this.render();
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
        const blocksY = this._gameState.geometry.length;
        const blocksX = this._gameState.geometry[0].length;

        this._context.clearRect(0, 0, this._width, this._height);
        this._context.fillStyle = 'rgb(50, 255, 30)';
        for (let y = 0; y < blocksY; ++y) {
            for (let x = 0; x < blocksX; ++x) {
                if (this._gameState.geometry[y][x] === 0) {
                    this._context.fillRect(x * BLOCK_WIDTH, y * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
                }
            }
        }

        const me = this._gameState.playerName;
        const radius = (BLOCK_WIDTH + BLOCK_HEIGHT) / 4;
        this._gameState.players.forEach((data, player) => {
            const x = (data.pos.x + 0.5) * BLOCK_WIDTH;
            const y = (data.pos.y + 0.5) * BLOCK_HEIGHT;
            const color = `rgb(${data.color.r},${data.color.g},${data.color.b})`;

            const DIR_CIRC = data.dir * QUART_CIRC;
            this._context.fillStyle = color;
            this._context.beginPath();
            this._context.arc(x, y, radius, -QUART_CIRC + DIR_CIRC, QUART_CIRC + DIR_CIRC, true);
            this._context.fill();

            if (player === me) {
                this._context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                this._context.beginPath();
                this._context.arc(x, y, radius / 3, 0, 2 * Math.PI, true);
                this._context.fill();
            }
            //console.log(`Draw arc for ${player} at `, pos);

        });

        requestAnimationFrame(() => this.render());
        //console.log("render");
    }
}


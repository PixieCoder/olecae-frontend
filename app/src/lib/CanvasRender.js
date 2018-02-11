const SQRT3 = Math.sqrt(3);

const TRI_SIDE = 10;
const TRI_HALF_SIDE = TRI_SIDE / 2;
const TRI_HEIGHT = SQRT3 * TRI_HALF_SIDE;
const RADIUS = TRI_HALF_SIDE;

const SIXTH_CIRC = Math.PI / 3;
const QUART_CIRC = Math.PI / 2;
const FULL_CIRC = Math.PI * 2;

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
        this._map_width = this._gameState.geometry[0].length;
        this._map_height = this._gameState.geometry.length;
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

    coord({x: x, y: y}) {
        return {
            x: TRI_HALF_SIDE + TRI_HALF_SIDE * x + TRI_HALF_SIDE * y,
            y: TRI_HALF_SIDE + (this._map_width - x) * TRI_HEIGHT + TRI_HEIGHT * y,
        };
    }

    render() {
        if (!this._canvas) {
            console.error("Render started but has no canvas!!!");
            return;
        }

        this._context.clearRect(0, 0, this._width, this._height);

        // Render the map
        this._context.fillStyle = 'rgb(50, 255, 30)';
        for (let y = 0; y < this._map_height; ++y) {
            for (let x = 0; x < this._map_width; ++x) {
                if (this._gameState.geometry[y][x] > 0) {
                    const coord = this.coord({x, y});
                    this._context.beginPath();
                    this._context.arc(coord.x, coord.y, RADIUS + 2, 0, FULL_CIRC, true);
                    this._context.fill();
                }
            }
        }

        // Render the players
        const me = this._gameState.playerName;
        this._gameState.players.forEach((data, player) => {
            const coord = this.coord(data.pos);
            const color = `rgb(${data.color.r},${data.color.g},${data.color.b})`;

            const DIR_CIRC = - SIXTH_CIRC + data.dir * SIXTH_CIRC;
            this._context.fillStyle = color;
            this._context.beginPath();
            this._context.arc(coord.x, coord.y, RADIUS, -QUART_CIRC + DIR_CIRC, QUART_CIRC + DIR_CIRC, true);
            this._context.fill();

            if (player === me) {
                this._context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                this._context.beginPath();
                this._context.arc(coord.x, coord.y, RADIUS / 3, 0, FULL_CIRC, true);
                this._context.fill();
            }

        });

        requestAnimationFrame(() => this.render());
    }
}


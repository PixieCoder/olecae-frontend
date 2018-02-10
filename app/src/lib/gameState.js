const DIRECTIONS = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1},
];


export class GameState
{
    constructor() {
        this._players = new Map();
        this._geometry = [['0', '1'], ['1', '0']];
        this._dir = 0;
    }

    // Payload handlers
    handleWELCOME = function (payload) {
        // TODO: Check api-version on the payload
        this._geometry = payload.geom; // TODO: Make sure the geometry is good
        this._players.clear();
        this._playerName = payload.name;
        this._players.set(this._playerName, payload.pos);

        Object.keys(payload.currentPlayers)
              .forEach(key => {
                  this._players.set(key, payload.currentPlayers[key]);
              });
    };

    handleMOVE = function (payload) {
        if (payload.status) return payload.status;

        this._players.set(payload.name, payload.pos);
        const subject = payload.name === this._playerName ? 'You' : payload.name;
        return `${subject} moved to [${payload.pos.x}, ${payload.pos.y}]`;
    };

    handlePLAYERCONNECT = function (payload) {
        this._players.set(payload.name, payload.pos);
        return `New player "${payload.name}" connected`;
    };

    handlePLAYERDISCONNECT = function (payload) {
        this._players.delete(payload.name);
        return `Player "${payload.name}" disconnected`;
    };

    handleSocketEvent(payload) {
        const handler = `handle${payload.type.toUpperCase()}`;
        if (typeof this[handler] === 'function') {
            try {
                const msg = this[handler](payload);
                if (msg) {
                    return {type: 'msg', text: msg};
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            console.log("Unhandled payload:\n", payload);
        }
        return {type: 'msg', text: payload.type};
    }


    // Local handlers
    move() {
        const oldPos = this._players.get(this._playerName);
        const delta = DIRECTIONS[this._dir];
        const newPos = {x: delta.x + oldPos.x, y: delta.y + oldPos.y};
        // TODO: Check if this is even possible
        console.log(newPos);
        return newPos;
    }

    turn(arg) {
        if (isNaN(parseInt(arg))) {
            throw "Bad argument to GameState.turn!";
        }

        this._dir += arg;
        while (this._dir >= DIRECTIONS.length) {
            this._dir -= (DIRECTIONS.length);
        }
        while (this._dir < 0) {
            this._dir += (DIRECTIONS.length);
        }
    }

    // Getters

    get geometry() {
        return this._geometry;
    }

    get players() {
        return this._players;
    }

    get playerName() {
        return this._playerName;
    }
}

const DIRECTIONS = [
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: -1, y: -1},
    {x: 0, y: -1},
];


export class GameState
{
    constructor() {
        this._players = new Map();
        this._geometry = [['0', '1'], ['1', '0']];
    }

    // Payload handlers
    handleWELCOME = function (payload) {
        // TODO: Check api-version on the payload
        console.log("handleWELCOME\n", payload);
        const data = payload.data;
        this._geometry = payload.geom; // TODO: Make sure the geometry is good
        this._players.clear();
        this._playerName = payload.name;
        this._players.set(this._playerName, payload.data);

        Object.keys(payload.currentPlayers)
              .forEach(key => {
                  this._players.set(key, payload.currentPlayers[key]);
              });
    };

    handleTURN = function (payload) {
        this._players.get(payload.name).dir = payload.data.dir;
    };

    handleMOVE = function (payload) {
        if (payload.status) return payload.status;

        this._players.get(payload.name).pos = payload.data.pos;
    };

    handlePLAYERCONNECT = function (payload) {
        this._players.set(payload.name, payload.data);
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
        const oldPos = this.player.pos;
        const delta = DIRECTIONS[this.player.dir];
        const newPos = {x: delta.x + oldPos.x, y: delta.y + oldPos.y};
        // TODO: Check if this is even possible
        console.log(newPos);
        return newPos;
    }

    turn(arg) {
        if (isNaN(parseInt(arg))) {
            throw "Bad argument to GameState.turn!";
        }

        let newDir = this.player.dir + arg;

        while (newDir >= DIRECTIONS.length) {
            newDir -= (DIRECTIONS.length);
        }
        while (newDir < 0) {
            newDir += (DIRECTIONS.length);
        }
        return newDir;
    }

    // Getters
    get player() {
        return this._players.get(this._playerName);
    }

    get geometry() {
        return this._geometry;
    }

    get players() {
        return this._players;
    }

    get playerName() {
        return this._playerName;
    }

    get dir() {
        return this.player.dir;
    }
}

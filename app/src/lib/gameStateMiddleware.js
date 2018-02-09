import {
    socketSend,
    socketReceive,
    gameTurn,
    gameMove,
} from '../actions';

const socketReceiveType = socketReceive.toString();
const gameTurnType = gameTurn.toString();
const gameMoveType = gameMove.toString();

class GameState
{
    constructor() {
        this._players = new Map();
        this._geometry = [['0', '1'], ['1', '0']];
        this._dir = {x: 1, y: 0};
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
        const pos = {x: this._dir.x + oldPos.x, y: this._dir.y + oldPos.y};
        return socketSend({type: 'move', pos});
    }

    turn(arg) {
        if (arg === 1) {
            if (this._dir.y === 0) {
                if (this._dir.x === 1) {
                    this._dir = {x: 0, y: 1};
                }
                else {
                    this._dir = {x: 0, y: -1};
                }
            }
            else {
                if (this._dir.y === 1) {
                    this._dir = {x: -1, y: 0};
                }
                else {
                    this._dir = {x: 1, y: 0};
                }
            }
        }
        else {
            if (this._dir.y === 0) {
                if (this._dir.x === 1) {
                    this._dir = {x: 0, y: -1};
                }
                else {
                    this._dir = {x: 0, y: 1};
                }
            }
            else {
                if (this._dir.y === 1) {
                    this._dir = {x: 1, y: 0};
                }
                else {
                    this._dir = {x: -1, y: 0};
                }
            }
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

const createGameStateMiddleware = function () {
    const gameState = new GameState();

    return function gameStateMiddleware(store) {
        return function gsmNext(next) {
            return function gsmAction(action) {
                if (!action) {
                    console.log("Weird, empty action!");
                    return;
                }
                switch (action.type) {
                    case socketReceiveType:
                        if (action.payload.type === 'msg') {
                            next(action);
                        }
                        else {
                            next({
                                     ...action,
                                     payload: gameState.handleSocketEvent(action.payload),
                                 });
                        }
                        break;
                    case gameMoveType:
                        store.dispatch(gameState.move());
                        break;
                    case gameTurnType:
                        gameState.turn(action.payload);
                        break;
                    default:
                        next(action);
                }
            };
        };
    };
};

export default createGameStateMiddleware;

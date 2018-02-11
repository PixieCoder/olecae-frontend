import {
    socketSend,
    socketReceive,
    gameTurn,
    gameMove,
} from '../actions';

const socketReceiveType = socketReceive.toString();
const gameTurnType = gameTurn.toString();
const gameMoveType = gameMove.toString();

const createGameStateMiddleware = function (gameState) {

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
                        else if (['move', 'turn'].find(a => a === action.payload.type)) {
                            gameState.handleSocketEvent(action.payload);
                        }
                        else {
                            next({
                                     ...action,
                                     payload: gameState.handleSocketEvent(action.payload),
                                 });
                        }
                        break;
                    case gameMoveType:
                        store.dispatch(socketSend({type: 'move', pos: gameState.move()}));
                        break;
                    case gameTurnType:
                        store.dispatch(socketSend({type: 'turn', dir: gameState.turn(action.payload)}));
                        break;
                    default:
                        next(action);
                }
            };
        };
    };
};

export default createGameStateMiddleware;

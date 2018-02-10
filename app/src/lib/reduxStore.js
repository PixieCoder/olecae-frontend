import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSocketMiddleware from './socketMiddleware';
import createGameStateMiddleware from './gameStateMiddleware';
import reducers from '../reducers';

let reduxStore = null;

const initRedux = function (gameState, initialState = {}) {
    if (!reduxStore) {
        const socketMiddleware = createSocketMiddleware('ws://olecae.docker:2345');
        const gameStateMiddleware = createGameStateMiddleware(gameState);
        reduxStore = {
            ...createStore(
                reducers,
                initialState,
                composeWithDevTools(
                    applyMiddleware(gameStateMiddleware, socketMiddleware),
                ),
            ),
        };
    }

    return reduxStore;
};

export default initRedux;

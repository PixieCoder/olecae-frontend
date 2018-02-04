import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSocketMiddleware from './socketMiddleware';
import reducers from '../reducers';

let reduxStore = null;

const initRedux = function (initialState = {}) {
    if (!reduxStore) {
        const socketMiddleware = createSocketMiddleware('ws://olecae.docker:2345');
        reduxStore = {
            ...createStore(
                reducers,
                initialState,
                composeWithDevTools(
                    applyMiddleware(socketMiddleware),
                ),
            ),
        };
    }

    return reduxStore;
};

export default initRedux;

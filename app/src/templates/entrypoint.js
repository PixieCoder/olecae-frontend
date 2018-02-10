import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import initRedux from '../lib/reduxStore';
import GameView from '../layouts/GameView';
import { GameState } from '../lib/gameState';

(function () {
    const gameState = new GameState();
    const store = initRedux(gameState, {});
    const appElement = document.getElementById('react-entry');

    if (!appElement) return;

    ReactDOM.render(
        <Provider store={store}>
            <GameView gameState={gameState}/>
        </Provider>,
        appElement,
    );
})();

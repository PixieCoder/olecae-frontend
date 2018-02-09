import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import initRedux from '../lib/reduxStore';
import GameView from '../layouts/GameView';

(function () {
    const store = initRedux({});
    const appElement = document.getElementById('react-entry');

    if (!appElement) return;

    ReactDOM.render(
        <Provider store={store}>
            <GameView/>
        </Provider>,
        appElement,
    );
})();

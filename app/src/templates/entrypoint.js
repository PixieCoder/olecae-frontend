import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import initRedux from '../lib/reduxStore';
import GameView from '../layouts/GameView';

(function () {
    console.log("Entered JS");
    /*

     function setupSendHandle() {
     const conn = new WebSocket('ws://olecae.docker:2345');
     conn.onopen = function (e) {
     console.log("Connection established");
     };
     conn.onmessage = function (e) {
     console.log(e.data);
     };

     return function (e) {
     console.log("Transmitting...");
     conn.send('Button pressed');
     }
     }

     window.sendHandle = setupSendHandle();
     */
    const store = initRedux({});
    const appElement = document.getElementById('react-entry');

    if (!appElement) return;


    ReactDOM.render(
        <Provider store={store}>
            <GameView/>
        </Provider>,
        appElement,
    )
    ;
})();

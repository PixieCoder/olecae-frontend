import { combineReducers } from 'redux';

import socket from './socket';
import game from './game';

export default combineReducers(
    {
        socket,
        game,
    });

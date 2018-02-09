import { handleActions } from 'redux-actions';

import {
    gameMove,
    gameTurn,
} from '../actions';

const initialState = {
    pos: null,
    dir: null,
};

function gameMoveReducer(state, action) {
    console.log("gameMoveReducer\n", action);
    return {
        ...state,
        pos: action.payload.pos,
    };
}

function gameTurnReducer(state, action) {
    console.log("gameTurnReducer\n", action);
    return {
        ...state,
        dir: action.payload.dir,
    };
}


export default handleActions(
    {
        [gameMove]: gameMoveReducer,
        [gameTurn]: gameTurnReducer,
    }, initialState);

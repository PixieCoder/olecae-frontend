import { handleActions } from 'redux-actions';

import {
    socketConnect,
    socketDisconnect,
    socketReceive,
    socketSend,
    socketPopReceived,
} from '../actions';

const initialState = {
    connected   : false,
    lastSent    : null,
    receiveQueue: [],
};

function socketConnectReducer(state, action) {
    console.log("socketConnectReducer\n", action);
    return {
        ...state,
        connected: true,
    };
}

function socketDisconnectReducer(state, action) {
    console.log("socketDisconnectReducer\n", action);
    return {
        ...state,
        connected: false,
    };
}

function socketReceiveReducer(state, action) {
    console.log("socketReceiveReducer\n", action);
    const newState = {
        ...state,
        receiveQueue: [action.payload, ...state.receiveQueue],
    };
    console.log(newState);
    return newState;
}

function socketSendReducer(state, action) {
    console.log("socketSendReducer\n", action);
    return {
        ...state,
        lastSent: action.payload,
    };
}

function socketPopReceivedReducer(state, action) {
    console.log("socketPopReceivedReducer\n", action);
    return {
        ...state,
        receiveQueue: state.receiveQueue.slice(0, -1),
    };
}

export default handleActions(
    {
        [socketConnect]    : socketConnectReducer,
        [socketDisconnect] : socketDisconnectReducer,
        [socketReceive]    : socketReceiveReducer,
        [socketSend]       : socketSendReducer,
        [socketPopReceived]: socketPopReceivedReducer,
    }, initialState);

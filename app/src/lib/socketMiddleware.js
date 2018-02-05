import {
    socketConnect,
    socketDisconnect,
    socketReceive,
    socketSend,
} from '../actions';

class Socket
{
    constructor(socketUrl, store) {
        this.store = store;
        this.conn = new WebSocket(socketUrl);
        this.conn.onopen = e => this.onConnect(e);
        this.conn.onmessage = e => this.onReceive(e);
        this.conn.onclose = e => this.onDisconnect(e);
    }

    onConnect(e) {
        this.store.dispatch(socketConnect());
    }

    onDisconnect(e) {
        this.store.dispatch(socketDisconnect());
    }

    onReceive(e) {
        this.store.dispatch(socketReceive(e.data));
    }

    send(e) {
        this.conn.send(e);
    }
}

const createSocketMiddleware = function (socketUrl) {

    const socketMiddleware = store => {

        const sock = new Socket(socketUrl, store);

        return next => action => {
            console.log("action\n", action);
            if (action.type === socketSend.toString()) {
                sock.send(action.payload);
            }
            else {
                next(action);
            }
        };
    };

    return socketMiddleware;
};

export default createSocketMiddleware;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import {
    socketSend,
    socketPopReceived,
    gameMove,
    gameTurn,
} from '../../actions';

const KEY_MAP = {
    LEFT : 37,
    UP   : 38,
    RIGHT: 39,
    ENTER: 13,
};

import UIHud from './UIHud.jsx';

function mapStateToProps(state) {

    return {
        receiveQueue: state.socket.receiveQueue || [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                socketSend,
                socketPopReceived,
                gameMove,
                gameTurn,
            }, dispatch),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('chatInput', 'setChatInput', ''),
    withHandlers(
        {
            handleRemove   : props => e => {
                props.actions.socketPopReceived();
            },
            handleChatInput: props => event => {
                props.setChatInput(event.target.value);
            },
            handleChatSend : props => event => {
                props.actions.socketSend({type: 'msg', text: props.chatInput});
                props.setChatInput('');
            },
        }),
    withHandlers(
        {
            handleKeyPress: props => event => {
                switch (event.keyCode) {
                    case KEY_MAP.ENTER:
                        props.handleChatSend();
                        break;
                    case KEY_MAP.UP:
                        props.actions.gameMove();
                        break;
                    case KEY_MAP.LEFT:
                        props.actions.gameTurn(-1);
                        break;
                    case KEY_MAP.RIGHT:
                        props.actions.gameTurn(1);
                        break;
                }
            },
        }
    ),
    lifecycle(
        {
            componentWillMount() {
                //console.log("UIHud componentWillMount");
                window.addEventListener('keydown', this.props.handleKeyPress);
            },
            componentWillUpdate() {
                //console.log("UIHud componentWillUpdate");
            },
            componentWillUnmount() {
                window.addEventListener('keydown', this.props.handleKeyPress);
            },
        }),
)(UIHud);

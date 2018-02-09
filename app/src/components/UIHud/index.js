import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import {
    socketSend,
    socketPopReceived,
} from '../../actions';

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
            }, dispatch),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('chatInput', 'setChatInput', ''),
    withHandlers(
        {
            handleRemove: props => e => {
                props.actions.socketPopReceived();
            },
            handleChatInput : props => event => {
                props.setChatInput(event.target.value);
            },
            handleChatSend  : props => event => {
                props.actions.socketSend({type: 'msg', text: props.chatInput});
                props.setChatInput('');
            },

        }),
    lifecycle(
        {
            componentWillMount() {
                //console.log("UIHud componentWillMount");
            },
            componentWillUpdate() {
                //console.log("UIHud componentWillUpdate");
            },
        }),
)(UIHud);

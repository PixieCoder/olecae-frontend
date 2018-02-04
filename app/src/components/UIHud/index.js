import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, lifecycle } from 'recompose';

import {
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
                socketPopReceived,
            }, dispatch),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers(
        {
            handleRemove: props => e => {
                console.log("handleRemove");
                props.actions.socketPopReceived();
            }
        }),
    lifecycle(
        {
            componentWillMount() {
                console.log("UIHud componentWillMount");
            },
            componentWillUpdate() {
                console.log("UIHud componentWillUpdate");
            },
        }),
)(UIHud);

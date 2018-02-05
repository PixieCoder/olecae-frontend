import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, lifecycle } from 'recompose';

import {
    socketSend
} from '../../actions';

import UIButton from './UIButton.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                socketSend,
            }, dispatch),
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    withHandlers(
        {
            handleClick: props => e => {
                props.actions.socketSend(JSON.stringify({type: 'msg', 'text': 'Button pressed!'}));
            },
        }),
    lifecycle(
        {
            componentWillMount() {
                console.log("UIButton componentWillMount");
            },
            componentWillUpdate() {
                console.log("UIButton componentWillUpdate");
            },
        }),
)(UIButton);

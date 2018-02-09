import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, lifecycle } from 'recompose';

import {
    socketSend,
    gameMove,
    gameTurn,
} from '../../actions';

import UIButton from './UIButton.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                socketSend,
                gameMove,
                gameTurn,
            }, dispatch),
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    withHandlers(
        {
            handleClick: props => event => {
                switch (event.target.value) {
                    case 'move':
                        props.actions.gameMove();
                        break;
                    case 'left':
                        props.actions.gameTurn(-1);
                        break;
                    case 'right':
                        props.actions.gameTurn(1);
                        break;
                    default:
                        console.error("Undefined button\n", event);
                }
            },
        }),
    lifecycle(
        {
            componentWillMount() {
                //console.log("UIButton componentWillMount");
            },
            componentWillUpdate() {
                //console.log("UIButton componentWillUpdate");
            },
        }),
)(UIButton);

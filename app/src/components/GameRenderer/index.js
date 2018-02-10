import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';

import GameRenderer from './GameRenderer.jsx';

export default compose(
    lifecycle(
        {
            componentWillMount() {
                console.log("GameRenderer will mount");
            },
            componentWillUpdate() {
                console.log("GameRenderer will update\n", this.props);
            }
        }
    )
)(GameRenderer);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

import GameCanvas from './GameCanvas.jsx';
import { CanvasRender } from '../../lib/CanvasRender';

function mapStateToProps(state) {
    return {
        receiveQueue: state.socket.receiveQueue || [],
    };
}

export default compose(
    connect(mapStateToProps),
    withState('width', 'setWidth', 0),
    withState('height', 'setHeight', 0),
    withState('aspectRatio', 'setAspectRatio', 1),
    withState('canvasRender', 'setCanvasRender', null),
    withState('canvasRef', 'setCanvasRef', null),
    withState('canvasDidInit', 'setCanvasDidInit', false),
    withHandlers(
        {
            handleResize   : props => event => {
                props.setWidth(window.innerWidth);
                props.setHeight(window.innerHeight);
                props.setAspectRatio(window.devicePixelRatio || 1);
                props.canvasRender.resize(window.innerWidth, window.innerHeight);
            },
            handleCanvasRef: props => event => {
                console.log("Canvas ref:", event, "\n", props);
                props.setCanvasRef(event);
            },
        }
    ),
    lifecycle(
        {
            componentWillMount() {
                this.props.setWidth(window.innerWidth);
                this.props.setHeight(window.innerHeight);
                this.props.setAspectRatio(window.devicePixelRatio || 1);
                this.props.setCanvasRender(new CanvasRender());

            },
            componentWillUpdate() {
                console.log("GameCanvas will update\n", this.props);
                if (!this.props.canvasDidInit
                    && this.props.canvasRef
                    && this.props.canvasRender
                    && this.props.canvasRender.init(this.props.canvasRef,
                                                    this.props.gameState,
                                                    this.props.width,
                                                    this.props.height)) {
                    window.addEventListener('resize', this.props.handleResize);
                    this.props.setCanvasDidInit(true);
                }
            },
            componentWillUnmount() {
                window.removeEventListener('resize', this.props.handleResize);
                this.props.canvasRender.destroy();
            }
        }
    ),
)(GameCanvas);

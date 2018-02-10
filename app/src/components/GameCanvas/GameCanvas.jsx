import React from 'react';

const GameCanvas = ({width, height, aspectRatio, handleCanvasRef, ...props}) => (
    <canvas ref={handleCanvasRef}
            style={{width: '100%', height: '100%', padding: 0, margin: 0, backgroundColor: 'blue'}}
            width={width * aspectRatio}
            height={height * aspectRatio}/>
);

export default GameCanvas;

import React from 'react';

import UIHud from '../../components/UIHud';
import GameRenderer from '../../components/GameCanvas';

const GameView = ({gameState, ...props}) => (
    <div>
        <GameRenderer gameState={gameState}/>
        <UIHud/>
    </div>
);

export default GameView;

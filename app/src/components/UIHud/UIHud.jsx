import React from 'react';

import UIButton from '../UIButton';

const UIHud = ({receiveQueue, handleRemove}) =>
    <div style={{
        position    : 'fixed',
        height      : 'auto',
        maxHeight   : '20%',
        bottom      : 0,
        left        : '25%',
        width       : '50%',
        padding     : '20px',
        borderRadius: '20px',
        borderWidth : '1px',
        borderColor : 'grey',
        borderStyle : 'solid',
        overflowY   : 'scroll',
    }}>
        {
            receiveQueue.length &&
            <ul>
                {
                    receiveQueue.map(
                        (msg, i) =>
                            <li key={i}>{msg}</li>
                    )
                }
            </ul> || null
        }
        <UIButton/>
        <button onClick={handleRemove}>Remove one</button>
    </div>;

export default UIHud;

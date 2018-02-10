import React from 'react';

import UIButton from '../UIButton';

const UIHud = ({receiveQueue, handleRemove, handleChatSend, handleChatInput, chatInput, setChatInput}) => (
    <div style={{
        position       : 'fixed',
        height         : '300px',
        maxHeight      : '20%',
        bottom         : 0,
        left           : '25%',
        width          : '50%',
        padding        : '20px',
        borderRadius   : '20px',
        borderWidth    : '1px',
        borderColor    : 'grey',
        borderStyle    : 'solid',
        display        : 'flex',
        backgroundColor: 'rgba(128,128,128,0.5)',
    }}>
        <div className="chat-view"
             style={{
                 height: '100%',
                 width : 'calc(100% - 140px)',
             }}
        >
            {
                receiveQueue.length &&
                <ul style={{
                    height   : 'calc(100% - 40px)',
                    overflowY: 'scroll',
                    margin   : 0,
                    padding  : 0,
                    listStyle: 'none',
                }}>
                    {
                        receiveQueue.map(
                            (msg, i) =>
                                <li key={i}>{msg.from || "Server"}: {msg.text}</li>
                        )
                    }
                </ul> || null
            }
            <div
                style={{height: '25px'}}
            >
                <input type="text" onChange={handleChatInput} value={chatInput}/>
                <button type="button" onClick={handleChatSend}>Send</button>
                <button type="button" onClick={handleRemove}>Remove one</button>
            </div>
        </div>
        <div className="nav-pad"
             style={{
                 height: '100%',
                 width : '150px',
             }}
        >
            <UIButton value='left' label="Left" style={{maxWidth: '30%'}}/>
            <UIButton value='move' label="Move" style={{maxWidth: '30%'}}/>
            <UIButton value='right' label="Right" style={{maxWidth: '30%'}}/>
        </div>
    </div>
);


export default UIHud;

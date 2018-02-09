import React from 'react';

const UIButton = ({handleClick, value, label}) =>
    <button onClick={handleClick} value={value}>{label}</button>
;

export default UIButton;

import React from 'react';
import style from './BlueButton.module.css';

const BlueButton:React.FC = (props) => {
    return <button className={style.button}>{props.children}</button>
}
export default BlueButton;
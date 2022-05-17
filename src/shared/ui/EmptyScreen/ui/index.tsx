import React from 'react';
import style from './index.module.css';
import { ReactComponent as NoDataImage } from "../assets/bgNoData.svg";

interface IEmptyScreen {
    text: string;
}

export const EmptyScreen:React.FC<IEmptyScreen> = (props) => {
    return <div className={style.container}>
        <NoDataImage />
        <p>{props.text}</p>
    </div>
}

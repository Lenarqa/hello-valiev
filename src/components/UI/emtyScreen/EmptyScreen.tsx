import React from 'react';
import style from './EmptyScreen.module.css';
import { ReactComponent as NoDataImage } from "../../../assets/img/bgNoData.svg";

interface IEmptyScreen {
    text: string;
}

const EmptyScreen:React.FC<IEmptyScreen> = (props) => {
    return <div className={style.container}>
        <NoDataImage />
        <p>{props.text}</p>
    </div>
}
export default EmptyScreen;
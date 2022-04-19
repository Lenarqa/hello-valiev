import React from 'react';
import style from './EmptyScreen.module.css';
import { ReactComponent as NoDataImage } from "../../../assets/img/bgNoData.svg";

const EmptyScreen:React.FC = () => {
    return <div className={style.container}>
        <NoDataImage />
        <p>Здесь еще нет данных...</p>
    </div>
}
export default EmptyScreen;
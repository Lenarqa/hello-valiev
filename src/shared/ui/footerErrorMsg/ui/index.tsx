import React from 'react';
import style from "./index.module.css";

interface IFooterErrorMsg {
    text: string;
}

export const FooterErrorMsg:React.FC<IFooterErrorMsg> = (props) => {
    return <div className={style.footerErrorMsg}>
        {props.text}
    </div>
}
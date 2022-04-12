import React from 'react';
import style from "./FooterErrorMsg.module.css";

interface IFooterErrorMsg {
    text: string;
}

const FooterErrorMsg:React.FC<IFooterErrorMsg> = (props) => {
    return <div className={style.footerErrorMsg}>
        {props.text}
    </div>
}
export default FooterErrorMsg;
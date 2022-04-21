import React from "react";
import style from "./TextArea.module.css";

interface ITextArea {
    placeholder: string;
    onChangeHandler: (e:any)=>void;//не смог найти тип eventa
    value: string;
    dataIsError?: boolean;
    msgLenght: number;
    maxLenght: number
}

const TextArea: React.FC<ITextArea> = (props) => {
  return (
    <div className={style.textAreaWrapper}>
      <textarea
        className={style.textarea}
        placeholder={props.placeholder}
        onChange={props.onChangeHandler}
        value={props.value}
        data-is-error={props.dataIsError}
      />
      <div className={style.counter}>{props.msgLenght}/{props.maxLenght}</div>
    </div>
  );
};
export default TextArea;

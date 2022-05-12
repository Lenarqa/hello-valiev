import React from "react";
import style from "./NewInput.module.css";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import MsgWindow from "../myMsgWindow/MsgWindow";
import { useForm } from "react-hook-form";
import { UseFormRegister, Path } from 'react-hook-form';

export type FormInputProps<T> = {
  name: Path<T>;
  register?: UseFormRegister<T>;
}

interface IInput {
  id?: string;
  type?: string;
  labelTitle?: string;
  placeholder?: string;
  isError?: boolean;
  inputType?: string;
  register: any;
  error?:string | undefined;
}

const NewInput: React.FC<IInput> = (props) => {
//   const { register } = useForm();
    const myRef = React.createRef();

  return (
    <div
      className={style.formItem}
      data-type={props.type}
      data-input-type={props.inputType}
    >
      <label htmlFor={props.id}>{props.labelTitle}</label>
      <div className={style.inputWrapper}>
        <input
          type={props.inputType}
          id={props.id}
          placeholder={props.placeholder}
          {...props.register}
        />
        <div className={style.icons}>
          {props.error && <InfoIcon className={style.icon} />}
          <MsgWindow style={style.hoverMsg}>{props.error}</MsgWindow>
        </div>
      </div>
    </div>
  );
};
export default NewInput;

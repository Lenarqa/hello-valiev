import { log } from "console";
import React, { useState, useEffect } from "react";
import { IOption } from "../../../shared/models/models";
import style from "./Select.module.css";

interface ISelect {
  type?: string;
  selected: IOption;
  setSelected: (value: IOption) => void;
  options: IOption[];
  onChange: (option:IOption) => void;
  closeGoodWindow?: (value: boolean) => void;
  closeBadWindow?: (value: boolean) => void;
}

const Select: React.FC<ISelect> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const setActiveHandler = (): void => {
    setIsActive((prev) => !prev);
  };

  const setSelectedHandler = (option: IOption): void => {
    props.onChange(option);
    setIsActive(false);
    if(props.closeBadWindow !== undefined && props.closeGoodWindow !== undefined) {
      props.closeBadWindow(false);
      props.closeGoodWindow(false);
    }
  };

  return (
    <div className={style.select} data-type={props.type}>
      <div className={style.selectBtn} onClick={setActiveHandler}>
        {props.selected.value}
      </div>
      {isActive && (
        <div className={style.selectContent}>
          {props.options.map((option, key) => (
            <div
              key={key}
              className={style.seletcItem}
              onClick={setSelectedHandler.bind(this, option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Select;

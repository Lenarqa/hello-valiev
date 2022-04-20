import { log } from "console";
import React, { useState, useEffect } from "react";
import { IOption } from "../../../shared/models/models";
import style from "./Select.module.css";

interface ISelect {
  selected: IOption;
  setSelected: (value: IOption) => void;
  options: IOption[];
}

const Select: React.FC<ISelect> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const setActiveHandler = (): void => {
    setIsActive((prev) => !prev);
  };

  const setSelectedHandler = (option: IOption): void => {
      props.setSelected(option);      
      setIsActive(false);
  };

  return (
    <div className={style.select}>
      <div className={style.selectBtn} onClick={setActiveHandler}>
        {props.selected.value}
      </div>
      {isActive && (
        <div className={style.selectContent}>
          {props.options.map((option, key) => (
            <div key={key} className={style.seletcItem} onClick={setSelectedHandler.bind(this, option)} >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Select;

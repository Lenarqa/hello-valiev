import React, { useState, useEffect } from "react";
import style from "./Select.module.css";

interface ISelect {
  selected: string;
  setSelected: (value: string) => void;
}

const Select: React.FC<ISelect> = (props) => {
  const DummyOptions = ["Все", "Отчислен", "Обучается", "Закончил"];
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    props.setSelected(DummyOptions[0]);
  }, []);

  const setActiveHandler = (): void => {
    setIsActive((prev) => !prev);
  };

  const setSelectedHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget.textContent !== null) {
      props.setSelected(e.currentTarget.textContent);
      setIsActive(false);
    }
  };
  return (
    <div className={style.select}>
      <div className={style.selectBtn} onClick={setActiveHandler}>
        {props.selected}
      </div>
      {isActive && (
        <div className={style.selectContent}>
          {DummyOptions.map((optionText, key) => (
            <div key={key} className={style.seletcItem} onClick={setSelectedHandler} >
              {optionText}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Select;

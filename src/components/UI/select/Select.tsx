import React, { useState, useEffect } from "react";
import { IOption } from "../../../shared/models/models";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import Input from "../input/Input";
import style from "./Select.module.css";

interface ISelect {
  type?: string;
  selected: IOption;
  options: IOption[];
  dataIsEdit?: boolean;
  setSelected: (value: IOption) => void;
  onChange: (option: IOption) => void;
  closeGoodWindow?: (value: boolean) => void;
  closeBadWindow?: (value: boolean) => void;
}

const Select: React.FC<ISelect> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [findVal, setFindVal] = useState<string>("");

  const onChangeFindHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    setFindVal(e.currentTarget.value);
  };

  const setActiveHandler = (): void => {
    setIsActive((prev) => !prev);
  };

  const setSelectedHandler = (option: IOption): void => {
    props.onChange(option);
    setIsActive(false);
    if (
      props.closeBadWindow !== undefined &&
      props.closeGoodWindow !== undefined
    ) {
      props.closeBadWindow(false);
      props.closeGoodWindow(false);
    }
  };

  return (
    <div className={style.select} data-type={props.type} data-is-open={isActive} data-is-edit={props.dataIsEdit}>
      <div className={style.selectBtn} onClick={setActiveHandler} >
        {props.selected.value}
      </div>
      {isActive && (
        <>
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
          <div className={style.selectContentCity}>
            <div className={style.selectCitySearch}>
              <SearchIcon className={style.findIcon} />
              <Input
                type="selectFind"
                id="selectFind"
                placeholder="Поиск города"
                value={findVal}
                onChange={onChangeFindHandler}
              />
            </div>
            {props.options
              .filter((option) => {
                if (findVal === "") {
                  return true;
                } else if (option.value.includes(findVal)) {
                  return true;
                }
              })
              .map((option, key) => (
                <div
                  key={key}
                  className={style.seletcItem}
                  onClick={setSelectedHandler.bind(this, option)}
                >
                  {option.value}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Select;

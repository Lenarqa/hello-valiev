import React, { useState, useEffect } from "react";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import style from "./Users.module.css";
import Select from "../../components/UI/select/Select";

const Users: React.FC = () => {
  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<string>("");

  return (
    <div className={style.container}>
      {isEmptyPage ? (
        <EmptyScreen text="Здесь еще нет данных..." />
      ) : (
        <div className={style.content}>
          <div className={style.contentHeader}>
              <h2>Участники</h2>
              <Select selected={selected} setSelected={setIsSelected} />
              {/* <select onChange={filterUsersHandler}>
                  <option value="все">Все</option>
                  <option value="Отчислен">Отчислен</option>
                  <option value="Обучается">Обучается</option>
                  <option value="Закончил">Закончил</option>
              </select> */}

          </div>
        </div>
      )}
    </div>
  );
};
export default Users;

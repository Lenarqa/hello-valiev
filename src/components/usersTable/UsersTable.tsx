import React, { useEffect } from "react";
import { IParticipant } from "../../shared/models/models";
import style from "./UsersTable.module.css";
import { DummyOptionsParticipants } from "../../shared/data/OptionsParticipant";
import { IOption } from "../../shared/models/models";
import { setUsersItemHeight } from "../../shared/lib/users/setUsersItemHeitght";

interface IUserTable {
  filteredParticipants: IParticipant[];
  setIsLeft: (val: boolean) => void;
}

const UsersTable: React.FC<IUserTable> = (props) => {
  useEffect(() => {
    setUsersItemHeight(style.text, style.info, style.statusWrapper);//я пытался сделать через css, но подходящего решения не нашел
    const table = document.getElementById("tableStyle");
    if (table) {
      table.addEventListener("scroll", (e) => {
        if (table.scrollLeft > 140) {
          props.setIsLeft(false);
        } else {
          props.setIsLeft(true);
        }
      });
    }
  }, []);

  return (
    <div className={style.tableStyle} id="tableStyle">
      <div className={style.table}>
        <div className={style.column}>
          <h2 className={style.colHeader}>ИФ УЧЕНИКА</h2>

          {props.filteredParticipants.map((item) => (
            <div className={style.info} key={item.id}>
              <img
                src={`https://academtest.ilink.dev/images/${item.imgUrl}`}
                alt="participantImg"
              />
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
        <div className={style.column}>
          <h2 className={style.colHeader} >КРАТКАЯ ИНФОРМАЦИЯ</h2>
          {props.filteredParticipants.map((item) => (
            <div className={style.text} key={item.id}>{item.aboutMe}</div>
          ))}
        </div>
        <div className={style.column}>
          <h2 className={style.colHeader}>СТАТУС</h2>
          {props.filteredParticipants.map((item, index) => {
            const status: IOption | undefined = DummyOptionsParticipants.find(
              (optionItem) => optionItem.id === item.status
            );
            return (
              <div className={style.statusWrapper} key={index}>
                <div className={style.status} data-status={item.status}>
                  {status?.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default UsersTable;

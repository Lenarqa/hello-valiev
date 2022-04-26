import React from "react";
import { IParticipant } from "../../shared/models/models";
import ParticipantItem from "../participantItem/ParticipantItem";
import style from "./UsersTable.module.css";
import { DummyOptionsParticipants } from "../../shared/data/OptionsParticipant";
import { IOption } from "../../shared/models/models";

interface IUserTable {
  filteredParticipants: IParticipant[];
}

const UsersTable: React.FC<IUserTable> = (props) => {
  return (
    <div className={style.tableStyle}>
      <div className={style.table}>
        <div className={style.column}>
          <h2 className={style.colHeader}>ИФ УЧЕНИКА</h2>

          {props.filteredParticipants.map((item) => (
            <div className={style.info}>
              <img
                src={require(`../../assets/img/participant/${item.imgUrl}`)}
                alt="participantImg"
              />
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
        <div className={style.column}>
          <h2 className={style.colHeader}>КРАТКАЯ ИНФОРМАЦИЯ</h2>
          {props.filteredParticipants.map((item) => (
            <div className={style.text}>{item.aboutMe}</div>
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
        {/* {props.filteredParticipants.map((item) => (
          <>
            <div className={style.column}>{item.name}</div>
            <div className={style.column}>{item.aboutMe}</div>
            <div className={style.column}>{item.status}</div>
          </>
        ))} */}
      </div>
    </div>
  );
};
export default UsersTable;

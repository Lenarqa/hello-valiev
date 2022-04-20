import React, { useState, useEffect } from "react";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import style from "./Users.module.css";
import Select from "../../components/UI/select/Select";
import { Participants } from "../../shared/data/UsersData";
import { IParticipant } from "../../models/models";
import ParticipantItem from "../../components/participantItem/ParticipantItem";

const Users: React.FC = () => {
  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<string>("");
  const [participants, setParticipants] = useState<IParticipant []>(Participants);

  return (
    <div className={style.container}>
      {isEmptyPage ? (
        <EmptyScreen text="Здесь еще нет данных..." />
      ) : (
        <div className={style.content}>
          <div className={style.contentHeader}>
              <h2>Участники</h2>
              <Select selected={selected} setSelected={setIsSelected} />
          </div>
          <div className={style.tableHeader}>
              <h2>ИФ УЧЕНИКА</h2>
              <h2>КРАТКАЯ ИНФОРМАЦИЯ</h2>
              <h2>СТАТУС</h2>
          </div>
          <div className={style.table}>
              {participants.map((participant)=>(
                  <ParticipantItem key={participant.id} participant={participant} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Users;

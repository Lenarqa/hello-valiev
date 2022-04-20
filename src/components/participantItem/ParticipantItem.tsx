import React from "react";
import style from "./ParticipantItem.module.css";
import { IParticipant } from "../../models/models";

interface IParticipantItem {
  participant: IParticipant;
}

const ParticipantItem: React.FC<IParticipantItem> = (props) => {
  return (
    <div className={style.item}>
      <div className={style.info}>
        <img
          src={require(`../../assets/img/participant/${props.participant.imgUrl}`)}
          alt="participantImg"
        />
        <h2>{props.participant.name}</h2>
      </div>
      <div className={style.text}>{props.participant.aboutMe}</div>
      <div className={style.status} data-status={props.participant.status}>{props.participant.status}</div>
    </div>
  );
};
export default ParticipantItem;

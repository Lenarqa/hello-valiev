import React from "react";
import style from "./ParticipantItem.module.css";
import { IOption, IParticipant } from "../../shared/models/models";
import {DummyOptionsParticipants} from "../../shared/data/OptionsParticipant";


interface IParticipantItem {
  type:string;
  participant: IParticipant;
}

const ParticipantItem: React.FC<IParticipantItem> = (props) => {
  const status:IOption | undefined = DummyOptionsParticipants.find(item => item.id === props.participant.status);

  return (
    <div className={style.item} data-type={props.type}>
      <div className={style.info}>
        <img
          src={require(`../../assets/img/participant/${props.participant.imgUrl}`)}
          alt="participantImg"
        />
        <h2>{props.participant.name}</h2>
      </div>
      <div className={style.movingBlock}>
        <div className={style.text}>{props.participant.aboutMe}</div>
       <div className={style.status} data-status={status?.id}>{status?.value}</div>
      </div>
    </div>
  );
};
export default ParticipantItem;

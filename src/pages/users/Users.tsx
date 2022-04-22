import React, { useState, useEffect, useContext } from "react";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import style from "./Users.module.css";
import Select from "../../components/UI/select/Select";
import { Participants } from "../../shared/data/UsersData";
import { IOption, IParticipant } from "../../shared/models/models";
import ParticipantItem from "../../components/participantItem/ParticipantItem";
import Pagination from "../../components/UI/pagination/Pagination";
import { DummyOptionsParticipants } from "../../shared/data/OptionsParticipant";
import { ErrorContext } from "../../components/store/ErrorContext";

const Users: React.FC = () => {
    // если в controlPanelAboutMe была ошибка скрываем ее
  // я еще не разобрался как прокидывать в оутлет пропсы или контекст
  const errorCtx = useContext(ErrorContext);
  useEffect(()=>{
    errorCtx.setIsError(false);
  }, []);
  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<IOption>(
    DummyOptionsParticipants[0]
  ); //0 - элемент, это элемент по дефолту отображающийся в селект;
  const [participants, setParticipants] =
    useState<IParticipant[]>(Participants);
  const [filteredParticipants, setFilteredParticipants] =
    useState<IParticipant[]>(Participants);

  //pagination
  const [curPage, setCurPage] = useState<number>(1);
  const [participantPerPage, setParticipantPerPage] = useState<number>(6);
  const indexLastParticipant: number = curPage * participantPerPage;
  const indexFirtParticipant: number =
    indexLastParticipant - participantPerPage;
  const curFilteredParticipants: IParticipant[] = filteredParticipants.slice(
    indexFirtParticipant,
    indexLastParticipant
  );

  const changePageHandler = (pageNum: number): void => {
    setCurPage(pageNum);
  };

  const nextPageHandler = (): void => {
    setCurPage((prev) => (prev += 1));
  };

  const BackPageHandler = (): void => {
    setCurPage((prev) => (prev -= 1));
  };

  const onChangeFilterHandler = (option: IOption): void => {
    if (option.id !== 1) {
      const filteredItems: IParticipant[] = participants.filter(
        (item) => item.status === option.id
      );
      setFilteredParticipants(filteredItems);
    } else {
      setFilteredParticipants(participants);
    }
    setIsSelected(option);
  };

  return (
    <div className={style.container}>
      {isEmptyPage ? (
        <EmptyScreen text="Список участников пуст" />
      ) : (
        <div className={style.content}>
          <div className={style.contentHeader}>
            <h2>Участники</h2>
            <Select
              selected={selected}
              setSelected={setIsSelected}
              options={DummyOptionsParticipants}
              onChange={onChangeFilterHandler}
            />
          </div>
          <div className={style.tableHeader}>
            <h2>ИФ УЧЕНИКА</h2>
            <h2>КРАТКАЯ ИНФОРМАЦИЯ</h2>
            <h2>СТАТУС</h2>
          </div>
          <div className={style.table}>
            {curFilteredParticipants.map((participant) => (
              <ParticipantItem key={participant.id} participant={participant} />
            ))}
          </div>
          <Pagination
            curPage={curPage}
            participantPerPage={participantPerPage}
            totalParticipant={filteredParticipants.length}
            changePageHandler={changePageHandler}
            nextPageHandler={nextPageHandler}
            backPageHandler={BackPageHandler}
          />
        </div>
      )}
    </div>
  );
};
export default Users;

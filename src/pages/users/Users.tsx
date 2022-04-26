import React, { useState, useEffect, useContext } from "react";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import style from "./Users.module.css";
import Select from "../../components/UI/select/Select";
import { Participants } from "../../shared/data/UsersData";
import { IOption, IParticipant } from "../../shared/models/models";
import ParticipantItem from "../../components/participantItem/ParticipantItem";
import Pagination from "../../components/UI/pagination/Pagination";
import { DummyOptionsParticipants } from "../../shared/data/OptionsParticipant";
import { PopUpContext } from "../../components/store/PopUpContext";
import ParticipantItemSkeleton from "../../components/participantItem/skeleton/ParticipantItemSkeleton";
import UsersTable from "../../components/usersTable/UsersTable";

const Users: React.FC = () => {
  const [isLoadingPage, setIsloadingPage] = useState<boolean>(false);
  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);

  const [selected, setIsSelected] = useState<IOption>(
    DummyOptionsParticipants[0]
  ); //0 - элемент, это элемент по дефолту отображающийся в селект;
  const [participants, setParticipants] =
    useState<IParticipant[]>(Participants);
  const [filteredParticipants, setFilteredParticipants] =
    useState<IParticipant[]>(Participants);

  // если в controlPanelAboutMe была ошибка скрываем ее
  // я еще не разобрался как прокидывать в оутлет контекст
  const popUpCtx = useContext(PopUpContext);
  useEffect(() => {
    popUpCtx.setIsError(false);
    popUpCtx.setIsOpenBadWindow(false);
    popUpCtx.setIsOpenGoodWindow(false);

    if(participants.length === 0) {
      setIsEmptyPage(true);
    }
    
    setIsloadingPage(true);
    setTimeout(()=>{
      setIsloadingPage(false);
    }, 1000);
  }, []);

  

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

    setIsloadingPage(true);
    setTimeout(()=>{
      setIsloadingPage(false);
    }, 1000);
  };

  const nextPageHandler = (): void => {
    setCurPage((prev) => (prev += 1));
    
    setIsloadingPage(true);
    setTimeout(()=>{
      setIsloadingPage(false);
    }, 1000);
  };

  const BackPageHandler = (): void => {
    setCurPage((prev) => (prev -= 1));
    
    setIsloadingPage(true);
    setTimeout(()=>{
      setIsloadingPage(false);
    }, 1000);
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
            <div className={style.leftBtn}/>
            <div className={style.rightBtn}/>
          </div>
          {/* <div className={style.tableHeader}>
            <h2>ИФ УЧЕНИКА</h2>
            <h2>КРАТКАЯ ИНФОРМАЦИЯ</h2>
            <h2>СТАТУС</h2>
          </div> */}
          <UsersTable filteredParticipants={curFilteredParticipants}/>
          {/* <div className={style.table}>
            {
            curFilteredParticipants.map((participant, index) => {
              if (!isLoadingPage) {
                return (
                  <ParticipantItem
                    type="scrollable"
                    key={participant.id}
                    participant={participant}
                  />
                );      
              } else {
                return <ParticipantItemSkeleton key={index} />;
              }
            })}
          </div> */}
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

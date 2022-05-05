import React, { useState, useEffect, useContext } from "react";
import { useStore } from "effector-react";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import style from "./Users.module.css";
import Select from "../../components/UI/select/Select";
import { Participants } from "../../shared/data/UsersData";
import { IOption, IParticipant } from "../../shared/models/models";
import Pagination from "../../components/UI/pagination/Pagination";
import { DummyOptionsParticipants } from "../../shared/data/OptionsParticipant";
import { PopUpContext } from "../../components/store/PopUpContext";
import ParticipantItemSkeleton from "../../components/participantItem/skeleton/ParticipantItemSkeleton";
import UsersTable from "../../components/usersTable/UsersTable";
import { usersStore } from "../../shared/effector/users";

const Users: React.FC = () => {
  const [isScrollLeft, setIsScrollLeft] = useState<boolean>(true);

  const [isLoadingPage, setIsloadingPage] = useState<boolean>(false);
  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);

  const [selected, setIsSelected] = useState<IOption>(
    DummyOptionsParticipants[0]
  ); //0 - элемент, это элемент по дефолту отображающийся в селект;
  // const [participants, setParticipants] =
  //   useState<IParticipant[]>(Participants);

  // если в controlPanelAboutMe была ошибка скрываем ее
  // я еще не разобрался как прокидывать в оутлет контекст
  const popUpCtx = useContext(PopUpContext);
  const fethingUsers = useStore(usersStore.$users);

  useEffect(() => {
    usersStore.getUsers([]);
    popUpCtx.setIsError(false);
    popUpCtx.setIsOpenBadWindow(false);
    popUpCtx.setIsOpenGoodWindow(false);

    setIsloadingPage(true);
    setTimeout(() => {
      setIsloadingPage(false);
    }, 1000);
  }, []);

  const isLoadingUsers = useStore(usersStore.$isLoadingUsers);

  const [filteredParticipants, setFilteredParticipants] = useState<
    IParticipant[]
  >(fethingUsers as IParticipant[]);
  console.log(fethingUsers);

  //pagination
  const [curPage, setCurPage] = useState<number>(1);
  const participantPerPage: number = 6;
  const indexLastParticipant: number = curPage * participantPerPage;

  const indexFirtParticipant: number =
    indexLastParticipant - participantPerPage;

  const curFilteredParticipants: IParticipant[] = filteredParticipants.slice(
    indexFirtParticipant,
    indexLastParticipant
  );

  // if (fethingUsers?.length === 0) {
  //     setIsEmptyPage(true);
  //   }

  const changePageHandler = (pageNum: number): void => {
    setCurPage(pageNum);

    setIsloadingPage(true);
    setTimeout(() => {
      setIsloadingPage(false);
    }, 1000);
  };

  const nextPageHandler = (): void => {
    setCurPage((prev) => (prev += 1));

    setIsloadingPage(true);
    setTimeout(() => {
      setIsloadingPage(false);
    }, 1000);
  };

  const BackPageHandler = (): void => {
    setCurPage((prev) => (prev -= 1));

    setIsloadingPage(true);
    setTimeout(() => {
      setIsloadingPage(false);
    }, 1000);
  };

  const onChangeFilterHandler = (option: IOption): void => {
    if (option.id !== "all") {
      const filteredItems: IParticipant[] = fethingUsers!.filter(
        (item) => item.status === option.id
      );
      setIsloadingPage(true);
      setTimeout(() => {
        setIsloadingPage(false);
      }, 1000);
      setFilteredParticipants(filteredItems);
    } else {
      setIsloadingPage(true);
      setTimeout(() => {
        setIsloadingPage(false);
      }, 1000);
      setFilteredParticipants(fethingUsers as IParticipant[]);
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
            <div className={style.leftBtn} data-is-active={isScrollLeft} />
            <div className={style.rightBtn} data-is-active={isScrollLeft} />
          </div>
          {!isLoadingUsers && !isLoadingPage && (
            <UsersTable
              filteredParticipants={curFilteredParticipants}
              setIsLeft={setIsScrollLeft}
            />
          )}
          {(isLoadingUsers || isLoadingPage) && (
            <div className={style.table}>
              <div className={style.headerSkeleton}></div>
              {[1,2,3,4,5,6].map((participant, index) => (
                <ParticipantItemSkeleton key={index} />
              ))}
            </div>
          )}
          {curFilteredParticipants.length !== 0 && (
            <Pagination
              curPage={curPage}
              participantPerPage={participantPerPage}
              totalParticipant={filteredParticipants.length}
              changePageHandler={changePageHandler}
              nextPageHandler={nextPageHandler}
              backPageHandler={BackPageHandler}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default Users;

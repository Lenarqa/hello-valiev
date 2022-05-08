import React, { useState, useEffect, useContext } from "react";
import { useStore } from "effector-react";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import style from "./Users.module.css";
import Select from "../../components/UI/select/Select";
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

  // если в controlPanelAboutMe была ошибка скрываем ее
  const popUpCtx = useContext(PopUpContext);

  const filteredUsers: IParticipant[] | undefined = useStore(
    usersStore.$filteredUsers
  );

  const fethingUsers: IParticipant[] | undefined = useStore(usersStore.$users);
  const isLoadingFilteredUsers: boolean = useStore(usersStore.$isLoadingUsers);
  const curPage: number = useStore(usersStore.$curPage);

  // pagination
  const participantPerPage: number = 6;
  const indexLastParticipant: number = curPage * participantPerPage;

  const indexFirtParticipant: number =
    indexLastParticipant - participantPerPage;

  const curFilteredParticipants: IParticipant[] = filteredUsers!.slice(
    indexFirtParticipant,
    indexLastParticipant
  );

  const isLoadingUsers: boolean = useStore(usersStore.$isLoadingUsers);

  useEffect(() => {
    usersStore.getUsers([]);
    popUpCtx.setIsError(false);
    popUpCtx.setIsOpenBadWindow(false);
    popUpCtx.setIsOpenGoodWindow(false);
  }, []);

  useEffect(() => {
    if (!isLoadingFilteredUsers) {
      usersStore.filterUsers(selected);
    }
  }, [selected, isLoadingUsers]);

  const loadingPage = (): void => {
    setIsloadingPage(true);
    setTimeout(() => {
      setIsloadingPage(false);
    }, 500);
  };

  const changePageHandler = (pageNum: number): void => {
    usersStore.setCurPage(pageNum);
    loadingPage();
  };

  const nextPageHandler = (): void => {
    usersStore.setCurPage(1000000000);
    loadingPage();
  };

  const BackPageHandler = (): void => {
    usersStore.setCurPage(-1000000000);
    loadingPage();
  };

  const onChangeFilterHandler = (option: IOption): void => {
    usersStore.filterUsers(option);
    setIsSelected(option);
    loadingPage();
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
          {!isLoadingPage && (
            <UsersTable
              filteredParticipants={curFilteredParticipants}
              setIsLeft={setIsScrollLeft}
            />
          )}
          {(isLoadingPage || isLoadingFilteredUsers) && (
            <div className={style.table}>
              <div className={style.headerSkeleton}></div>
              {[1, 2, 3, 4, 5, 6].map((participant, index) => (
                <ParticipantItemSkeleton key={index} />
              ))}
            </div>
          )}
          {filteredUsers!.length !== 0 && (
            <Pagination
              curPage={curPage}
              participantPerPage={6}
              totalParticipant={fethingUsers!.length}
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

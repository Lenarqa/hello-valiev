import React, { useState } from "react";

export const PopUpContext = React.createContext({
  isError: false,
  isErrorMsg: "",
  isOpenGoodWindow:false,
  isOpenBadWindow:false,
  setIsError: (val: boolean) => {},
  setErrorMsg: (msg: string) => {},
  setIsOpenGoodWindow: (val: boolean) => {},
  setIsOpenBadWindow: (val: boolean) => {},
});

const PopUpContextProvider: React.FC = (props) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [isOpenGoodWindow, setIsOpenGoodWindow] = useState<boolean>(false);
  const [isOpenBadWindow, setIsOpenBadWindow] = useState<boolean>(false);

  const initState = {
    isError: isError,
    isErrorMsg: errorMsg,
    isOpenGoodWindow: isOpenGoodWindow,
    isOpenBadWindow: isOpenBadWindow,
    setIsError: setIsError,
    setErrorMsg: setErrorMsg,
    setIsOpenGoodWindow:setIsOpenGoodWindow,
    setIsOpenBadWindow:setIsOpenBadWindow,
  };

  return (
    <PopUpContext.Provider value={initState}>
      {props.children}
    </PopUpContext.Provider>
  );
};

export default  PopUpContextProvider;

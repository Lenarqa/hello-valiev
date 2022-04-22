import React, { useState } from "react";

export const ErrorContext = React.createContext({
  isError: false,
  isErrorMsg: "",
  setIsError: (val: boolean) => {},
  setErrorMsg: (msg: string) => {},
});

const ErrorContextProvider: React.FC = (props) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const initState = {
    isError: isError,
    isErrorMsg: errorMsg,
    setIsError: setIsError,
    setErrorMsg: setErrorMsg,
  };

  return (
    <ErrorContext.Provider value={initState}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;

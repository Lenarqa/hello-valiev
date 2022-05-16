import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PopUpContextProvider from "../../components/store/PopUpContext";

const AppProviders: React.FC = ({children}) => {
  return (
    <BrowserRouter>
      <PopUpContextProvider>
          {children}
      </PopUpContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;

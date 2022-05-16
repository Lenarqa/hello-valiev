import React from "react";
import ReactDOM from "react-dom";
import App from "./app/";
import "./app/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import PopUpContextProvider from "./components/store/PopUpContext";

ReactDOM.render(
  <React.StrictMode>
    <PopUpContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PopUpContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

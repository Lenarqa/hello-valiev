import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorContexProvider from "./components/store/ErrorContext";

ReactDOM.render(
  <React.StrictMode>
    <ErrorContexProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorContexProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

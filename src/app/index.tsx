import React from "react";
import Routing from "../pages";
import AppProviders from "./providers";
import "./styles/index.css";

const App:React.FC = () => {
  return <AppProviders>
    <Routing />
  </AppProviders>;
}

export default App;

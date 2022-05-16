import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import AboutMe from "./aboutMe/AboutMe";
import Auth from "./auth/Auth";
import ControlPanel from "./controlPanel/ControlPanel";
import PasswordRecovery from "./passwordRecovery/PasswordRecovery";
import Users from "./users/Users";
import Reviews from "./reviews/Reviews";
import ControlPanelAboutMe from "./controlPanelAboutMe/ControlPanelAboutMe";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Auth />} />
      <Route path="/hello-valiev/about-me" element={<AboutMe />} />
      <Route
        path="/hello-valiev/passwordRecovery"
        element={<PasswordRecovery />}
      />
      <Route path="/hello-valiev/controlPanel/*" element={<ControlPanel />}>
        <Route path="users" element={<Users />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="aboutMe" element={<ControlPanelAboutMe />} />
      </Route>
    </Routes>
  );
};

export default Routing;

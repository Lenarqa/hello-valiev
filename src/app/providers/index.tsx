import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import AboutMe from "../../pages/aboutMe/AboutMe";
import Auth from "../../pages/auth/Auth";
import ControlPanel from "../../pages/controlPanel/ControlPanel";
import Users from "../../pages/users/Users";
import Rewiews from "../../pages/reviews/Reviews";
import PasswordRecovery from "../../pages/passwordRecovery/PasswordRecovery";
import ControlPanelAboutMe from "../../pages/controlPanelAboutMe/ControlPanelAboutMe";

const AppRoutes: React.FC = () => {
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
        <Route path="reviews" element={<Rewiews />} />
        <Route path="aboutMe" element={<ControlPanelAboutMe />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

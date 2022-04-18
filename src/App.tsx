import { Routes, Route } from "react-router-dom";
import AboutMe from "./pages/aboutMe/AboutMe";
import Auth from "./pages/auth/Auth";
import ControlPanel from "./pages/controlPanel/ControlPanel";
import ControlPanelAboutMe from "./pages/controlPanelAboutMe/ControlPanelAboutMe";
import PasswordRecovery from "./pages/passwordRecovery/PasswordRecovery";
import Rewiews from "./pages/rewiews/Rewiews";
import Users from "./pages/users/Users";

function App() {
  return (
    // проверку на изменение url в строке пока что не делал,
    // поэтому можно изменить путь в url и переместиться на любую страницу
    <Routes>
      {/* <Route path="*" element={<Auth />} /> */}
      <Route path="/hello-valiev/about-me" element={<AboutMe />} />
      <Route
        path="/hello-valiev/passwordRecovery"
        element={<PasswordRecovery />}
      />
      <Route
        path="/hello-valiev/controlPanel/*"
        element={<ControlPanel />}
      >
        <Route path="users" element={<Users />}/>
        <Route path="rewies" element={<Rewiews />}/>
        <Route path="aboutMe" element={<ControlPanelAboutMe />}/>
      </Route>
    </Routes>
  );
}

export default App;

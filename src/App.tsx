import { Routes, Route, Link } from "react-router-dom";
import AboutMe from "./pages/aboutMe/AboutMe";
import Auth from "./pages/auth/Auth";
import PasswordRecovery from "./pages/passwordRecovery/PasswordRecovery";

function App() {
  return (
    // проверку на изменение url в строке пока что не делал,
    // поэтому можно изменить путь в url и переместиться на любую страницу
    <Routes>
      <Route path="*" element={<Auth />} />
      <Route path="/hello-valiev/about-me" element={<AboutMe />} />
      <Route
        path="/hello-valiev/passwordRecovery"
        element={<PasswordRecovery />}
      />
    </Routes>
  );
}

export default App;

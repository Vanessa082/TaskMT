import { Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/landing-page/Landing-page";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import DashboardPage from "./Pages/dashboard/dashboard-page/dashboard-page";
import { AppContextProvider } from "./providers/app-context";
import { DashboardGaurd } from "./providers/dasboardguard";
import DashboardProjects from "./Pages/dashboard/projects/projects";
import DashboardWrapper from "./Pages/dashboard/dashboard-wrapper";
import AppWrapper from "./Component/Common/app-wrapper";
import Projects from "./Pages/dashboard/projects/projects";

function App() {
  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route element={<AppWrapper />}>
            <Route index path="/" element={<LandingPage />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route
            element={
              <DashboardGaurd>
                <DashboardWrapper />
              </DashboardGaurd>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route path="projects" element={<Projects/>} />
              <Route path="profile" element={<DashboardProjects />} />
            </Route>
          </Route>
        </Routes>
      </AppContextProvider>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/landing-page/Landing-page";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import DashboardPage from "./Pages/dashboard/dashboard-page/dashboard-page";
import { AppContextProvider } from "./providers/context/app-context";
import { DashboardGaurd } from "./providers/guards/dasboardguard";
import DashboardWrapper from "./Pages/dashboard/dashboard-wrapper";
import AppWrapper from "./Component/Common/app-wrapper";
import Projects from "./Pages/dashboard/projects/projects";

function App() {
  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route element={<AppWrapper />}>
            <Route index element={<LandingPage />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <DashboardGaurd>
                <DashboardWrapper />
              </DashboardGaurd>
            }
          >
            <Route index element={<DashboardPage />} />

            <Route path="projects" element={<Projects />} />
          </Route>
        </Routes>
      </AppContextProvider>
    </>
  );
}

export default App;

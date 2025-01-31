import { Outlet, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/landing-page/Landing-page";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import DashboardPage from "./Pages/dashboard/dashboard-page/dashboard-page";
import { DashboardGaurd } from "./providers/guards/dasboardguard";
import DashboardWrapper from "./Pages/dashboard/dashboard-wrapper";
import AppWrapper from "./Component/Common/app-wrapper";
import ManageProjects from "./Pages/dashboard/projects/manage-project";
import { ModalContextProvider } from "./providers/context/modal-context";
import { DashboardContextProvider } from "./providers/context/dashboard-context";
import { Project } from "./Pages/dashboard/projects/Project";


function App() {
  return (
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
            <DashboardContextProvider>
              <ModalContextProvider>
                <DashboardWrapper />
              </ModalContextProvider>
            </DashboardContextProvider>
          </DashboardGaurd>
        }
      >
        <Route index element={<DashboardPage />} />

        <Route
          path="projects"
          element={<Outlet />}
        >
          <Route index element={<ManageProjects />} />

          <Route path=":id" element={<Project />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

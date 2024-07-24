import { Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/landing-page/Landing-page";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import Footer from "./Component/Common/footer";
import Navbar from "./Component/Common/Navbar";
import Dashboard from "./Pages/dashboard/dashboard";
import { AppContextProvider } from "./providers/app-context";
import { DashboardGourd } from "./providers/dasboardguard";

function App() {
  return (
    <>
      <AppContextProvider>
        <Navbar />

        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/registration" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <DashboardGourd>
                <Dashboard />
              </DashboardGourd>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </AppContextProvider>
    </>
  );
}

export default App;

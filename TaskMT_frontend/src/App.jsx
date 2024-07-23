import { Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/landing-page/Landing-page";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import Footer from "./Component/Common/footer";
import Navbar from "./Component/Spercific/Navbar/Navbar";
import Dashboard from "./Pages/dashboard/dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

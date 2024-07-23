<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/LoginPage/Login'
import LandingPage from './Pages/landing-page/Landing-page'
import Register from './Pages/Register/Register'
import Footer from './Component/Common/footer'
=======
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/landing-page/Landing-page";
import Register from "./Pages/Register/Register";
import Footer from "./Component/Common/footer";
>>>>>>> f0d3a27 (connected the frontend to the backend)
import Navbar from "./Component/Spercific/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
<<<<<<< HEAD
        <Route index path='/' element={<LandingPage />} />
        <Route path='/registration' element={<Register />} />
        <Route path='/login' element={<Login />} />
=======
        <Route index element={<LandingPage />} />
        <Route path="/registration" element={<Register />} />
>>>>>>> f0d3a27 (connected the frontend to the backend)
      </Routes>

      <Footer />
    </>
  );
}

export default App;

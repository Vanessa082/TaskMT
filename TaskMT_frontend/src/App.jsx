import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/landing-page/Landing-page'
import Register from './Pages/Register/Register'
import Footer from './Component/Common/footer'
import Navbar from "./Component/Spercific/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/registration' element={<Register />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App

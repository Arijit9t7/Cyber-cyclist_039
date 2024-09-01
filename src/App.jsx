import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Footer from './Components/Footer/Footer'
import PropertyListing from './Pages/Properties/PropertyListing'
import PropertyCardDetail from './Pages/PropertyCardDetail/PropertyCardDetail'
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();



  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/properties' element={<PropertyListing />} />
          <Route path='/propertycard/:id' element={<PropertyCardDetail />} />
        </Routes>
        <Footer />
      </div>

    </>
  )
}

export default App

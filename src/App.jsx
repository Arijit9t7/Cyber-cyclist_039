import { Route, Routes } from 'react-router-dom'
import './App.css'
import logo from './assets/Logo.png'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'

function App() {


  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>


    </>
  )
}

export default App

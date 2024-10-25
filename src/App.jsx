import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Footer from './Components/Footer/Footer'
import PropertyListing from './Pages/Properties/PropertyListing'
import PropertyCardDetail from './Pages/PropertyCardDetail/PropertyCardDetail'
import { AdminRoute } from './routes/AdminRoute'
import PageNotFound from './Pages/Pagenotfound/PageNotFound'
import AdminDashboard from './Pages/Admin/AdminDashboard/AdminDashboard'

import Addproperty from './Components/Addproperty/Addproperty'

function App() {
  

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

          <Route path='/admin-dashboard' element={<AdminRoute />} >
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='add-property' element={<Addproperty />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>

    </>
  )
}

export default App

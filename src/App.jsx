import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './components/Products'
import Cart from './pages/Cart'
import ProductDetails from './components/ProductDetails'
import Users from './pages/Users'
import Admin from './pages/Admin'
import Footer from './components/Footer'

const App = () => {

  return (
    <div>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<ProtectedRoute>
            <Cart />
          </ProtectedRoute>} />

          <Route path='/users/:id' element={<ProtectedRoute>
            <Users />
          </ProtectedRoute>} />

          <Route path='/products/:id' element={<ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>} />

          <Route path='/admin' element={<ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />

          <Route path='/Products'
            element={<ProtectedRoute>
              <Products />
            </ProtectedRoute>} />


        </Routes>

        <Footer />

      </BrowserRouter>

    </div>
  )
}

export default App
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import Home from './Pages/Home'
import AppLayout from './Pages/AppLayout'
import PageNotFound from './Pages/PageNotFound'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import AppLayout from './Pages/AppLayout'
import PageNotFound from './Pages/PageNotFound'
import Homepage from './Pages/Homepage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App

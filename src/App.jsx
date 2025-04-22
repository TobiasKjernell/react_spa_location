import { Route, Routes } from 'react-router-dom'
import './App.css'
import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import Home from './Pages/Home'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='product' element={<Product />} />
      <Route path='pricing' element={<Pricing />} />
    </Routes>
    </>
  )
}

export default App

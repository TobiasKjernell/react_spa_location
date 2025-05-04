import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'

import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import AppLayout from './Pages/AppLayout'
import PageNotFound from './Pages/PageNotFound'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'

const CITIES_URL = "http://localhost:9000/cities"

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${CITIES_URL}`);
        const data = await res.json();
        setCities(data);
        console.log(data);

      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='app' element={<AppLayout />} >
          <Route index element={<Navigate replace to='cities' />} />
          <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities/:id' element={<City />} />
          <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App

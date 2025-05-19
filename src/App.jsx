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
import { CitiesProvider } from './contexts/CitiesContexts'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProctectedRoute from './Pages/ProtectedRoute'

function App() {


  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='app' element={
              <ProctectedRoute>
                <AppLayout />
              </ProctectedRoute>}>
              <Route index element={<Navigate replace to='cities' />} />
              <Route path='cities' element={<CityList />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </CitiesProvider>
      </AuthProvider>
    </>
  )
}

export default App

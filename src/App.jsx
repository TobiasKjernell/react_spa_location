import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContexts'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProctectedRoute from './Pages/ProtectedRoute'
import SpinnerFullPage from './components/SpinnerFullPage'

// import Product from './Pages/Product'
// import Pricing from './Pages/Pricing'
// import AppLayout from './Pages/AppLayout'
// import PageNotFound from './Pages/PageNotFound'
// import Homepage from './Pages/Homepage'
// import Login from './Pages/Login'

const Homepage = lazy(() => import('./Pages/Homepage'));
const Pricing = lazy(() => import('./Pages/Pricing'));
const Login = lazy(() => import('./Pages/Login'));
const AppLayout = lazy(() => import('./Pages/AppLayout'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));
const Product = lazy(() => import('./Pages/Product'));


function App() {
  const location = useLocation();
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <Suspense fallback={<SpinnerFullPage />} key={location.key}>
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
          </Suspense>
        </CitiesProvider>
      </AuthProvider>
    </>
  )
}

export default App

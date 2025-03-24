import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './Helpers/Routename'
import { Index } from './Pages/Index'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { Profile } from './Pages/Profile'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />} >
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
        </Route>
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

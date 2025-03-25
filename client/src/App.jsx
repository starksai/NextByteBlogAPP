import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { RouteAddCategory, RouteCategory, RouteEditCategory, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './Helpers/Routename'
import { Index } from './Pages/Index'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { Profile } from './Pages/Profile'
import { Category } from './Pages/Category/Category'
import { Addcategory } from './Pages/Category/Addcategory'
import { Editcategory } from './Pages/Category/Editcategory'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />} >
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteCategory} element={<Category />} />
          <Route path={RouteAddCategory} element={<Addcategory />} />
          <Route path={RouteEditCategory()} element={<Editcategory />} />
        </Route>
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

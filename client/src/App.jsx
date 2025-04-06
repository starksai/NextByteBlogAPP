import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { RouteAddBlog, RouteAddCategory, RouteBlog, RouteBlogByCategory, RouteCategory, RouteEditBlog, RouteEditCategory, RouteIndex, RouteProfile, RouteSearchBlog, RouteSignIn, RouteSignUp, RouteSingleBlog } from './Helpers/Routename'
import { Index } from './Pages/Index'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { Profile } from './Pages/Profile'
import { Category } from './Pages/Category/Category'
import { Addcategory } from './Pages/Category/Addcategory'
import { Editcategory } from './Pages/Category/Editcategory'
import { Blog } from './Pages/Bolg/Blog'
import { Blogadd } from './Pages/Bolg/Blogadd'
import { Blogedit } from './Pages/Bolg/Blogedit'
import { SingleBlogDetails } from './Pages/SingleBlogDetails'
import { BlogsByCategory } from './Pages/BlogsByCategory'
import { SearchBlog } from './Pages/SearchBlog'

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


          <Route path={RouteBlog} element={<Blog />} />
          <Route path={RouteAddBlog} element={<Blogadd />} />
          <Route path={RouteEditBlog()} element={<Blogedit />} />

          <Route path={RouteSingleBlog()} element={<SingleBlogDetails />} />

          <Route path={RouteBlogByCategory()} element={<BlogsByCategory />}  />


          <Route path={RouteSearchBlog()} element={<SearchBlog />}  />
          
        </Route>



        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

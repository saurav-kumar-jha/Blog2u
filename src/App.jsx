import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import './App.css'
import AuthForm from './component/auth/login'
import { Nav } from './component/Nav/nav'
import { Hero } from './component/HeroPage/hero'
import { Hero2 } from './component/HeroPage/hero2'
import { Blog } from './component/BlogPage/blog'
import { SingleBlog } from './component/BlogPage/singleBlog'

const Heropage = ()=>{
  return(
    <>
     <Hero/>
     <Hero2/>
    </>
  )
}

const Home = ()=>{
  const navigate = useLocation()
  return(
    <>
     <Nav/>
     {
        navigate.pathname == "/" ?( <Heropage/>):( <Outlet/>)
     }
     
    </>
  )
}
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    children:[{
      path:"/login",
      element:<AuthForm/>
    },
    {
      path:"/blog",
      element:<Blog/>
    },
    {
      path:"/blog/:_id",
      element:<SingleBlog />
    }
  ]
  },
  
])


function App() {

  

  return (
    <>
      <RouterProvider router={router} />      
    </>
  )
}

export default App
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import './App.css'
import AuthForm from './component/auth/login'
import { Nav } from './component/Nav/nav'
import { Hero } from './component/HeroPage/hero'
import { Hero2 } from './component/HeroPage/hero2'
import { Blog } from './component/BlogPage/blog'
import { SingleBlog } from './component/BlogPage/singleBlog'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { login, logout} from "./component/Redux/feature/userSlice"
import { UserProfile } from "./component/Nav/userProfile"
import { AddBlog } from './component/BlogPage/AddBlog'
import { EditProfile } from './component/Nav/EditProfile'
import UserApi from './component/utils/UserApi'
const API = import.meta.env.VITE_USER_URL

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
    },
    {
      path:"/user",
      element:<UserProfile/>
    },
    {
      path:"/create-blog",
      element:<AddBlog/>
    },
    {
      path:"/user/edit-profile",
      element:<EditProfile />
    }
  ]
  },
  
])


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    fetchDetail()
  },[])
  const fetchDetail = async ()=>{
    try {
      const res = await UserApi.get('/auth-check')
      console.log(res)
      if(res.data?.userData){
        dispatch(login(res.data?.userData))
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <>
      <RouterProvider router={router} />   
      <ToastContainer position='top-center' />   
    </>
  )
}

export default App
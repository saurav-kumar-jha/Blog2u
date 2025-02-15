import axios from "axios"
import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login } from "../Redux/feature/userSlice"

const API = import.meta.env.VITE_USER_URL


export const Login = () => {
    const[data,setdata] = useState({email:"",password:"",confirmPassword:""})
    const [load, setload] = useState(false)
    const [showpass, setshowpass]= useState(false)
    const [showcnfpass, setshowcnfpass]= useState(false)
    const {isLoggedIn} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{

        const savedUser = localStorage.getItem("user")
        if(savedUser){
            dispatch(login(JSON.parse(savedUser)))
            navigate("/")
        }
        // console.log(savedUser)
        
        if(isLoggedIn){
            navigate('/')
            toast.error("Already logged In")
        }
    },[dispatch, navigate, isLoggedIn])

    const handleChange  = (e)=>{
        setdata((previous)=>(
            {
                ...previous,
                [e.target.name]:e.target.value
            }
        ))
    }
    const validValue = (
        data.email.trim() !== '' &&
        data.password.trim() !== '' &&
        data.confirmPassword.trim() !== ''
    )

    const handleSubmit = async (e)=>{
        e.preventDefault()

        setload(true)
        try{
            if(data.password !== data.confirmPassword){
                alert("Password must be same")
                return;
            }

            const res = await axios.post(`${API}/login`, data)

            if(res.data.success){
                // console.log(login(res.data?.validEmail))
                dispatch(login(res.data?.validEmail))

                toast.success(res.data.msg)
                localStorage.setItem("user", JSON.stringify(res.data?.validEmail))
                setTimeout(() => {
                    setdata({
                        email:"",
                        password:"",
                        confirmPassword:""
                    })
                    navigate('/')
                }, 1500);
            }else {
                toast.error(response.data.msg)
                setdata({
                    email:"",
                    password:"",
                    confirmPassword:""
                })
            }
        }catch(error){
            if(error.response){
                toast.error(error.response.data?.msg)
            }else {
                toast.error("An unexpected error occured")
            }
        }
        setload(false)
    }
    const handlepass = (e)=>{
        e.preventDefault()
        setshowpass(!showpass)
    }
    const handlecnfpassword = (e)=>{
        e.preventDefault()
        setshowcnfpass(!showcnfpass)
    }
    return (
        <>
            <form action="" onSubmit={handleSubmit} className='flex justify-center items-center flex-col text-center bg-[#FFFFFF] h-[90%] px-[50px] '>
                <h1 className='font-bold my-3 text-4xl text-center'>Sign in</h1>
                
                <input type="email" name="email" value={data.email} onChange={handleChange} placeholder='Email' className='w-[100%] bg-[#eee] px-[15px] py-[12px] mb-[-4px] rounded-md outline-none focus:ring-2 focus:ring-[#9b9898] focus:border-transparent transition-all duration-300 ease-in-out' /><br />

                <div className="relative w-full mb-2">
                    <input type={showpass ? "text":"password"} name="password" value={data.password} onChange={handleChange} placeholder='Password' className='w-full bg-[#eee] px-[15px] py-[12px] rounded-md outline-none focus:ring-2 focus:ring-[#9b9898] focus:border-transparent transition-all duration-300 ease-in-out' />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#9b9898]">
                    {
                        !showpass ? (<FaEye onClick={handlepass}/>):(<FaEyeSlash onClick={handlepass} /> )
                    }
                        
                    </span>
                </div>

                <div className="relative w-full my-2">
                    <input 
                        type={showcnfpass ? "text":"password"}
                        name="confirmPassword" 
                        value={data.confirmPassword} 
                        onChange={handleChange} 
                        placeholder='Enter confirm Password' 
                        className='w-full bg-[#eee] px-[15px] py-[12px] rounded-md outline-none focus:ring-2 focus:ring-[#9b9898] focus:border-transparent transition-all duration-300 ease-in-out' 
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#9b9898]">
                    {
                        !showcnfpass ? (<FaEye onClick={handlecnfpassword} /> ):(<FaEyeSlash onClick={handlecnfpassword} /> )
                    }
                        
                    </span>
                </div>
                <a href="#" className='text-sm text-gray-500 my-3'>Forget your password?</a>
                <button type='submit' className='bg-[#FF4B2B] cursor-pointer text-white active:scale-95 ease-in duration-75 px-4 py-2 rounded-md w-[100%] text-[18px] ' >{load ?"Signing...":"Sign In" }</button>

            </form>
        </>
    )
}
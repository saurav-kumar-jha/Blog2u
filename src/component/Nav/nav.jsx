import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
export const Nav = () => {
    const { isLoggedIn, user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const imgUrl = useSelector((state)=> state.user?.user?.profilePicture)
    const username = useSelector((state) => state.user?.user?.username)
    // console.log(user);
    
    const handlelogin = () => {
        navigate("/login")
    }
    const handleimg = () => {
        navigate("/")
    }
    const handleuser = ()=>{
        navigate(`/user`)
    }
    const handleAddBlog = ()=>{
        if(isLoggedIn){
            navigate("/create-blog")
        }else{
            navigate("/login")
        }
    }

    return (
        <>
            <nav className="h-[20vh] w-[100vw] bg-transparent relative top-0 backdrop-blur-xl flex justify-evenly items-center shadow-xl ">
                <div className="w-auto ">
                    <img src="/logo2.png" alt="" onClick={handleimg} className="h-[100%] w-[180px] cursor-pointer " />
                </div>
                <div className="h-auto w-[40%] ">
                    <ul className="flex justify-evenly text-[18px] font-semibold font-serif items-center px-4 py-2 ">
                        <NavLink to="/" className={({ isActive }) => !isActive ? "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 hover:text-black hover:bg-transparent bg-black text-white shadow-2xl  rounded-full " : "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-transparent text-black shadow-2xl scale-110 rounded-full "}>Home</NavLink>

                        <NavLink to="/blog" className={({ isActive }) => !isActive ? "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-black hover:text-black hover:bg-transparent text-white shadow-2xl  rounded-full " : "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-transparent text-black shadow-2xl scale-110 rounded-full "}>Blog</NavLink>

                        <NavLink to="/contact" className={({ isActive }) => !isActive ? "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 hover:text-black hover:bg-transparent px-6 bg-black text-white shadow-2xl  rounded-full " : "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-transparent text-black shadow-2xl scale-110 rounded-full "}>Contact us</NavLink>
                    </ul>

                </div>
                <div className="flex justify-evenly items-center w-auto px-2 " >
                    {
                        isLoggedIn ? (
                            <>
                            {
                                imgUrl ? (
                                    <img src={imgUrl} className="h-[40px] w-[40px] rounded-full object-cover cursor-pointer " onClick={handleuser} alt="" />
                                ):(
                                <span className="text-3xl mx-1 cursor-pointer" onClick={handleuser}><FaUserCircle /> </span>
                                )
                            }
                                <p className="font-semibold text-lg mx-2" >Welcome <span className="font-medium text-lg hover:underline cursor-pointer " onClick={handleuser} > {username.split(' ')[0].toUpperCase()}</span> </p>
                            </>
                        ) : (
                            <button className="h-auto w-auto px-[12px] cursor-pointer py-2 border border-transparent mx-2 text-[18px]" onClick={handlelogin} >Login</button>
                        )
                    }
                    <button onClick={handleAddBlog} className="h-auto w-auto px-[16px] py-2 hover:text-black hover:bg-transparent shadow-2xl bg-black border cursor-pointer border-white rounded-lg text-[18px] font-semibold text-white active:scale-90 duration-75 ease-in-out ">Get started</button>
                </div>
            </nav>


        </>
    )
}
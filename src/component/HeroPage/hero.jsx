import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export const Hero = () => {
    const {isLoggedIn} = useSelector((state)=> state.user)
    const navigate = useNavigate()

    const handleStart = (e)=>{
        e.preventDefault()
        if(isLoggedIn){
            navigate("/create-blog")
        }else{
            navigate("/login")
        }
    }

    return (
        <>
            <section className="md:h-[100vh] h-[70vh] w-[100vw] bg-img " >
                <section className="h-[80vh] w-[100%] absolute top-[20vh]  md:backdrop-blur-[2px] " >
                    <div className="w-full flex justify-center items-center flex-col h-[35%]">
                        <h1 className="md:text-6xl text-4xl font-bold text-center ">Discover New Ideas, One Post at a Time</h1>
                        <p className="md:text-2xl text-lg font-[500] font-mono text-center mt-2 ">Create a unique and beautiful blog easily</p>
                    </div>

                    <div className="h-[15%] w-full flex justify-center items-center ">
                        <button className="h-auto w-auto px-8 py-4 bg-[orange] text-white md:text-2xl text-lg font-semibold cursor-pointer hover:scale-110 duration-200 ease-in-out active:scale-90  rounded-xl " onClick={handleStart} >Get started</button>
                    </div>
                </section>

            </section>
        </>
    )
}
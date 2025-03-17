import axios from "axios"
import { useEffect, useState } from "react"
import data from "../../data.js"
import { useNavigate } from "react-router-dom"
const API = import.meta.env.VITE_API_URL


export const ALlBlog = () => {
    const [blogs, setdata]= useState([])
    const [load, setload] = useState(false)
    const [err, seterr] = useState(null)
    const navigate = useNavigate()
    

    useEffect(()=>{
        const fetchBlogs = async ()=>{
            try {
                setload(true)
                const res = await axios.get(`${API}/allblogs`)
                setdata(res.data.blogs)                
            } catch (error) {
                seterr(error.message)
            }finally { 
                setload(false)
            }
        }
        fetchBlogs()
    },[])
    if (load) {
        return(
            <div className="flex justify-center items-center h-[50vh]" >
                <h2>Loading blogs...</h2>
            </div>
        )
    }

    if (err) {
        return(
            <div className="flex justify-center items-center h-[50vh]" >
                <h2>Error: {err} </h2>
            </div>
        )
    }


    const handleClick = (id) => {
        navigate(`/blog/${id}`)
    }

    return (
        <>
            <ul className="flex flex-wrap justify-center items-center gap-4 w-[100%] ">
                {blogs.length === 0 ? (
                        <h1>No blog found..</h1>
                    ) : (
                        blogs.map((item) => (
                            <li key={item._id} onClick={() => handleClick(item._id)} className="h-auto min-h-[350px] max-h-[400px] w-[300px] relative shadow-2xl my-1 p-2 flex flex-col">
                                <img src={item.image || "alt_photo.jpg"} alt="blog image" className="h-[200px] w-[280px] object-cover " />
                                <h1 className="text-3xl font-bold text-center my-2 " >{item.title} </h1>
                                <p className="text-sm overflow-hidden text-ellipsis my-2 line-clamp-2 ">{item.content} </p>
                                <div className="flex justify-center mt-auto">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-blue-700" >Click here</button>
                                </div>
                            </li>
                        ))

                    )
                }

            </ul>
        </>
    )
}
import axios from "axios"
import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { useParams } from "react-router-dom"
const API = import.meta.env.VITE_API_URL


export const SingleBlog = () => {
    const { _id } = useParams()
    const [singleBlog, setSingleBlog] = useState([])
    const [err, seterr] = useState(null)
    const [load, setload] = useState(false)
    const [username,setusername] = useState("user")

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                setload(true)
                const res = await axios.get(`${API}/blog/${_id}`)
                setSingleBlog(res.data.blog)
                setusername(res.data.blog.author.username)
            } catch (error) {
                seterr(error.message)
                console.log("Error message")
            } finally {
                setload(false)
            }
        }
        fetchSingleBlog()
    }, [])

    if (load) {
        return (
            <div className="flex justify-center items-center h-[50vh]" >
                <h2>Loading blogs...</h2>
            </div>
        )
    }
    if (err) {
        return (
            <div className="flex justify-center items-center h-[50vh]" >
                <h2>Error: {err} </h2>
            </div>
        )
    }




    return (
        <section className="relative top-[20vh] h-auto w-[70vw] py-8 px-3 mx-auto shadow-2xl ">
            {
                singleBlog.length === 0 ? (
                    <h1 className="text-3xl font-semibold" >No singleBlog...</h1>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 font-semibold w-[90%] text-left mx-auto my-1  " >{singleBlog.createdAt.substring(0, 10)} </p>
                        <h1 className="text-4xl font-semibold text-left w-[90%] mx-auto mb-2 mt-[-4px] " >{singleBlog.title} </h1>
                        <div className="w-[85%] mx-auto mt-[-10px] mb-1 flex flex-wrap gap-2" >
                            {
                               <p className="h-auto w-auto max-w-[150px] min-w-[80px] px-4 py-2 bg-zinc-300 rounded-lg text-center text-[14px] font-medium">{singleBlog.tags}</p>
                            }
                        </div>
                        <img src={singleBlog.image || "alt_photo.jpg"} className="h-auto object-cover w-[90%] mx-auto " alt="img" />
                        <p className="text-lg font-medium w-[90%] mx-auto my-2 " >{singleBlog.content} </p>
                        <hr className="h-[2px] w-[90%] mx-auto bg-zinc-200 " />
                        <div className="w-[90%] mx-auto py-2 my-2 " >
                            <p className="text-lg text-gray-500 font-semibold" >Author: <span className="font-medium text-[16px] " >{singleBlog.author.username}</span> </p>
                            <p className="text-lg text-gray-500 font-semibold" >Email: <a href={`mailto:${singleBlog.author.email} `} className="font-medium text-[16px] hover:underline cursor-pointer "  >{singleBlog.author.email}</a> </p>
                        </div>
                        <hr className="h-[2px] w-[90%] mx-auto bg-zinc-200 " />
                        <div className="w-[90%] mx-auto my-2 " >
                            <h1 className="font-semibold text-lg ">Comments:- </h1>
                            {
                                singleBlog.comments.length === 0 ? (
                                    <h1 className="text-xl font-medium ml-3  " >No comments</h1>
                                ) : (
                                    singleBlog.comments.map((item, index) => (
                                        <div key={index} className="h-auto w-[95%] mx-auto my-1 border border-transparent border-b-black py-3 ">
                                            <p className="ml-4 text-lg h-[30px] w-[95%] flex items-center ">
                                                <span className="bg-zinc-300 rounded-full h-[25px] w-[25px] text-[15px] flex justify-center items-center " ><FaUser/></span> &nbsp;&nbsp; {username.toUpperCase()} </p>
                                            <p className="ml-6 text-[14px] h-[30px] font-normal mt-2 " >{item.comment} </p>
                                        </div>
                                    )) || 
                                    <h1>{singleBlog.comments} </h1>
                                )
                            }
                        </div>
                        <div className="">
                            <form action="">
                                <input type="text" placeholder="Enter comment " />
                                <button>Submit</button>
                                <button type="reset" >Reset</button>
                            </form>
                        </div>
                    </>
                )
            }

        </section>
    )
}
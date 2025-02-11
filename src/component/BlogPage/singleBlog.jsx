import { useParams } from "react-router-dom"
import data from "../../data"

export const SingleBlog = () => {
    const { _id } = useParams()
    const blog = data.blogs.find((item) => item._id === _id)


    return (
        <section className="relative top-[20vh] h-auto w-[70vw] py-8 px-3 mx-auto shadow-2xl ">
            <p className="text-sm text-gray-500 font-semibold w-[90%] text-left mx-auto my-1  " >{blog.createdAt.substring(0, 10)} </p>
            <h1 className="text-4xl font-semibold text-left w-[90%] mx-auto mb-2 mt-[-4px] " >{blog.title} </h1>
            <div className="w-[85%] mx-auto mt-[-10px] mb-1 flex flex-wrap gap-2" >
                {
                    blog.tags.map((item, index) => (
                        <div key={index} >
                            <p className="h-auto w-auto max-w-[150px] min-w-[80px] px-4 py-2 bg-zinc-300 rounded-lg text-center text-[14px] font-medium">{item}</p>
                        </div>
                    ))
                }
            </div>
            <img src={blog.image || "alt_photo.jpg"} className="h-auto object-cover w-[90%] mx-auto " alt="img" />
            <p className="text-lg font-medium w-[90%] mx-auto my-2 " >{blog.content} </p>
            <hr className="h-[2px] w-[90%] mx-auto bg-zinc-200 " />
            <div className="w-[90%] mx-auto py-2 my-2 " >
                <p className="text-lg text-gray-500 font-semibold" >Author: <span className="font-medium text-[16px] " >{blog.author.username}</span> </p>
                <p className="text-lg text-gray-500 font-semibold" >Email: <a href={`mailto:${blog.author.email} `} className="font-medium text-[16px] hover:underline cursor-pointer "  >{blog.author.email}</a> </p>
            </div>
            <hr className="h-[2px] w-[90%] mx-auto bg-zinc-200 " />
            <div className="w-[90%] mx-auto my-2 " >
                <h1 className="font-semibold text-lg ">Comments:- </h1>
                {
                    blog.comments.length === 0 ? (
                        <h1 className="text-xl font-medium ml-3  " >No comments</h1>
                    ) : (
                        blog.comments.map((item, index) => (
                            <div key={index}>
                                <h1>{item.comment} </h1>
                            </div>
                        ))
                    )
                }
            </div>
        </section>
    )
}
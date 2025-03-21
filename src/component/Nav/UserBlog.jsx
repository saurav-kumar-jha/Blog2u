import { useEffect, useState } from "react";
import BlogApi from "../utils/blogApi";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";

export const UserBlog = () => {
    const [Data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserBlog();
    }, []);

    const fetchUserBlog = async () => {
        try {
            const res = await BlogApi.get("/user/get-allblogs");
            setData(res.data?.blogs || []);
        } catch (e) {
            console.log(e);
        }
    };
    const handleDelete = async (id) => {
        const cnfDelete = window.confirm("Do u want to delete this blog?")
        if(!cnfDelete) return;

        try {
            const res = await BlogApi.delete(`/delete`)
            if (res.data.success) {
                toast.success(res.data.msg || "Blog deleted successfully!");
                fetchUserBlog();
              } else {
                toast.error(res.data.msg || "Failed to delete blog.");
              }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <section className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Your Blogs
                </h1>

                {Data.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg">
                        <p className="text-gray-600 text-lg mb-6">
                            You haven't posted any blogs yet.
                        </p>
                        <button
                            onClick={() => navigate("/add-blog")}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Get Started
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {Data.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
                                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800"> {item.title} </h2>
                                    <p className="text-gray-600 text-sm flex-grow"> {item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content} </p>
                                    <button onClick={() => navigate(`/blog/${item._id}`)} className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition" > Read More </button>
                                    <button onClick={()=> handleDelete(item._id)} className="mt-4 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition cursor-pointer flex justify-center item-center" > Delete this <span className="text-[18px] ml-1 " > <MdOutlineDelete /></span> </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

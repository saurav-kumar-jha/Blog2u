import { useState } from "react"
import { useNavigate } from "react-router-dom"
const API = import.meta.env.VITE_API_URL

export const AddBlog = ()=>{
    const [data, setdata] = useState({title:"", content:"", tags:"", profilePicture:null,preview:""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setdata(prev => ({
                ...prev,
                profilePicture: file,
                preview: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('tags', data.tags);
            if (data.profilePicture) {
                formData.append('profilePicture', data.profilePicture);
            }

            // const response = await fetch(`${API}/blogs`, {
            //     method: 'POST',
            //     body: formData,
            //     credentials: 'include'
            // });

            // if (response.ok) {
            //     navigate('/blogs');  // Redirect to blogs page after successful submission
            // } else {
            //     throw new Error('Failed to create blog');
            // }
            console.log(data)
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    return(
        <section className="relative top-[20vh] w-[70vw] h-auto p-4 mx-auto bg-transparent rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Blog</h1>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2">Title</label>
                    <input 
                        type="text" 
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Content</label>
                    <textarea 
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded min-h-[200px]"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Tags (comma-separated)</label>
                    <input 
                        type="text" 
                        name="tags"
                        value={data.tags}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="tech, programming, web development"
                    />
                </div>

                <div>
                    <label className="block mb-2">Cover Image</label>
                    <input 
                        type="file" 
                        name="profilePicture"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        accept="image/*"
                    />
                    {data.preview && (
                        <img 
                            src={data.preview} 
                            alt="Preview" 
                            className="mt-2 max-w-[200px] h-auto"
                        />
                    )}
                </div>

                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Publish Blog
                </button>
            </form>
        </section>
    )
}
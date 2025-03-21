import React , { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserApi from "../utils/UserApi";
import { login } from "../Redux/feature/userSlice";
const API = import.meta.env.VITE_USER_URL


export const EditProfile = () => {
    const {isLoggedIn, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [userData, setuserData] = useState({
        Name: "",
        username:"",
        bio: "",
        email: "",
        profilePicture: null
    });
    const [preview, setpreview] = useState(null)
    

    useEffect(() => {
        fetchData()        
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = ()=>{
                setpreview(reader.result)
            }
            reader.readAsDataURL(file)
            setuserData(prev => ({
                ...prev,
                profilePicture: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try { 
            const formdata = new FormData();

            formdata.append('name',userData.Name)
            formdata.append('username',userData.username)
            formdata.append('bio',userData.bio)
            formdata.append('profilePicture', userData.profilePicture)
            console.log(userData)

            const res = await UserApi.put(`/update-userdetails`,formdata ,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            // console.log(res)
            toast.success(res.data?.msg)
            dispatch(login(res.data?.userData))
            navigate("/")
        } catch (error) {
            toast.error("Error updating profile");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchData =  async ()=>{
        try {
            const response = await UserApi.get("/getUser-details");
            const User = response?.data?.user;
            console.log(response)
            console.log(response?.data?.user);
            
            if (User) {
              setuserData({
                Name: User.Name || "",
                username: User.username || "",
                bio: User.bio || "",
                profilePicture: User.profilePicture || null
              }); 
              setpreview(User.profilePicture || null)
            }
          } catch (error) {
            if (!error.response?.data?.success) {
              toast.error(error.response?.data?.msg);
              navigate("/login");
            }
            console.error(error);
          }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r bg-black px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                <img 
                                    src={preview} 
                                    alt="Profile" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                <input 
                                    type="file" 
                                    id="profilePicture" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Username (Disabled) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input 
                                type="text" 
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* <p className="mt-1 text-sm text-gray-500">Username cannot be changed</p> */}
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                name="Name"
                                value={userData.Name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea 
                                name="bio"
                                value={userData.bio}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-500 font-semibold text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Saving...
                                </span>
                            ) : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="flex-1 font-semibold bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
import axios from "axios"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import UserApi from "../utils/UserApi"
const API = import.meta.env.VITE_USER_URL


export const Signup = () => {
    const [data, setdata] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "", mobileNo: "", profilePicture: "" })
    const [previewImg, setpreviewImg] = useState("")
    const [showpass, setshowpass] = useState(false)
    const [showcnfpass, setshowcnfpass] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    const validValues = (
        data.name.trim() !== '' &&
        data.username.trim() !== '' &&
        data.email.trim() !== '' &&
        data.password.trim() !== '' &&
        data.confirmPassword.trim() !== '' &&
        data.password === data.confirmPassword
    );

    const handleInputChange = (e) => {
        setdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setpreviewImg(URL.createObjectURL(file));
            compressImage(file).then(compressedFile => {
                setdata((prev) => ({
                    ...prev,
                    profilePicture: compressedFile,
                }));
            });
        }
    };

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(compressedFile);
                    }, 'image/jpeg', 0.7);
                };
            };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const { name, username, email, password, confirmPassword, mobileNo, profilePicture } = data;
    
        if (!name || !username || !email || !password || !confirmPassword) {
          toast.error("Please fill in all the required fields.");
          return;
        }
    
        if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("mobileNo", mobileNo);
        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }
    
        try {
          const res = await UserApi.post("/register", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }, // if cookies are involved
          });
          console.log(formData)
          console.log(res)
    
          if (res.data.success) {
            toast.success(res.data.msg || "Registration successful!");
            // Optionally navigate to login page
            navigate("/login");
          } else {
            toast.error(res.data.msg || "Something went wrong");
          }
    
          // Reset form after success
          setdata({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobileNo: "",
            profilePicture: null,
          });
          setpreviewImg("");
        } catch (error) {
          console.error("Registration Error:", error);
    
          if (error.response) {
            const status = error.response.status;
            if (status === 409) {
              toast.error("User already exists. Please use a different email.");
            } else if (status === 402) {
              toast.error("Please fill all the required details.");
            } else {
              toast.error("Server error, please try again later.");
            }
          } else {
            toast.error("Network error. Check your connection.");
          }
        }
      };
    const handlepass = (e) => {
        e.preventDefault()
        setshowpass(!showpass)
    }
    const handlecnfpassword = (e) => {
        e.preventDefault()
        setshowcnfpass(!showcnfpass)
    }
    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <form action="" onSubmit={handleFormSubmit} className='flex justify-center items-center flex-col text-center bg-[#FFFFFF] h-[100%] px-[50px] '>
                <h1 className='font-bold m-0 text-4xl text-center'>Create Account</h1>
                {
                    previewImg ? (
                        <img src={previewImg} alt="" onClick={handleImageClick} className="w-24 h-24 rounded-full object-fit mb-3" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            Profile
                        </div>
                    )
                }
                {isModalOpen && (
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 bg-transparent backdrop-blur-lg bg-opacity-50 flex-col flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <img
                            src={previewImg}
                            alt="Profile"
                            className="max-w-full max-h-full rounded-lg"
                        />
                        <p className="text-sm text-black " >Click anywhere to close<span className="text-red-800">**</span></p>
                    </div>
                )}
                <label htmlFor="profile_pic" className="text-sm text-blue-600 cursor-pointer my-1 active:text-red-800 hover:underline">Upload Profile Picture</label>
                <input type="file" id="profile_pic" accept="image/png, image/jpeg, image/gif" className="hidden" onChange={handleFileChange} />

                <input type="text" name="name" value={data.name} onChange={handleInputChange} placeholder='Name' className='w-[100%] bg-[#eee] px-[15px] py-[8px] border-none ' /><br />
                <input type="text" name="username" value={data.username} onChange={handleInputChange} placeholder='Username' className='w-[100%] bg-[#eee] px-[15px] py-[8px] border-none ' /><br />
                <input type="email" name="email" value={data.email} onChange={handleInputChange} placeholder='Email' className='w-[100%] bg-[#eee] px-[15px] py-[8px] border-none ' /><br />

                <div className="flex items-center w-full bg-[#eee] px-[15px] py-[8px] mb-4">
                    <p className="text-gray-600 mr-2">+91</p>
                    <input type="number" name="mobileNo" min="0" maxLength="10" value={data.mobileNo} onChange={handleInputChange} placeholder='Mobile No' className='w-full bg-transparent outline-none' />
                </div>

                <div className="flex items-center w-full bg-[#eee] px-[15px] py-[8px] mb-4">
                    <input type={showpass ? "text" : "password"} name="password" value={data.password} onChange={handleInputChange} placeholder='Password' className='w-full bg-transparent outline-none' />
                    <span className="text-gray-600 cursor-pointer">
                        {
                            !showpass ? (<FaEye onClick={handlepass} />) : (<FaEyeSlash onClick={handlepass} />)
                        }
                    </span>
                </div>

                <div className="flex items-center w-full bg-[#eee] px-[15px] py-[8px] mb-4">
                    <input type={showcnfpass ? "text" : "password"} name="confirmPassword" value={data.confirmPassword} onChange={handleInputChange} placeholder='Enter confirm Password' className='w-full bg-transparent outline-none' />
                    <span className="text-gray-600 cursor-pointer">
                        {
                            !showcnfpass ? (<FaEye onClick={handlecnfpassword} />) : (<FaEyeSlash onClick={handlecnfpassword} />)
                        }
                    </span>
                </div>
                <button type='submit' className='bg-[#FF4B2B] active:scale-95 ease-in duration-75 cursor-pointer text-white px-4 py-2 rounded-md w-[100%] text-[18px] ' >Sign up</button>

            </form>
        </>
    )
}
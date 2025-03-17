import { useEffect, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { FcApproval, FcDisapprove } from "react-icons/fc"
import { MdEdit } from "react-icons/md"
import { TbXboxXFilled } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, logout } from "../Redux/feature/userSlice"
import axios from "axios"
import UserApi from "../utils/UserApi"
const API = import.meta.env.VITE_USER_URL

export const UserProfile = () => {
    const { isLoggedIn, user } = useSelector((state) => state.user)
    const [Email, setEmail] = useState()
    const [otp, setOtp] = useState()
    const [showOtp, setshowOtp] = useState(false)
    const [load, setload] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        setEmail(user.isEmailVarified)

    }, [])
    const handleVerifyOtp = (e) => {
        e.preventDefault()
        setload(true)
        if (otp == 1234) {
            setEmail(true)
            toast.success("Verified successfully")
            setOtp("")
            setshowOtp(false)
        } else {
            toast.error("OTP doesn't match")
        }
        setload(false)
    }
    const handleEdit = () => {
        navigate("/user/edit-profile")
    }
    const handlelogout = async (e) => {
        e.preventDefault()

        if (isLoggedIn) {
            dispatch(logout())
            toast.success("Logout successfully..")
            navigate("/login")
        } else {
            navigate("/login")
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

                <div className="bg-gradient-to-r bg-black px-6 py-4">
                    <h1 className="text-3xl font-bold text-white">Your Profile</h1>
                </div>

                <div className="relative mt-[-50px] mb-6 flex justify-center">
                    <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                        <img
                            src={user.profilePicture}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 space-y-4">
                    <div className="flex flex-col items-center space-y-1">
                        <h2 className="text-2xl font-bold text-gray-800">{user.Name.toUpperCase()}</h2>
                        <p className="text-gray-600">@{user.username}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                            <span className="font-semibold">Bio: </span>
                            {user.bio || "No bio added yet"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-700">{user.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">
                                        {!Email ? (
                                            <TbXboxXFilled className="text-red-500" title="Email not verified" />
                                        ) : (
                                            <FcApproval title="Email verified" />
                                        )}
                                    </span>
                                    {!Email && (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
                                            onClick={() => setshowOtp(true)}
                                        >
                                            Verify
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Phone Section */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-700">+91 {user.mobile_no}</p>
                        </div>
                    </div>

                    {/* OTP Verification Section */}
                    {showOtp && (
                        <div className="bg-blue-50 p-6 rounded-lg mt-4">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-lg font-semibold text-blue-800 mb-4">Email Verification</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="otp" className="text-sm font-medium text-blue-800">
                                            Enter OTP sent to your email
                                        </label>
                                        <input
                                            type="number"
                                            id="otp"
                                            name="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="h-12 px-4 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center text-lg tracking-widest"
                                            placeholder="• • • •"
                                            maxLength="6"
                                        />
                                    </div>
                                    <button
                                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 ease-in-out"
                                        onClick={handleVerifyOtp}
                                        disabled={load}
                                    >
                                        {load ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Verifying...
                                            </span>
                                        ) : (
                                            "Verify OTP"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2 w-[100%] px-6 my-4 flex justify-between items-center " >
                    <button className="h-auto w-auto px-2 flex justify-around items-center cursor-pointer hover:underline rounded text-lg  border  border-black active:scale-95 duration-100 ease-in " onClick={handleEdit} ><MdEdit />Edit</button>
                    <button className="h-auto w-auto px-4 py-0.5  flex justify-around items-center cursor-pointer hover:underline rounded-2xl text-lg border text-white  border-transparent bg-[#f72929] active:scale-95 duration-100 ease-in " onClick={handlelogout}  ><FaSignOutAlt />logout</button>
                </div>
            </section>
        </div>
    )
}
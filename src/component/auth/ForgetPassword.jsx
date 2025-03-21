import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../utils/UserApi";
import { toast } from "react-toastify";

export const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const navigate = useNavigate();
    const [showOtp, setShowOtp] = useState(false);
    const otpInputs = useRef([]);

    const handleOTP = async (e) => {
        e.preventDefault();
        try {
            const res = await UserApi.post('/forgot-password', { email });
            console.log(res);
            if (res.data?.success) {
                setShowOtp(true);
                toast.info(res.data.msg || "OTP sent to your email");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.msg || "Server error. Try again later.");
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            otpInputs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpInputs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== 4) {
            toast.error("Please enter a valid 4-digit OTP");
            return;
        }

        try {
            const res = await UserApi.post('/submit-otp', { email, otp: otpValue });
            console.log(res);
            if (res.data?.success) {
                toast.success(res.data?.msg || "OTP verified successfully");
                navigate("/reset-password"); 
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.msg || "Server error. Try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  px-4">
            <div className="max-w-md w-full rounded-lg p-8">
                <h2 className="text-4xl font-semibold mb-6 text-gray-800">Forgot Password</h2>

                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='w-full bg-[#f0f0f0] px-4 py-3 mb-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out text-gray-700' />

                <button onClick={handleOTP} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium transition-all duration-300 ease-in-out cursor-pointer focus:scale-95 ">Get OTP</button>

                {showOtp && (
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="flex justify-between mb-4">
                            {otp.map((digit, index) => (
                                <input key={index} ref={(el) => (otpInputs.current[index] = el)} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleBackspace(index, e)} className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#f0f0f0] text-gray-700" />
                            ))}
                        </div>

                        <button type="submit" className="w-full bg-[#FF4B2B] hover:bg-[#ff4d2d] text-white py-3 rounded-md font-medium transition-all duration-300 ease-in-out cursor-pointer focus:scale-95 ">Submit OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
};

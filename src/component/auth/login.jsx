import React, { useState } from 'react';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => setIsSignUp((prev) => !prev);


  return (
    <>
      <div className={`bg-white w-[70vw] mx-auto my-4 min-h-[480px] rounded-lg relative top-[20vh] overflow-hidden shadow-2xl transition-all duration-700 ease-in-out`}>
        <div className={`absolute show top-0  h-[100%] transition-transform duration-700 ease-in-out right-0 w-[50%] opacity-0 z-10 p-3 ${isSignUp ? "opacity-100 z-20 translate-x-0" : ""}`}>
          <form action="" className='flex justify-center items-center flex-col text-center bg-[#FFFFFF] h-[100%] px-[50px] '>
            <h1 className='font-bold m-0 text-4xl text-center'>Create Account</h1>
            <div className='my-[20px] ' >
              <a href="#" className='border cursor-pointer border-[white] bg-[#c7e5f7] rounded-full inline-flex justify-center items-center mx-[5px] w-[40px] h-[40px] ' ><FaFacebookF /> </a>
              <a href="#" className='border cursor-pointer border-white bg-[#c7e5f7] rounded-full inline-flex justify-center items-center mx-[5px] w-[40px] h-[40px] ' ><FaGooglePlusG /> </a>
              <a href="#" className='border cursor-pointer border-white bg-[#c7e5f7] rounded-full inline-flex justify-center items-center mx-[5px] w-[40px] h-[40px] ' ><FaLinkedinIn /> </a>
            </div>
            <span className='text-sm'>or use your email for registration</span><br />
            <input type="text" placeholder='Name' className='w-[100%] bg-[#eee] px-[15px] py-[8px] my-1.5 border-none ' /><br />
            <input type="email" placeholder='Email' className='w-[100%] bg-[#eee] px-[15px] py-[8px] my-1.5 border-none ' /><br />
            <input type="text" placeholder='Password' className='w-[100%] bg-[#eee] px-[15px] py-[8px] my-1.5 border-none ' /><br />
            <button type='submit' className='bg-[#FF4B2B] active:scale-95 ease-in duration-75 cursor-pointer text-white px-4 py-2 rounded-md w-[100%] text-[18px] ' >Sign up</button>

          </form>

        </div>

        {/* signin */}
        <div className={`absolute top-[10px] h-[100%] show transition-transform duration-700 ease-in-out left-0 w-[50%] z-20 py-3 ${
          isSignUp ? "opacity-0 z-[-1]" : ""
        }`}>



          <form action="" className='flex justify-center items-center flex-col text-center bg-[#FFFFFF] h-[90%] px-[50px] '>
            <h1 className='font-bold m-0 text-4xl text-center'>Sign in</h1>
            <div className='my-[20px] ' >
              <a href="#" className='border cursor-pointer border-[white] bg-[#c7e5f7] rounded-full inline-flex justify-center items-center mx-[5px] w-[40px] h-[40px] ' ><FaFacebookF /> </a>
              <a href="#" className='border cursor-pointer border-white bg-[#c7e5f7] rounded-full inline-flex justify-center items-center mx-[5px] w-[40px] h-[40px] ' ><FaGooglePlusG /> </a>
              <a href="#" className='border cursor-pointer border-white bg-[#c7e5f7] rounded-full inline-flex justify-center items-center mx-[5px] w-[40px] h-[40px] ' ><FaLinkedinIn /> </a>
            </div>
            <span className='text-sm'>or use your account</span><br />
            <input type="email" placeholder='Email' className='w-[100%] bg-[#eee] px-[15px] py-[12px] my-1 border-none ' /><br />
            <input type="password" placeholder='Password' className='w-[100%] bg-[#eee] px-[15px] py-[12px] my-1 border-none ' /><br />
            <a href="#" className='text-sm text-gray-500 my-3'>Forget your password?</a>
            <button type='submit' className='bg-[#FF4B2B] cursor-pointer text-white active:scale-95 ease-in duration-75 px-4 py-2 rounded-md w-[100%] text-[18px] ' >Sign In</button>

          </form>
        </div>

        {/* Overlay */}
        <div className={`absolute top-0 w-[50%] h-[100%] overflow-hidden transition-transform duration-700 ease-in-out z-10 ${
          isSignUp ? "translate-x-[0%]" : "translate-x-[100%]"}`}>
          <div className='bg-[#FF416C] h-[100%] w-[200%] bg-no-repeat bg-cover text-white relative transition-transform duration-700 ease-in-out'>
            <div className={`absolute flex justify-center items-center flex-col px-[40px] text-center top-0 h-[100%] w-[50%] transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-[100%]' : 'translate-x-0'}`}>
              <h1 className='text-[40px] font-bold '>Welcome Back!</h1>

              <p className='text-[16px] font-semibold mt-[-5px] mb-[7px] '>To keep connected with us please login with your personal info</p>
              <button onClick={togglePanel} className='bg-transparent border border-white cursor-pointer h-auto active:scale-95 ease-in duration-200  text-white px-[45px] uppercase py-2 w-auto text-[12px] font-bold rounded-full ' id="signIn">Sign In</button>


            </div>
            <div className={`absolute flex justify-center items-center flex-col px-[40px] text-center top-0 right-0 h-[100%] w-[50%] transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-[-100%]' : 'translate-x-0'}`}>
              <h1 className='text-[40px] font-bold '>Hello, Friend!</h1>
              <p className='text-[16px] font-semibold mt-[-5px] mb-[7px] '>Enter your personal details and start journey with us</p>


              <button onClick={togglePanel} className='bg-transparent border border-white cursor-pointer h-auto active:scale-95 ease-in duration-200 text-white px-[45px] uppercase py-2 w-auto font-bold rounded-full text-[12px] ' id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
-

      </div>
    </>
  )
};

export default AuthForm;

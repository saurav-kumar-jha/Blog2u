import React, { useState } from 'react';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { Signup } from './signupForm';
import { Login } from './LoginPage';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => setIsSignUp((prev) => !prev);


  return (
    <>
      <div className={`bg-white w-[75vw] h-auto mx-auto my-4 min-h-[620px] rounded-lg relative top-[20vh] overflow-hidden shadow-2xl transition-all duration-700 ease-in-out`}>
        <div className={`absolute show top-0  h-[100%] transition-transform duration-700 ease-in-out right-0 w-[50%] opacity-0 z-10 p-3 ${isSignUp ? "opacity-100 z-20 translate-x-0" : ""}`}>
         <Signup/>
        </div>

        {/* signin */}
        <div className={`absolute top-[10px] h-[100%] show transition-transform duration-700 ease-in-out left-0 w-[50%] z-20 py-3 ${
          isSignUp ? "opacity-0 z-[-1]" : ""
        }`}>
            <Login/>
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

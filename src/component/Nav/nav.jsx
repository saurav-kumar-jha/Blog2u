import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export const Nav = () => {
    const { isLoggedIn, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const imgUrl = useSelector((state) => state.user?.user?.profilePicture);
    const username = useSelector((state) => state.user?.user?.username);
    const [NavBtn, setNavbtn] = useState(true);

    const handlelogin = () => {
        navigate("/login");
    };
    const handleimg = () => {
        navigate("/");
    };
    const handleuser = () => {
        navigate(`/user`);
    };
    const handleAddBlog = () => {
        if (isLoggedIn) {
            navigate("/create-blog");
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <nav className="md:h-[20vh] h-[10vh] w-[100vw] bg-transparent relative top-0 z-50 backdrop-blur-xl flex justify-between md:justify-evenly items-center shadow-xl px-4 md:px-0">
                {/* Logo */}
                <div className="w-auto flex items-center">
                    <img
                        src="/logo2.png"
                        alt="Logo"
                        onClick={handleimg}
                        className="h-[100%] w-[180px] cursor-pointer"
                    />
                </div>

                <div className="h-auto w-[40%] md:block hidden">
                    <ul className="flex justify-evenly text-[18px] font-semibold font-serif items-center px-4 py-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                !isActive
                                    ? "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 hover:text-black hover:bg-transparent bg-black text-white shadow-2xl  rounded-full "
                                    : "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-transparent text-black shadow-2xl scale-110 rounded-full "
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/blog"
                            className={({ isActive }) =>
                                !isActive
                                    ? "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-black hover:text-black hover:bg-transparent text-white shadow-2xl  rounded-full "
                                    : "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-transparent text-black shadow-2xl scale-110 rounded-full "
                            }
                        >
                            Blog
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                !isActive
                                    ? "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 hover:text-black hover:bg-transparent px-6 bg-black text-white shadow-2xl  rounded-full "
                                    : "cursor-pointer active:scale-90 duration-75 ease-linear border border-transparent py-2 px-6 bg-transparent text-black shadow-2xl scale-110 rounded-full "
                            }
                        >
                            Contact us
                        </NavLink>
                    </ul>
                </div>

                <div className="md:flex hidden justify-evenly items-center w-auto px-2">
                    {isLoggedIn ? (
                        <>
                            {imgUrl ? (
                                <img
                                    src={imgUrl}
                                    className="h-[40px] w-[40px] rounded-full object-cover cursor-pointer"
                                    onClick={handleuser}
                                    alt=""
                                />
                            ) : (
                                <span className="text-3xl mx-1 cursor-pointer" onClick={handleuser}>
                                    <FaUserCircle />
                                </span>
                            )}
                            <p className="font-semibold text-lg mx-2">
                                Welcome{" "}
                                <span className="font-medium text-lg hover:underline cursor-pointer" onClick={handleuser}>
                                    {username}
                                </span>
                            </p>
                        </>
                    ) : (
                        <button
                            className="h-auto w-auto px-[12px] cursor-pointer py-2 border border-transparent mx-2 text-[18px]"
                            onClick={handlelogin}
                        >
                            Login
                        </button>
                    )}
                    <button
                        onClick={handleAddBlog}
                        className="h-auto w-auto px-[16px] py-2 hover:text-black hover:bg-transparent shadow-2xl bg-black border cursor-pointer border-white rounded-lg text-[18px] font-semibold text-white active:scale-90 duration-75 ease-in-out"
                    >
                        Get started
                    </button>
                </div>

                <div className="md:hidden block z-50 mr-2 ">
                    <button onClick={() => setNavbtn(!NavBtn)} className="text-3xl text-black">
                        {NavBtn ? <FiAlignJustify /> : <FiX />}
                    </button>
                </div>
            </nav>

            <div
                className={`md:hidden fixed top-[10vh] left-0 w-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
                    NavBtn ? "-translate-y-[150%]" : "translate-y-0"
                }`}
            >
                <ul className="flex flex-col text-center text-lg font-semibold py-6 space-y-4">
                    <NavLink
                        to="/"
                        onClick={() => setNavbtn(true)}
                        className="block py-2 hover:bg-gray-100"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/blog"
                        onClick={() => setNavbtn(true)}
                        className="block py-2 hover:bg-gray-100"
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        to="/contact"
                        onClick={() => setNavbtn(true)}
                        className="block py-2 hover:bg-gray-100"
                    >
                        Contact Us
                    </NavLink>
                    {isLoggedIn ? (
                        <div className="flex flex-col items-center">
                            {imgUrl ? (
                                <img
                                    src={imgUrl}
                                    className="h-[50px] w-[50px] rounded-full object-cover cursor-pointer mb-2"
                                    onClick={() => {
                                        handleuser();
                                        setNavbtn(true);
                                    }}
                                    alt="profile"
                                />
                            ) : (
                                <span
                                    className="text-4xl cursor-pointer mb-2"
                                    onClick={() => {
                                        handleuser();
                                        setNavbtn(true);
                                    }}
                                >
                                    <FaUserCircle />
                                </span>
                            )}
                            <p className="font-semibold text-md mb-4">
                                Welcome{" "}
                                <span
                                    className="hover:underline cursor-pointer"
                                    onClick={() => {
                                        handleuser();
                                        setNavbtn(true);
                                    }}
                                >
                                    {username}
                                </span>
                            </p>
                        </div>
                    ) : (
                        <button
                            className="w-[80%] mx-auto py-2 border border-gray-300 text-black rounded-md"
                            onClick={() => {
                                handlelogin();
                                setNavbtn(true);
                            }}
                        >
                            Login
                        </button>
                    )}
                    <button
                        onClick={() => {
                            handleAddBlog();
                            setNavbtn(true);
                        }}
                        className="w-[80%] mx-auto py-2 bg-black text-white rounded-md"
                    >
                        Get Started
                    </button>
                </ul>
            </div>
        </>
    );
};

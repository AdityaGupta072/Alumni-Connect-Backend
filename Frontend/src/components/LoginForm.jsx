import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Navigation function

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
    
        const { token, user } = response.data;
    
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    
        console.log("Login Successful:", response.data);
    
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        const userRole = response.data.user.role;
        
        if (userRole === "Faculty") {
          navigate("/faculty-dashboard");
        } else if (userRole === "Student") {
          navigate("/student-dashboard");
        } else if (userRole === "Alumni") {
          navigate("/alumni-dashboard");
        } else {
          navigate("/home");
        }
        
    
      } catch (err) {
        setError(err.response?.data?.message || "Login failed. Try again!");
      }    
  };

  return (
    <>
      <section className="flex justify-center w-full mt-20">
        <div>
          {/* Headings */}

          <div className="mx-auto tracking-widest">
            <p className="font-inter text-gray-700 text-xl mx-5 gap-2 text-center">WELCOME BACK TO</p>
            <h1 className="font-bold font-inter text-4xl py-2 text-center">Alumni Connect</h1>
            <p className="font-inter gap-y-3 text-center text-xl">
              Let's get back to connecting, learning, and growing
            </p>
          </div>
          <div className="h-[1px] w-[500px] mx-auto bg-[#B9B9B9] mt-10"></div>

          {/* Login Form */}
        <div className='justify-center w-full ml-7-'>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 ">
            <div className="ml-10">
              <label htmlFor="email" className="block font-light text-gray-700 items-center mx-20 ">Email</label>
              <input
                type="email"
                id="email"
                className="w-7/12 mx-20 text-[10px] font-light px- p-2 font-inter border-2 items-center border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                required
              />
            </div>
            <div className='ml-10'>
              <div className="w-full mx-20">
              <label htmlFor="password" className="block font-light text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-7/12 p-2 border-2 text-[10px] font-light items-center font-inter border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            </div>
            <div className='ml-10'>
              <button
              type="submit"
              className="w-7/12 my-4 mx-20 py-2 px-4 font-inter text-[13px] bg-black text-white rounded-md "
            >
              Continue with email
            </button>
            </div>
            
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>


      <div className="flex justify-center mt-10">
            <p className="font-inter text-sm">
              New User?{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
                Sign up
              </span>
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default LoginForm;
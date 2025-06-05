import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default selection
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [profession, setProfession] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
        institution,
        graduationYear,
        profession,
        specialization,
        bio
      });
  
      console.log("Sign-up response:", response); // Debug log
  
      const { token, user } = response.data;
  
      if (!user) {
        throw new Error("Missing token or user in response"); // Prevent crash if backend failed silently
      }
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      console.log("Sign-up Successful:", response.data);
      const userRole = user.role;
  
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
      console.error("Signup Error:", err); // Important for debugging
      setError(err.response?.data?.message || err.message || "Sign-up failed. Try again!");
    }
  };
  

  return (
    <>
      <section className="flex justify-center w-full mt-5">
        <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg">
          {/* Headings */}
          <div className="text-center">
            <p className="text-gray-700 text-xl">WELCOME TO</p>
            <h1 className="font-bold text-4xl ">Alumni Connect</h1>
            <p className="text-xl">Perfect site to connect, learn, and grow</p>
          </div>

          <div className="h-[1px] w-full bg-gray-300 mt-6"></div>

          {/* Sign-up Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="w-full text-[11px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 text-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 text-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Role (Dropdown) */}
            <div>
              <label htmlFor="role" className="block text-gray-700">Role</label>
              <select
                id="role"
                className="w-full p-2 text-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="Student">Student</option>
                <option value="Alumni">Alumni</option>
                <option value="Faculty">Faculty</option>
              </select>
            </div>

            {/* Institution */}
            <div>
              <label htmlFor="institution" className="block text-gray-700">Institution</label>
              <input
                type="text"
                id="institution"
                className="w-full p-2 text-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Enter your institution"
                required
              />
            </div>

            {/* Graduation Year */}
            <div>
              <label htmlFor="graduationYear" className="block text-gray-700">Graduation Year</label>
              <input
                type="text"
                id="graduationYear"
                className="w-full p-2 text-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="Enter your graduation year"
              />
            </div>

            {/* Profession */}
            <div>
              <label htmlFor="profession" className="block text-gray-700">Profession</label>
              <input
                type="text"
                id="profession"
                className="w-full p-2 text-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Enter your profession"
              />
            </div>

            {/* Specialization */}
            <div>
              <label htmlFor="specialization" className="block text-gray-700">Specialization</label>
              <input
                type="text"
                id="specialization"
                className="w-full p-2 text-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="Enter your specialization"
              />
            </div>

            {/* Bio (Spanning Two Columns) */}
            <div className="col-span-2">
              <label htmlFor="bio" className="block text-gray-700">Bio</label>
              <textarea
                id="bio"
                className="w-full p-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>

            {/* Submit Button (Spanning Two Columns) */}
            <div className="col-span-2 w-full mx-30">
              <button
                type="submit"
                className="w-7/12 py-2 px-4 text-white bg-black rounded-md"
              >
                Continue with email
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          {/* Already have an account? */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;

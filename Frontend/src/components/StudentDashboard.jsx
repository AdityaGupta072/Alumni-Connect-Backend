import React from 'react';
import StudentPage from '../assets/amico.png';
import { useNavigate } from "react-router-dom";
const StudentDashboard = () => {
  const navigate= useNavigate();
  return (
    <section className='w-full flex h-screen'>
      
      {/* LEFT SECTION */}
      <div className='w-1/2 flex flex-col font-inter justify-center items-start px-20'>
        <h2 className='text-4xl  mb-6 leading-snug mx-auto'>
          Unlock growth through <br /> meaningful connections!
        </h2>

        <p className='text-gray-600 font-inter text-lg mb-4 mx-auto'>
          Find mentors to guide you, students to collaborate <br />
          with, and alumni to inspire your journey—all in one place.
        </p>

        <p className='text-sm underline font-inter cursor-pointer mx-auto text-gray-700 mb-6'>
          I am a student
        </p>
        <div className='grid-cols-2 gap-2 font-inter flex justify-center mx-auto'>
            <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition'
            onClick={() => navigate("/announcement-page")}>
              Start Connecting
            </button>
            
          </div>

        <div className='flex gap-4'>
          
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className='w-1/2 bg-[#B8F2FE] flex items-center justify-center h-full'>
        <img src={StudentPage} alt="Illustration" className='w-[450px] h-auto' />
      </div>
    </section>
  );
};

export default StudentDashboard;

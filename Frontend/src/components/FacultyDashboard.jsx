import React from 'react'
import Faculty from '../assets/Faculty.png'
import { useNavigate } from "react-router-dom";
const FacultyDashboard = () => {
  const navigate= useNavigate();
  return (
    <>
    <section className='w-full flex h-screen'>
          
          {/* LEFT SECTION */}
          <div className='w-1/2 flex flex-col justify-center items-start px-20'>
            <h2 className='text-4xl font-medium font-inter mb-6 leading-snug mx-auto'>
            Find, connect, & thrive
            </h2>

            <div className="text-gray-600 font-inter text-lg mb-4 mx-auto">
              <ul className="list-disc list-inside space-y-2">
                <li>Start meaningful conversations and build your network.</li>
                <li>Gain insights, share knowledge, & grow together.</li>
              </ul>
            </div>

            <p className='text-sm underline font-inter cursor-pointer mx-auto text-gray-700 mb-6'>
              I am a teacher
            </p>
            <div className='grid-cols-2 gap-2 flex font-inter justify-center text-center mx-auto'>
                <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition'
                onClick={() => navigate("/announcement-page")}>
                Start Connecting
                </button>
                
              </div>
    
            <div className='flex gap-4'>
              
            </div>
          </div>
    
          {/* RIGHT SECTION */}
          <div className='w-1/2 bg-[#E5FFA8] flex items-center justify-center h-full'>
            <img src={Faculty} alt="Illustration" className='w-[450px] h-auto' />
          </div>
        </section>
    </>
  )
}

export default FacultyDashboard

import React from 'react';
import { useNavigate } from "react-router-dom";
import Alumni from '../assets/AlumniPage.png';

const AlumniDashboard = () => {
  const navigate = useNavigate(); // ✅ Added

  return (
    <>
      <section className='w-full flex h-screen'>
        
        {/* LEFT SECTION */}
        <div className='w-1/2 flex flex-col justify-center items-start px-20'>
          <h2 className='text-4xl font-medium font-inter mb-6 leading-snug mx-auto'>
            Your journey, your way!
          </h2>

          <div className="text-gray-600 font-inter text-center text-lg mb-4 mx-auto">
            <p>
              Customize your profile and get recommendations
              tailored to your goals. Whether you're here to learn,
              mentor, or reconnect, we've got you covered!
            </p>
          </div>

          <p className='text-sm underline font-inter cursor-pointer mx-auto text-gray-700 mb-6'>
            I am alumni
          </p>

          <div className='grid-rows- gap-1 flex font-inter justify-center mx-auto'>
            <button
              className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition'
              onClick={() => navigate("/announcement-page")}
            >
              Start Connecting
            </button>

           
          </div>
          
          <div className='flex gap-4'></div>
        </div>

        {/* RIGHT SECTION */}
        <div className='w-1/2 bg-[#E0B8FF] flex items-center justify-center h-full'>
          <img src={Alumni} alt="Illustration" className='w-[450px] h-auto' />
        </div>

      </section>
    </>
  );
};

export default AlumniDashboard;

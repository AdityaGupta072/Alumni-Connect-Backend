import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">ConnectEd</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/announcements" className="text-gray-700 hover:text-blue-600">Announcements</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;

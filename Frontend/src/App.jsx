import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import FacultyDashboard from './components/FacultyDashboard';
import AlumniDashboard from './components/AlumniDashboard';
import StudentDashboard from './components/StudentDashboard';
import AnnouncementPage from './components/AnnouncementPage'; 


function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        {/*Role based dashboard */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        {/**ANNOUNCEMENT PAGE */}
        <Route path="/announcement-page" element={<AnnouncementPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

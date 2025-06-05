import React, { useState, useEffect } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import Navbar from '../components/Navbar';

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/announcements')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched announcements:", data);
        setAnnouncements(data);
      });
  }, []);
  
  

  return (
    <div className="min-h-screen p-10">
        <div className="px-6 py-8">
        <h2 className="text-4xl font-bold mb-8">Announcements</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.length === 0 ? (
            <p className="text-gray-500">No announcements available.</p>
          ) : (
            announcements.map((ann) => (
              <AnnouncementCard key={ann._id} announcement={ann} />
            ))
          )}
        </div>
      </div>


    </div>
  );
};

export default AnnouncementPage;

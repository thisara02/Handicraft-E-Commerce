import React from "react";
import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';

const EventPage = () => {
    return (
      <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
        {/* Header (NavBar) */}
        <NavBar />
        <Footer />
      </div>
    );
  };
  
export default EventPage;
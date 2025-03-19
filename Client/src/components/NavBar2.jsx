import { Link } from 'react-router-dom';
import React from 'react'; // Importing Cart and Wishlist icons
const logo =  process.env.PUBLIC_URL + "/assets/logo.png";

const NavBar = () => {
  return (
    <nav className="bg-white p-6 fixed top-0 w-full z-50 shadow-md"> {/* Increased padding for a taller navbar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-1">
          <Link to="/">
          <img
           src={logo}
            alt="Serendib Galleria"
            className="w-24 h-24 rounded-full"
          />
          </Link>
           <div className="text-black text-4xl font-bold font-arial">Serendib Galleria</div>
        </div>

         {/* Search Bar */}
        <div className="flex items-center mx-4 relative">
          {/* Search Icon */}
          {/* <FaSearch className="absolute left-3 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-400 px-10 py-2 w-full rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          </div>

        {/* Navigation Links */}
                {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
        <a 
            href="/vendor/profile" 
            className="text-black relative group pb-1"
          >
            Profile
            <span 
            
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"
              
            ></span>
          </a>
          <a 
            href="/vendor/orders" 
            className="text-black relative group pb-1"
          >
            My Orders
            <span 
            
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"
              
            ></span>
          </a>
          <a 
            href="/vendor/event" 
            className="text-black relative group pb-1"
          >
            Events
            <span 
            
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"
              
            ></span>
          </a>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

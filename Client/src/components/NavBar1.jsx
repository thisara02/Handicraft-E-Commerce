import React from 'react';
import { FaShoppingCart, FaRegHeart,FaSearch } from 'react-icons/fa'; // Importing Cart and Wishlist icons
const logo =  process.env.PUBLIC_URL + "/assets/logo.png";

const NavBar = () => {
  return (
    <nav className="bg-[#164863] p-6"> {/* Increased padding for a taller navbar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-1">
          <img
           src={logo}
            alt="Serendib Galleria"
            className="w-24 h-24 rounded-full"
          />
           <div className="text-[#ffffff] text-4xl font-bold font-mono">Serendib Galleria</div>
        </div>

         {/* Search Bar */}
         <div className="flex items-center mx-4 relative">
          {/* Search Icon */}
          <FaSearch className="absolute left-3 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search products..."
            className="px-10 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation Links */}
                {/* Navigation Links */}
                <div className="space-x-6 flex items-center">
          <a 
            href="/" 
            className="text-white relative group pb-1" // Add padding-bottom
          >
            Home
            <span 
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ffffff] transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a 
            href="/about" 
            className="text-white relative group pb-1"
          >
            Products
            <span 
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ffffff] transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a 
            href="/services" 
            className="text-white relative group pb-1"
          >
            Offers
            <span 
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ffffff] transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a 
            href="/contact" 
            className="text-white relative group pb-1"
          >
            Events
            <span 
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ffffff] transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </div>
        
        {/* Cart and Wishlist Icons */}
        <div className="flex space-x-6 items-center">
          <a 
            href="/cart" 
            className="text-white relative group pb-1"
          >
            <FaShoppingCart className="text-xl" />
            <span 
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ffffff] transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a 
            href="/wishlist" 
            className="text-[#FFFFFF] relative group pb-1"
          >
            <FaRegHeart className="text-xl" />
            <span 
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ffffff] transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

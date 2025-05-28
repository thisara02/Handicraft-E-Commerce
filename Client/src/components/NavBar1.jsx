import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaRegHeart } from 'react-icons/fa';

const logo = process.env.PUBLIC_URL + "/assets/logo.png";

const NavBar = () => {
  const [customer, setCustomer] = useState(null);
  const [vendor, setVendor] = useState(null); // State for vendor
  const navigate = useNavigate();

  // Fetch customer and vendor data from localStorage
  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("customer"));
    const storedVendor = JSON.parse(localStorage.getItem("vendor"));

    if (storedCustomer) setCustomer(storedCustomer);
    if (storedVendor) setVendor(storedVendor);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("vendor");
    setCustomer(null);
    setVendor(null);
    navigate("/");
  };

  return (
    <nav className="bg-white p-6 fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <Link to="/">
            <img
              src={logo}
              alt="Serendib Galleria"
              className="w-24 h-24 rounded-full"
            />
          </Link>
          <div className="text-black text-4xl font-bold font-arial">
            Serendib Galleria
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          {/* Show Home link for both customers and vendors */}
          <a href="/home" className="text-black relative group pb-1">
            Home
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Show Products, Offers, and Events only for customers */}
          {!vendor && (
            <>
              <a href="/product" className="text-black relative group pb-1">
                Products
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/offers" className="text-black relative group pb-1">
                Offers
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </>
          )}

          {/* Show Events for both customers and vendors */}
          <a href="/events" className="text-black relative group pb-1">
            Events
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Right Icons and Customer/Vendor Profile */}
        <div className="flex items-center space-x-6">
          {/* Show Cart and Wishlist icons only for customers */}
          {!vendor && (
            <>
              <a href="/cart" className="text-black relative group pb-1">
                <FaShoppingCart className="text-xl" />
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/whish" className="text-black relative group pb-1">
                <FaRegHeart className="text-xl" />
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </>
          )}

          {/* Customer/Vendor Info */}
          {customer || vendor ? (
            <div className="flex items-center space-x-4">
              <img
                src={`http://127.0.0.1:8000/${(customer || vendor).profile_picture}`}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-400 object-cover"
              />
              <span
                className="text-black font-medium cursor-pointer"
                onClick={() =>
                  navigate(customer ? '/editprofile' : '/vendor/profile')
                }
              >
                {(customer || vendor).name || (vendor && vendor.full_name)}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="bg-[#164863] text-white px-4 py-2 rounded-full hover:bg-[#228b86]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
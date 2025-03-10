import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';
const Img1 =  process.env.PUBLIC_URL + "/assets/vendor-reg.jpg";

const VendorRegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F7F9FB" }}>
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow pt-40 pb-10">
        
        
        {/* Image Section */}
        <div className="w-full max-w-4xl mb-8">
          <img
            src={Img1} 
            alt="Vendor Registration Banner"
            className="rounded-lg shadow-md"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 font-serif text-center text-[#634816]">
          Vendor Registration
        </h1>

        {/* Form Section */}
        <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg min-h-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="fullName">Full Name<sup className="text-red-500">*</sup></label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="businessName">Business Name</label>
                <input
                  id="businessName"
                  type="text"
                  placeholder="Business Name"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                
                <div>
                  <label className="block text-lg font-semibold mb-2" htmlFor="mobileNumber">Mobile Number<sup className="text-red-500">*</sup></label>
                  <input
                    id="mobileNumber"
                    type="tel"
                    placeholder="Mobile Number"
                    className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="address">Permanent Address<sup className="text-red-500">*</sup></label>
                <input
                  id="address"
                  type="text"
                  placeholder="Permanent Address"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="nic">NIC<sup className="text-red-500">*</sup></label>
                <input
                  id="nic"
                  type="text"
                  placeholder="NIC"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="email">Email Address<sup className="text-red-500">*</sup></label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="productDesc">Brief Description of Products<sup className="text-red-500">*</sup></label>
                <textarea
                  id="productDesc"
                  placeholder="Brief Description of Products"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-6">
              <div>
                <fieldset>
                  <legend className="text-lg font-semibold mb-2">Type of Products</legend>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Arts & Crafts
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Household Items
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Gift and Souvenirs
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Fashion & Clothing
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Food and Beverages
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Jewelry and Accessories
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="space-y-6">
              {/* Password Field */}
              <div className="relative">
                <label className="block text-lg font-semibold mb-2" htmlFor="password">
                  Password
                  <sup className="text-red-500">*</sup>
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="text-red-500 text-sm mt-2 space-y-1">
                <p>* Must be at least 8 characters long</p>
                <p>* Must include at least one uppercase and one lowercase letter</p>
                <p>* Must contain at least one number or special character (e.g., @, #, $)</p>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <label className="block text-lg font-semibold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                  <sup className="text-red-500">*</sup>
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>



              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="productImages">Profile Picture</label>
                <input
                  id="productImages"
                  type="file"
                  multiple
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Centered Submit and Login Text */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              type="submit"
              className="w-96 py-3 px-6 bg-[#634816] text-white rounded-lg hover:bg-[#978845] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>

          <p className="mt-2 text-center">
            Already have an account?{" "}
            <a href="/vendor/login" className="text-green-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorRegistrationPage;

